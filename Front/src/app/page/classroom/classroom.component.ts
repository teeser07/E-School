import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { ClassroomService } from './classroom.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/core/message.service';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  products;
  filteredProducts;
  confirmResut;
  roomForm : FormGroup ;
  row:any[];
  loading: boolean;
  @ViewChild('modalDelete', { static: true }) modalDelete;
  @ViewChild('modalUpdate', { static: true }) modalUpdate;
  detail ;
  detail1 ;


  constructor(
    private classroomService : ClassroomService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private message: MessageService,
    private toastr : ToastrService,
   ) { }

  ngOnInit() {
    this.roomForm = this.formBuilder.group({
      clas: [null, Validators.required],
      classroom: [null, Validators.required],
      maxstd: [null, Validators.required],
    });

    
    this.classroomService.getRoom()
    .subscribe((res: any[]) => {
      this.products = [...res];
      this.row = res;
      console.log(this.row)
    });

    this.searchControl.valueChanges
    .pipe(debounceTime(200))
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
  
  confirm(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title'})
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  onSubmit() :any {
    if (this.roomForm.invalid) {
      this.message.warning('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    this.loading = true;
    this.classroomService.addRoom(this.roomForm.value).subscribe(()=>{
      console.log('add success');
      this.toastr.success('สำเร็จ', 'เพิ่มห้องเรียน', {progressBar: true});
      setTimeout(() => {
  
      },1000);
    })
    
    this.classroomService.getRoom()
    .subscribe((res: any[]) => {
      this.products = [...res];
      this.row = res;
      console.log(this.row)
    });
  }

  getId(id:any,i:any){
    console.log(id)
    this.classroomService.gatDetailRoom(id).subscribe(res =>{
      this.detail = res
      console.log(this.detail)
    })
    this.modalService.open(this.modalDelete, {centered: true })
  }

  delete(id:any,i:any){
    console.log(id)
    this.classroomService.deleteRoom(id).subscribe(res=>{
      this.row.splice(i,1);
      setTimeout(() => {
        this.loading = false;
        this.toastr.success('สำเร็จ', 'ลบห้องเรียน', {progressBar: true});
      },500);
      this.classroomService.getRoom()
        .subscribe((res: any[]) => {
        this.products = [...res];
        this.row = res;
        console.log(this.row)
      });
    })
  }

  getDetail(id:any,i:any){
    console.log(id)
    this.classroomService.gatDetailRoom(id).subscribe(res =>{
      this.detail1 = res
      console.log(this.detail1)
      this.roomForm.setValue({
        clas : res['clas'],
        classroom : res['classroom'],
        maxstd : res['maxstd']
      })
    })
    this.modalService.open(this.modalUpdate, {centered : true})
  }

  updateRoom():any{
    this.classroomService.update(this.detail1.room_id,this.roomForm.value).subscribe(()=>{
      console.log('Update Success')
    })
    window.location.reload();
  }
}
