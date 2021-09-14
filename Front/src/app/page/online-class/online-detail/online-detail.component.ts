import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnlineClassService } from '../online-class.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import { MessageService } from 'src/app/core/message.service';
@Component({
  selector: 'app-online-detail',
  templateUrl: './online-detail.component.html',
  styleUrls: ['./online-detail.component.scss']
})
export class OnlineDetailComponent implements OnInit {
  modalRef: NgbModalRef;
  addForm: FormGroup;
  RoomId : any
  row : any[]
  constructor(
    private activatedRoute: ActivatedRoute,
    private oc : OnlineClassService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private message: MessageService,
    private fu: FormUtilService,
  ) {
    this.RoomId = this.activatedRoute.snapshot.paramMap.get('mapClassRoomTeacherId')
   }

  ngOnInit(): void {
    this.getLink()
  }

  getLink(){
    this.oc.getLink(this.RoomId).subscribe((res:any)=>{
      this.row = res.onlineLinkList
      console.log(this.row)
    })
  }

  openModalDetail(content, row?) {
    this.addForm = this.fb.group({
      onlineClassroomId : null,
      mapClassRoomTeacherId : this.RoomId,
      onlineClassroomLink: [null, [Validators.required, Validators.maxLength(255)]],
    });
    if (row) {
      this.addForm.patchValue(row, { emitEvent: false });
      console.log(this.addForm)
    }
    else {
      this.addForm.patchValue(history.state, { emitEvent: false });
      console.log(this.addForm)
    }
    
    this.modalRef = this.modalService.open(content);
  }

  save() {
    if (this.addForm.invalid) {
      this.fu.markFormGroupTouched(this.addForm);
      return;
    }
    this.oc.save(this.addForm.value).subscribe(() => {
      console.log(this.addForm.value)
      this.modalRef.close();
      this.message.success('บันทึกข้อมูลสำเร็จ');
      this.getLink();
    });
  }

  remove(onlineClassroomId, modal) {
    this.modalService.open(modal).result.then((result) => {
      if (result.toLowerCase() == 'ok') {
        this.oc.deleteLink(onlineClassroomId).subscribe(() => {
          this.message.success('ลบข้อมูลสำเร็จ');
          this.getLink();
        });
      }
    }, (reson) => { });
  }
}
