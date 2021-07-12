import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MessageService } from 'src/app/core/message.service';
import { DayService } from './day.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  dayForm: FormGroup;
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
    private dayService: DayService,
    private modalService: NgbModal,
    private Fb: FormBuilder,
    private message: MessageService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.dayForm = this.Fb.group({
      day: [null, Validators.required],
      datetime: [null, Validators.required],
      note: [null, Validators.required],
      year: [null, [Validators.min(2560), Validators.max(10000)]],
      term: [null, [Validators.min(1), Validators.max(9)]],

    });
    this.dayService.getDay()
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
    this.dayService.deleteDay(id).subscribe(res => {
      this.row.splice(i, 1);
      setTimeout(() => {
        this.loading = false;
        this.toastr.success('สำเร็จ', 'ลบวัน', { progressBar: true });
      }, 500);
      this.dayService.getDay()
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
    if (this.dayForm.invalid) {
      this.message.warning('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    this.loading = true;
    this.dayService.saveDay(this.dayForm.value).subscribe(res => {
      console.log(res);
      setTimeout(() => {
        this.loading = false;
        this.toastr.success('สำเร็จ', 'เพิ่มวัน', { progressBar: true });
      }, 500);
      this.dayService.getDay()
        .subscribe((res: any[]) => {
          this.products = [...res];
          this.row = res;
          console.log(this.row)
        });

    })
  }

  getId(id: any, i: any) {
    console.log(id)
    this.dayService.getDayDetail(id).subscribe(res => {
      this.detail = res
      console.log(this.detail)
    })
    this.modalService.open(this.modalDelete, { centered: true })
  }

  getDetail(id: any, i: any) {
    console.log(id)
    this.dayService.getDayDetail(id).subscribe(res => {
      this.detail1 = res
      console.log(this.detail1)
      this.dayForm.setValue({
        day: res['day'],
        datetime: res['datetime'],
        note: res['note'],
        year: res['year'],
        term: res['term']
      })
    })
    this.modalService.open(this.modalUpdate, { centered: true })
  }

  Update(): any {
    if (this.dayForm.invalid) {
      this.message.warning('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    this.loading = true;
    this.dayService.updateDay(this.detail1.days_id, this.dayForm.value).subscribe(() => {
      console.log(this.dayForm)
    })
    

  }

}