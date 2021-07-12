import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl,FormGroup, FormBuilder,Validators } from '@angular/forms';
import { TimeService } from './time.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/message.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {
  timeForm : FormGroup;
  row : any[];
  loading: boolean;
  searchControl: FormControl = new FormControl();
  products;
  filteredProducts;
  @ViewChild('modalDelete', { static: true }) modalDelete;
  @ViewChild('modalUpdate', { static: true }) modalUpdate;
  detail ;
  detail1 ; 
  refresh: Subject<any> = new Subject();

  constructor(
    private timeService: TimeService,
    private modalService: NgbModal,
    private Fb: FormBuilder,
    private message : MessageService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.timeForm = this.Fb.group({
      orders : [null,[Validators.min(1), Validators.max(10000)]],
      starttime : [null, [Validators.min(0), Validators.max(100)]],
      endtime : [null, [Validators.min(0), Validators.max(100)]],
      longterm : [null, Validators.required],
    });
    this.timeService.getTime()
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

    const rows = this.products.filter(function(d) {
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
  delete(id:any,i:any){
    console.log(id)
      this.timeService.deleteTime(id).subscribe(res=>{
        this.row.splice(i,1);
        setTimeout(() => {
          this.loading = false;
          this.toastr.success('สำเร็จ', 'ลบรายวิชา', {progressBar: true});
        }, 500);
        this.timeService.getTime()
        .subscribe((res: any[]) => {
        this.products = [...res];
        this.row = res;
        console.log(this.row)
      });
        
    })
  
  }

  confirm(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true})
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  onSubmit():any{
    if (this.timeForm.invalid) {
      this.message.warning('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    this.loading = true;
    this.timeService.saveTime(this.timeForm.value).subscribe(res=>{
      console.log(res);
      setTimeout(() => {
        this.loading = false;
        this.toastr.success('สำเร็จ', 'เพิ่มรายวิชา', {progressBar: true});
      }, 500);
      this.timeService.getTime()
      .subscribe((res: any[]) => {
      this.products = [...res];
      this.row = res;
      console.log(this.row)
    });
      
  })
  }
  
  getId(id:any,i:any){
    console.log(id)
    this.timeService.getTimeDetail(id).subscribe(res =>{
      this.detail = res
      console.log(this.detail)
    })
    this.modalService.open(this.modalDelete, {centered: true })
  }

  getDetail(id:any,i:any){
    console.log(id)
    this.timeService.getTimeDetail(id).subscribe(res=>{
      this.detail1 = res
      console.log(this.detail1)
      this.timeForm.setValue({
        orders : res['orders'],
        starttime : res['starttime'],
        endtime : res['endtime'],
        longterm : res['longterm']
      })
    })
    this.modalService.open(this.modalUpdate, {centered: true })
  }

  Update():any{
    this.timeService. updateTime(this.detail1.times_id,this.timeForm.value).subscribe(()=>{
      console.log('Update Success')
    })
    window.location.reload()
  }


}
