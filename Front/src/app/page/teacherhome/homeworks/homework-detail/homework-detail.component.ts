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
    })
  }


  openModalDetail(content, row?) {
    this.addForm = this.fb.group({
      homeworkId: [this.lessonId],
      no: [null, [Validators.required, Validators.maxLength(3)]],
      content: [null, [Validators.required, Validators.maxLength(100)]],
      homeWorkDetailId : null
    });
    if (row) {
      this.addForm.patchValue(row, { emitEvent: false });
    }
    this.modalRef = this.modalService.open(content);
  }

  save() {
    if (this.addForm.invalid) {
      this.fu.markFormGroupTouched(this.addForm);
      return;
    }
    this.TC.saves(this.addForm.value).subscribe(() => {
      this.modalRef.close();
      this.message.success('บันทึกข้อมูลสำเร็จ');
      this.getListHw()
    });
    
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
}
