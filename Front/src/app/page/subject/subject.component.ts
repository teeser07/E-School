import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators } from '@angular/forms';
import { SubjectService } from './subject.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/core/message.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  products;
  filteredProducts;
  modalRef: NgbModalRef;
  addForm: FormGroup;
  subjectList: any ;
  row: any[];
  keyword: string = '';
  key : string = 'T';
  EmpList :any[] =[];

  constructor(
    private router : Router,
    private subjectService : SubjectService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private message: MessageService,
    private toastr : ToastrService,
    private fu: FormUtilService,

  ) { }

  ngOnInit() {
    this.search();
  }
  search() {
    this.subjectService.getSubject(this.keyword).subscribe((res :any[]) => {
      this.subjectList = res;
      this.row = res;
      console.log(this.row)
    });
  }
  getEmp(){
    this.subjectService.getEmp(this.key).subscribe((res :any[]) => {
      this.EmpList = res;
    })
  }
  openModalDetail(content, row?) {
    this.addForm = this.fb.group({
      subjectCode: [null, [Validators.required, Validators.maxLength(50)]],
      subjectName: [null, [Validators.required, Validators.maxLength(50)]],
      subjectTeacherId: [null, [Validators.required, Validators.maxLength(50)]],
      subjectId: null
    });
    if (row) {
      this.addForm.patchValue(row, { emitEvent: false });
      console.log(this.addForm)
    }
    this.modalRef = this.modalService.open(content);
    this.getEmp()
    
  }
  save() {
    if (this.addForm.invalid) {
      this.fu.markFormGroupTouched(this.addForm);
      return;
    }
    this.subjectService.save(this.addForm.value).subscribe(() => {
      this.modalRef.close();
      this.message.success('บันทึกข้อมูลสำเร็จ');
      this.search();
    });
  }

  remove(subjectId, modal) {
    this.modalService.open(modal).result.then((result) => {
      if (result.toLowerCase() == 'ok') {
        this.subjectService.deleteSubject(subjectId).subscribe(() => {
          this.message.success('ลบข้อมูลสำเร็จ');
          this.search();
        });
      }
    }, (reson) => { });
  }
  
  
}
 
  

  

  
  
  
  

 



