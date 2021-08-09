import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { TimetableService } from '../timetable.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/core/message.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-createtimetable',
  templateUrl: './createtimetable.component.html',
  styleUrls: ['./createtimetable.component.scss']
})
export class CreatetimetableComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  modalRef: NgbModalRef;
  addForm: FormGroup;
  row: any[];
  keyword: string = '';
  ClassList :any[] =[];
  TimeList :any[] = [];
  SubjectList :any[] = [];
  @Input() hideBack: boolean;
  timetableList: any[] = [] ;

  constructor(
    private router : Router,
    private timeTableService : TimetableService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private message: MessageService,
    private toastr : ToastrService,
    private fu: FormUtilService,
  ) {}
  
  ngOnInit(): void {
    this.getTimetable()
  }
  getTimetable() {
    this.timeTableService.getTimetable(history.state.mapclassroomteacherId).subscribe((val: any) => {
      this.timetableList = val.timetableList;
      this.row = val.timetableList;
      console.log(this.row)
    });
  }

  getClass(){
    this.timeTableService.getClass(this.keyword).subscribe((res :any[]) => {
      this.ClassList = res;
      
    })
  }

  getTime(){
    this.timeTableService.getTime(this.keyword).subscribe((res :any[]) => {
      this.TimeList = res;
      
    })
  }

  getSubject(){
    this.timeTableService.getSubject(this.keyword).subscribe((res :any[]) => {
      this.SubjectList = res;
      
    })
  }

  openModalDetail(content, row?) {
    this.addForm = this.fb.group({
      timeTableId : null,
      number: [null, [Validators.required, Validators.maxLength(50)]],
      mapclassroomteacherId: null,
      dayValue :[null, [Validators.required, Validators.maxLength(50)]],
      periodId:[null, [Validators.required, Validators.maxLength(50)]],
      subjectId :[null, [Validators.required, Validators.maxLength(50)]]
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
    this.getClass()
    this.getTime()
    this.getSubject()
  }

  save() {
    if (this.addForm.invalid) {
      this.fu.markFormGroupTouched(this.addForm);
      return;
    }
    this.timeTableService.save(this.addForm.value).subscribe(() => {
      console.log(this.addForm.value)
      this.modalRef.close();
      this.message.success('บันทึกข้อมูลสำเร็จ');
      this.getTimetable();
    });
  }
  
  
  remove(timeTableId, modal) {
    this.modalService.open(modal).result.then((result) => {
      if (result.toLowerCase() == 'ok') {
        this.timeTableService.deleteTimetable(timeTableId).subscribe(() => {
          this.message.success('ลบข้อมูลสำเร็จ');
          this.getTimetable();
        });
      }
    }, (reson) => { });
  }

}
