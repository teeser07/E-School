import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { ClassroomService } from './classroom.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/core/message.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  products;
  filteredProducts;
  modalRef: NgbModalRef;
  addForm: FormGroup;
  roomList: any ;
  keyword: string = '';
  key : string = 'T';
  EmpList1 :any;
  EmpList2 : any;
  row: any[];

  constructor(
    private router : Router,
    private classroomService : ClassroomService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private message: MessageService,
    private toastr : ToastrService,
    private fu: FormUtilService,
   ) { }

  ngOnInit() {
    this.search();
  }
  search() {
    this.classroomService.getRoom(this.keyword).subscribe((res: any[]) => {
      this.roomList = res;
      this.row = res;
      console.log(this.row)
    });
  }
  getEmp(){
    this.classroomService.getEmp(this.key).subscribe(res => {
      this.EmpList1 = res;
      console.log(this.EmpList1)
    })

  }
  openModalDetail(row) {
    this.addForm = this.fb.group({
      educationLevel: [null, [Validators.required, Validators.maxLength(50)]],
      class: [null, [Validators.required, Validators.maxLength(10)]],
      room: [null, [Validators.required, Validators.maxLength(10)]],
      empProfileIdFirst:[null, [Validators.required, Validators.maxLength(10)]],
      empProfileIdSecond: [null],
      mapClassRoomTeacherName: [null, [Validators.required, Validators.maxLength(50)]],
      mapclassroomteacherId : null,
    });
    if (row){
      this.addForm.patchValue(row, {emitEvent: false });
    }
    this.router.navigateByUrl('/page/add-room',{state:row})
    this.getEmp()
  
  }
  save() {
    if (this.addForm.invalid) {
      this.fu.markFormGroupTouched(this.addForm);
      return;
    }
    this.classroomService.save(this.addForm.value).subscribe(() => {
      this.modalRef.close();
      this.message.success('บันทึกข้อมูลสำเร็จ');
      this.search();
    });
  }
  remove(mapclassroomteacherId, modal) {
    this.modalService.open(modal).result.then((result) => {
      if (result.toLowerCase() == 'ok') {
        this.classroomService.deleteRoom(mapclassroomteacherId).subscribe(() => {
          this.message.success('ลบข้อมูลสำเร็จ');
          this.search();
        });
      }
    }, (reson) => { });
  }
}
  
  