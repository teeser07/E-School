import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl,FormGroup, FormBuilder,Validators } from '@angular/forms';
import { SubjectService } from './subject.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/core/message.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  
  subjectForm : FormGroup;
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
    private subjectService: SubjectService,
    private modalService: NgbModal,
    private Fb: FormBuilder,
    private message : MessageService,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
    this.subjectForm = this.Fb.group({
      codesubject : [null, Validators.required],
      credit : [null, [Validators.min(1), Validators.max(9)]],
      subjecttitle : [null, Validators.required],
    });
    this.subjectService.getSubject()
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
      this.subjectService.deleteSubject(id).subscribe(res=>{
        this.row.splice(i,1);
        setTimeout(() => {
          this.loading = false;
          this.toastr.success('สำเร็จ', 'ลบรายวิชา', {progressBar: true});
        }, 500);
        this.subjectService.getSubject()
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
    if (this.subjectForm.invalid) {
      this.message.warning('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    this.loading = true;
    this.subjectService.saveSubject(this.subjectForm.value).subscribe(res=>{
      console.log(res);
      setTimeout(() => {
        this.loading = false;
        this.toastr.success('สำเร็จ', 'เพิ่มรายวิชา', {progressBar: true});
      }, 500);
      this.subjectService.getSubject()
      .subscribe((res: any[]) => {
      this.products = [...res];
      this.row = res;
      console.log(this.row)
    });
      
  })
  }
  
  getId(id:any,i:any){
    console.log(id)
    this.subjectService.getSubjectDetail(id).subscribe(res =>{
      this.detail = res
      console.log(this.detail)
    })
    this.modalService.open(this.modalDelete, {centered: true })
  }

  getDetail(id:any,i:any){
    console.log(id)
    this.subjectService.getSubjectDetail(id).subscribe(res=>{
      this.detail1 = res
      console.log(this.detail1)
      this.subjectForm.setValue({
        codesubject : res['codesubject'],
        credit : res['credit'],
        subjecttitle : res['subjecttitle']
      })
    })
    this.modalService.open(this.modalUpdate, {centered: true })
  }

  Update():any{
    this.subjectService.updateSubject(this.detail1.subject_id,this.subjectForm.value).subscribe(()=>{
      console.log('Update Success')
    })
    window.location.reload()
  }


}
