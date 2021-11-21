import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'src/app/core/message.service';
import { TeacherhomeService } from 'src/app/page/teacherhome/teacherhome.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import { StudenthomeService } from '../../studenthome.service';

@Component({
  selector: 'app-homeworkdetails',
  templateUrl: './homeworkdetails.component.html',
  styleUrls: ['./homeworkdetails.component.scss']
})
export class HomeworkdetailsComponent implements OnInit {
  HomeworkId : any
  ClassId : any
  homeworkDetailList :any[]=[];
  Title : any ={};
  addForm: FormGroup;
  User : any;
  data : any[];
  homeworkDoneList : any[] = []
  data1 : any 
  Base64Title : any
  Base64 : any 


  constructor(
    private activatedRoute: ActivatedRoute,
    private TC : TeacherhomeService,
    private fb: FormBuilder,
    private fu: FormUtilService,
    private SS : StudenthomeService,
    private message : MessageService,
    private as: AuthService,
  ) {
    this.HomeworkId = this.activatedRoute.snapshot.paramMap.get('homeWorkId')
    this.ClassId = this.activatedRoute.snapshot.paramMap.get('mapClassRoomTeacherId')
   }

  ngOnInit(): void {
    this.getListHw()
    this.getTitle()
    this.profile()
  }


  getTitle(){
    this.TC.getTitle(this.HomeworkId).subscribe((res)=>{
      this.Title = res
    })
  }

  getListHw(){
    this.TC.getHomeworkList(this.HomeworkId).subscribe((res:any)=>{
      this.homeworkDetailList = res.homeworkDetailList
      console.log(this.homeworkDetailList)
    })
  }

  profile(){
    this.as.user 
    this.User = this.as.user
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
              mapClassRoomTeacherId: [this.ClassId],
              studentId: [this.User.studentProfileId],
              homeworkId : [this.HomeworkId],
              status : "fail",
              title :[this.Base64Title],
              answerfile : [reader.result]
            })
            console.log(this.addForm)
            this.SS.saveHomework(this.addForm.value).subscribe(()=>{
              this.message.success('อัพโหลดการบ้านสำเร็จ');
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
