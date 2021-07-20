import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PeriodService } from './period.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {
  periodForm: FormGroup;
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
    private periodService: PeriodService,
    private modalService: NgbModal,
    private Fb: FormBuilder,
    private message: MessageService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.periodForm = this.Fb.group({
      order: [null, [Validators.min(1), Validators.max(10000)]],
      start_time: [null, [Validators.min(0), Validators.max(100)]],
      end_time: [null, [Validators.min(0), Validators.max(100)]],
    });
    this.periodService.getPeriod()
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
    this.periodService.deletePeriod(id).subscribe(res => {
      this.row.splice(i, 1);
      setTimeout(() => {
        this.loading = false;
        this.toastr.success('สำเร็จ', 'ลบรายวิชา', { progressBar: true });
      }, 500);
      this.periodService.getPeriod()
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
    if (this.periodForm.invalid) {
      this.message.warning('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    this.loading = true;
    this.periodService.savePeriod(this.periodForm.value).subscribe(res => {
      console.log(res);
      setTimeout(() => {
        this.loading = false;
        this.toastr.success('สำเร็จ', 'เพิ่มรายวิชา', { progressBar: true });
      }, 500);
      this.periodService.getPeriod()
        .subscribe((res: any[]) => {
          this.products = [...res];
          this.row = res;
          console.log(this.row)
        });
    })
  }
  getId(id: any, i: any) {
    console.log(id)
    this.periodService.getPeriodDetail(id).subscribe(res => {
      this.detail = res
      console.log(this.detail)
    })
    this.modalService.open(this.modalDelete, { centered: true })
  }

  getDetail(id: any, i: any) {
    console.log(id)
    this.periodService.getPeriodDetail(id).subscribe(res => {
      this.detail1 = res
      console.log(this.detail1)
      this.periodForm.setValue({
        order: res['order'],
        start_time: res['start_time'],
        end_time: res['end_time'],
      })
    })
    this.modalService.open(this.modalUpdate, { centered: true })
  }

  Update(): any {
    this.periodService.updatePeriod(this.detail1.period_id, this.periodForm.value).subscribe(() => {
      console.log('Update Success')
    })
    window.location.reload()
  }

}
