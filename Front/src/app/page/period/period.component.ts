import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { PeriodService } from './period.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/core/message.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  products;
  filteredProducts;
  modalRef: NgbModalRef;
  addForm: FormGroup;
  periodList: any ;
  row: any[];
  keyword: string = '';

  constructor(
    private router : Router,
    private periodService : PeriodService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private message: MessageService,
    private toastr : ToastrService,
    private fu: FormUtilService,
  ) { }

  ngOnInit(): void {
    this.search();
  }
  
  search() {
    this.periodService.getPeriod(this.keyword).subscribe((res :any[]) => {
      this.periodList = res;
      this.row = res;
      console.log(this.row)
    });
  }
  openModalDetail(content, row?) {
    this.addForm = this.fb.group({
      order: [null, [Validators.required, Validators.maxLength(50)]],
      startTime: [null, [Validators.required, Validators.maxLength(50)]],
      endTime: [null, [Validators.required, Validators.maxLength(50)]],
      periodId: null
    });
    if (row) {
      this.addForm.patchValue(row, { emitEvent: false });
      console.log(this.addForm)
    }
    this.modalRef = this.modalService.open(content);
    
  }
  save() {
    if (this.addForm.invalid) {
      this.fu.markFormGroupTouched(this.addForm);
      return;
    }
    this.periodService.save(this.addForm.value).subscribe(() => {
      this.modalRef.close();
      this.message.success('บันทึกข้อมูลสำเร็จ');
      this.search();
    });
  }

  remove(periodId, modal) {
    this.modalService.open(modal).result.then((result) => {
      if (result.toLowerCase() == 'ok') {
        this.periodService.deletePeriod(periodId).subscribe(() => {
          this.message.success('ลบข้อมูลสำเร็จ');
          this.search();
        });
      }
    }, (reson) => { });
  }
}
