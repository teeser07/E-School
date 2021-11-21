import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'src/app/core/message.service';
import { TeacherhomeService } from 'src/app/page/teacherhome/teacherhome.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';


@Component({
  selector: 'app-check-success',
  templateUrl: './check-success.component.html',
  styleUrls: ['./check-success.component.scss']
})
export class CheckSuccessComponent implements OnInit {
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
    private message : MessageService,
    private as: AuthService,
  ) {
    this.HomeworkId = this.activatedRoute.snapshot.paramMap.get('value')
    this.ClassId = this.activatedRoute.snapshot.paramMap.get('studentId')
   }

  ngOnInit(): void {
    this.getHomeworkDone()
  }


  getHomeworkDone(){
    this.TC.getHomeWorkDone(this.HomeworkId,this.ClassId).subscribe((res:any)=>{
      this.homeworkDoneList = res.homeworkDoneList
      console.log(this.homeworkDoneList)
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
}
