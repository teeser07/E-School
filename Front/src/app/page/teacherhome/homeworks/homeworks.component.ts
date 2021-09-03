import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'src/app/core/message.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import { TeacherhomeService } from '../teacherhome.service';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrls: ['./homeworks.component.scss']
})
export class HomeworksComponent implements OnInit {
  modalRef: NgbModalRef;
  addForm: FormGroup;
  User : any ;
  Subject : any =[];
  Subjects: any = [];
  roomList :any[] =[];
  ClassRoom : any[] = [0]
  homeworkList : any[] = []
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
    this.getClass()
  }

  getSubject(){
    this.AS.user
    this.User = this.AS.user
    
    this.TC.getSubject(this.User.empProfileId).subscribe((res)=>{
      this.Subject = res
    })
  }

  getClass(){
    this.TC.getSubject(this.User.empProfileId).subscribe((res)=>{
      this.Subjects = res

    this.TC.getClass(this.Subjects.subjectId).subscribe((res :any) => {
      this.roomList = res.roomList;
      
    })
  })
  }

  getHomework(){
    this.TC.getHomeworks(this.User.empProfileId,this.ClassRoom).subscribe((res:any)=>{
      this.homeworkList = res.homeworkList
      this.row = res.homeworkList;
      console.log(this.row)
    })
  }
  

  openModalDetail(content, row?) {
    this.addForm = this.fb.group({
      empProfileId :[this.User.empProfileId],
      mapClassRoomTeacherId : [this.ClassRoom],
      lesson: [null, [Validators.required, Validators.maxLength(3)]],
      orders: [null, [Validators.required, Validators.maxLength(3)]],
      contents: [null, [Validators.required, Validators.maxLength(100)]],
      homeWorkId: null
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
    this.TC.save(this.addForm.value).subscribe(() => {
      this.modalRef.close();
      this.message.success('บันทึกข้อมูลสำเร็จ');
      this.getHomework()
    });
    
  }

  remove(homeWorkId, modal) {
    this.modalService.open(modal).result.then((result) => {
      if (result.toLowerCase() == 'ok') {
        this.TC.deleteHomework(homeWorkId).subscribe(() => {
          this.message.success('ลบข้อมูลสำเร็จ');
          this.getHomework();
        });
      }
    }, (reson) => { });
  }
}
