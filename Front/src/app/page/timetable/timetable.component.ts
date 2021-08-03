import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { TimetableService } from './timetable.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/core/message.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  products;
  filteredProducts;
  modalRef: NgbModalRef;
  addForm: FormGroup;
  periodList: any ;
  row: any[];
  keyword: string = '';
  ClassList :any[] =[];
  TimeList :any[] = [];
  SubjectList :any[] = [];

  constructor(
    private router : Router,
    private timeTableService : TimetableService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private message: MessageService,
    private toastr : ToastrService,
    private fu: FormUtilService,
  ) { }

  ngOnInit(): void {
    this.search()
  }

  search() {
    this.timeTableService.getTimetable(this.keyword).subscribe((res :any[]) => {
      this.periodList = res;
      this.row = res;
      console.log(this.row)
    });
  }

  getClass(){
    this.timeTableService.getClass(this.keyword).subscribe((res :any[]) => {
      this.ClassList = res;
      console.log(this.ClassList)
    })
  }

  getTime(){
    this.timeTableService.getTime(this.keyword).subscribe((res :any[]) => {
      this.TimeList = res;
      console.log(this.TimeList)
    })
  }

  getSubject(){
    this.timeTableService.getSubject(this.keyword).subscribe((res :any[]) => {
      this.SubjectList = res;
      console.log(this.SubjectList)
    })
  }

  openModalDetail(content, row?) {
    this.addForm = this.fb.group({
      number: [null, [Validators.required, Validators.maxLength(50)]],
      subjectId: [null, [Validators.required, Validators.maxLength(50)]],
      periodId: [null, [Validators.required, Validators.maxLength(50)]],
      mapClassRoomTeacherId: [null, [Validators.required, Validators.maxLength(50)]],
      dayValue: [null, [Validators.required, Validators.maxLength(50)]],
      timeTableId: null
    });
    if (row) {
      this.addForm.patchValue(row, { emitEvent: false });
      console.log(this.addForm)
    }
    this.modalRef = this.modalService.open(content);
    this.getClass();
    this.getTime();
    this.getSubject()
  }

  save() {
    if (this.addForm.invalid) {
      this.fu.markFormGroupTouched(this.addForm);
      return;
    }
    this.timeTableService.save(this.addForm.value).subscribe(() => {
      this.modalRef.close();
      this.message.success('บันทึกข้อมูลสำเร็จ');
      this.search();
    });
  }
  
  remove(timeTableId, modal) {
    this.modalService.open(modal).result.then((result) => {
      if (result.toLowerCase() == 'ok') {
        this.timeTableService.deleteTimetable(timeTableId).subscribe(() => {
          this.message.success('ลบข้อมูลสำเร็จ');
          this.search();
        });
      }
    }, (reson) => { });
  }
}
