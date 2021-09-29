import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import { MessageService } from 'src/app/core/message.service';
import { TeacherhomeService } from '../../teacherhome.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-check-detail',
  templateUrl: './check-detail.component.html',
  styleUrls: ['./check-detail.component.scss']
})
export class CheckDetailComponent implements OnInit {
  RoomId : any
  Homework : any[] = []
  Student : any[] =[]
  User : any
  Hw :any = 0
  row : any[]
  constructor(
    private as : AuthService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private message: MessageService,
    private fu: FormUtilService,
    private TC : TeacherhomeService
  ) { 
    this.RoomId = this.activatedRoute.snapshot.paramMap.get('mapClassRoomTeacherId')
    console.log(this.RoomId)
  }

  ngOnInit(): void {
    this.getUser()
    this.getHomework()
  }
  getUser(){
    this.as.user
    this.User = this.as.user.empProfileId
    
  }

  getHomework(){
    this.TC.getHomeworks(this.User,this.RoomId).subscribe((res:any)=>{
      this.Homework = res.homeworkList
    })
  }

  getStudentList(){
    this.TC.getStudentList(this.RoomId).subscribe((res:any)=>{
      this.Student = res.studentList
      this.row = res.studentList
      console.log(this.row)
    })
  }

  

}
