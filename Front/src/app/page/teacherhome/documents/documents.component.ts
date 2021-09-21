import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { id } from 'date-fns/locale';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'src/app/core/message.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import { TeacherhomeService } from '../teacherhome.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  modalRef: NgbModalRef;
  addForm: FormGroup;
  User : any ;
  Subject : any =[];
  Document : any[] =[]
  row : any[]
  Base64 : any 
  Base64Title : any
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private TC : TeacherhomeService,
    private fu: FormUtilService,
    private message: MessageService,
    private AS : AuthService,
  ) { }

  ngOnInit(): void {
    this.getSubject()
    this.getDocument()
  }


  getSubject(){
    this.AS.user
    this.User = this.AS.user
    
    this.TC.getSubject(this.User.empProfileId).subscribe((res)=>{
      this.Subject = res
    })
  }

  handleUpload(event) {
    let files = event.target.files;
        if(files[0].size > 10485760){
          this.message.success('ไม่สามารถอัพโหลดไฟล์ขนาดเกิน 10Mb ได้');
        };
        //check file is valid
        if (!this.validateFile(files[0].name)) {
            console.log('Selected file format is not supported');
            return false;
        }

        let fData: FormData = new FormData;

        for (var i = 0; i < files.length; i++) {
            fData.append("file", files[i]);
        }
        var _data = {
            filename: 'Sample File',
            id: '0001'
        }
        if(files[0].size < 10485760){
        const file = event.target.files[0];
        const reader = new FileReader();
        this.Base64Title = file.name
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.Base64 = reader.result
            this.addForm = this.fb.group({
              subjectId: [this.Subject.subjectId],
              title :[this.Base64Title],
              file : [reader.result]
            })
            console.log(this.addForm)
            this.TC.saveDocument(this.addForm.value).subscribe(()=>{
              this.message.success('อัพโหลดไฟล์สำเร็จ');
              this.getDocument()
            })
          }
        };
    
    }

  validateFile(name: String) {
      var ext = name.substring(name.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'pdf') {
          return true;
      }
      if (ext.toLowerCase() == 'docx') {
        return true;
      }
      if (ext.toLowerCase() == 'xlsx') {
        return true;
      }
      if (ext.toLowerCase() == 'pptx') {
        return true;
      }
      else {
          return false;
      }
  }

  getDocument(){
    this.AS.user
    this.User = this.AS.user
    
    this.TC.getSubject(this.User.empProfileId).subscribe((res)=>{
      this.Subject = res
    
    this.TC.getDocument(this.Subject.subjectId).subscribe((res:any)=>{
      this.Document = res.documentList
      this.row = res.documentList
      console.log(this.row)
      })
    })
  }

  dowLoadFIle(pdf,name){
    const linkSource = pdf;
    const downloadLink = document.createElement("a");
    const fileName = name;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }



  remove(id, modal) {
    this.modalService.open(modal).result.then((result) => {
      if (result.toLowerCase() == 'ok') {
        this.TC.deleteDocument(id).subscribe(() => {
          this.message.success('ลบเอกสารสำเร็จ');
          this.getDocument();
        });
      }
    }, (reson) => { });
  }

}
