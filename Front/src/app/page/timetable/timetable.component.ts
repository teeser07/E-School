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
  ) { 
    
  }

  ngOnInit(): void {
    this.getClass()
  }

  getClass(){
    this.timeTableService.getClass(this.keyword).subscribe((res :any[]) => {
      this.ClassList = res;
      this.row = res;
      console.log(this.row)
    })
  }


}
