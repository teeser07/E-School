import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'src/app/core/message.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import { TeacherhomeService } from '../teacherhome.service';

@Component({
  selector: 'app-checkhomework',
  templateUrl: './checkhomework.component.html',
  styleUrls: ['./checkhomework.component.scss']
})
export class CheckhomeworkComponent implements OnInit {
  User : any ;
  Subject :any = []
  Classroom :any[] = []
  roomList :any[] =[];
  row: any[];

  constructor(
    private TC : TeacherhomeService,
    private AS : AuthService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fu: FormUtilService,
    private message: MessageService,
  ) { }

  ngOnInit(): void {
    this.getSubject()
    this.getClassRoom()
  }


  getSubject(){
    this.AS.user
    this.User = this.AS.user
    
    this.TC.getSubject(this.User.empProfileId).subscribe((res)=>{
      this.Subject = res
    })
  }

  getClassRoom(){
    this.TC.getSubject(this.User.empProfileId).subscribe((res)=>{
      this.Subject = res
    
    this.TC.getClass(this.Subject.subjectId).subscribe((res:any)=>{
      this.Classroom = res.roomList
      this.row = res.roomList
      console.log(this.row)
      })
    })
  }

 
  

}
