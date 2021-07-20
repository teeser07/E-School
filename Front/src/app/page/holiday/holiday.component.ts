import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { MessageService } from 'src/app/core/message.service';
import { HolidayService } from './holiday.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
  holidayForm: FormGroup;
  row: any[];
  loading: boolean;
  searchControl: FormControl = new FormControl();
  products;
  filteredProducts;
  @ViewChild('modalDelete', { static: true }) modalDelete;
  @ViewChild('modalUpdate', { static: true }) modalUpdate;
  detail;
  detail1;
  refresh: Subject<any> = new Subject();

  constructor(
    private holidayService: HolidayService,
    private modalService: NgbModal,
    private Fb: FormBuilder,
    private message: MessageService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.holidayForm = this.Fb.group({
      date: [null, Validators.required],
      note: [null, Validators.required],

    });
    this.holidayService.getHoliday()
      .subscribe((res: any[]) => {
        this.products = [...res];
        this.row = res;
        console.log(this.row)
      });
    this.searchControl.valueChanges
      .pipe(debounceTime(100))
      .subscribe(value => {
        this.filerData(value);
      });
  }
  filerData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.row = [...this.products];
    }

    const columns = Object.keys(this.products[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.products.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.row = rows;
  }
  delete(id: any, i: any) {
    console.log(id)
    this.holidayService.deleteHoliday(id).subscribe(res => {
      this.row.splice(i, 1);
      setTimeout(() => {
        this.loading = false;
        this.toastr.success('สำเร็จ', 'ลบวัน', { progressBar: true });
      }, 500);
      this.holidayService.getHoliday()
        .subscribe((res: any[]) => {
          this.products = [...res];
          this.row = res;
          console.log(this.row)
        });
    })
  }

  confirm(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        console.log(result);
      }, (reason) => {
        console.log('Err!', reason);
      });
  }

  onSubmit(): any {
    if (this.holidayForm.invalid) {
      this.message.warning('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    this.loading = true;
    this.holidayService.saveHoliday(this.holidayForm.value).subscribe(res => {
      console.log(res);
      setTimeout(() => {
        this.loading = false;
        this.toastr.success('สำเร็จ', 'เพิ่มวัน', { progressBar: true });
      }, 500);
      this.holidayService.getHoliday()
        .subscribe((res: any[]) => {
          this.products = [...res];
          this.row = res;
          console.log(this.row)
        });

    })
  }

  getId(id: any, i: any) {
    console.log(id)
    this.holidayService.getHolidayDetail(id).subscribe(res => {
      this.detail = res
      console.log(this.detail)
    })
    this.modalService.open(this.modalDelete, { centered: true })
  }

  getDetail(id: any, i: any) {
    console.log(id)
    this.holidayService.getHolidayDetail(id).subscribe(res => {
      this.detail1 = res
      console.log(this.detail1)
      this.holidayForm.setValue({
        date: res['date'],
        note: res['note']
      })
    })
    this.modalService.open(this.modalUpdate, { centered: true })
  }

  Update(): any {
    if (this.holidayForm.invalid) {
      this.message.warning('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    this.loading = true;
    this.holidayService.updateHoliday(this.detail1.holiday_id, this.holidayForm.value).subscribe(() => {
      console.log(this.holidayForm)
    })
  }

}
