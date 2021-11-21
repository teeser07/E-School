import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'src/app/core/message.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import { TeacherhomeService } from '../../teacherhome.service';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-homework-detail',
  templateUrl: './homework-detail.component.html',
  styleUrls: ['./homework-detail.component.scss']
})
export class HomeworkDetailComponent implements OnInit {
  modalRef: NgbModalRef;
  addForm: FormGroup;
  getId:any
  lessonId : any
  User : any ;
  Subject : any =[];
  homeworkDetailList :any[]=[];
  row: any[];
  Title : any ={};
  Base64 : any 
  Base64Title : any
  constructor(
    private TC : TeacherhomeService,
    private AS : AuthService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fu: FormUtilService,
    private message: MessageService,
    private router : Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('ClassRoom');
    this.lessonId = this.activatedRoute.snapshot.paramMap.get('homeWorkId')
   }

  ngOnInit(): void {
    this.getSubject()
    this.getListHw()
    this.getTitle()
  }


  
  
  getSubject(){
    this.AS.user
    this.User = this.AS.user
    
    this.TC.getSubject(this.User.empProfileId).subscribe((res)=>{
      this.Subject = res
    })
  }

  getTitle(){
    this.TC.getTitle(this.lessonId).subscribe((res)=>{
      this.Title = res
      console.log(this.Title)
    })
  }

  getListHw(){
    this.TC.getHomeworkList(this.lessonId).subscribe((res:any)=>{
      this.homeworkDetailList = res.homeworkDetailList
      this.row = res.homeworkDetailList;
      console.log(this.row)
    })
  }


  


  remove(HomeWorkDetailId, modal) {
    this.modalService.open(modal).result.then((result) => {
      if (result.toLowerCase() == 'ok') {
        this.TC.deleteHomeworkDetail(HomeWorkDetailId).subscribe(() => {
          this.message.success('ลบข้อมูลสำเร็จ');
          this.getListHw();
        });
      }
    }, (reson) => { });
  }

  handleUpload(event) {
    let files = event.target.files;
        if(files[0].size > 10485760){
          this.message.error('ไม่สามารถอัพโหลดไฟล์ขนาดเกิน 10Mb ได้');
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
              homeworkId: [this.lessonId],
              title :[this.Base64Title],
              content : [reader.result]
            })
            console.log(this.addForm)
            this.TC.saves(this.addForm.value).subscribe(()=>{
              this.message.success('อัพโหลดการบ้านสำเร็จ');
              this.getListHw();
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

  dowLoadFIle(pdf,name){
    const linkSource = pdf;
    const downloadLink = document.createElement("a");
    const fileName = name;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
