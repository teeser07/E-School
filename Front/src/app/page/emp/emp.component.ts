import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { MessageService } from 'src/app/core/message.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import { ProductService } from 'src/app/shared/theme/services/product.service';
import { EmpService } from './emp.service';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.scss']
})
export class EmpComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  products;
  filteredProducts;
  modalRef: NgbModalRef;
  addForm: FormGroup;
  empList: any;
  keyword: string = '';

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private fu: FormUtilService,
    private http: EmpService,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.search();
  }

  search() {
    this.http.getEmp(this.keyword).subscribe(res => {
      this.empList = res;
    });
  }

  openModalDetail(content, row?) {
    this.addForm = this.fb.group({
      empCode: [null, [Validators.required, Validators.maxLength(10)]],
      role: [null, Validators.required],
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      tel: [null, [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9-#,]*')]],
      status: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.maxLength(50), Validators.email]],
      password: [null, [Validators.required, Validators.maxLength(50)]],
      comfirmPassword: [null, [Validators.required, Validators.maxLength(50)]],
      userId: null,
      empProfileId: null
    });
    this.addForm.controls.password.valueChanges.subscribe(val => {
      if (val && val == this.addForm.value.comfirmPassword) {
        this.addForm.controls.comfirmPassword.setErrors(null);
      } else if (val && val != this.addForm.value.comfirmPassword) {
        this.addForm.controls.comfirmPassword.setErrors({ notMatchPasword: true });
      }
    });
    this.addForm.controls.comfirmPassword.valueChanges.subscribe(val => {
      if (val && val == this.addForm.value.password) {
        this.addForm.controls.comfirmPassword.setErrors(null);
      } else if (val && val != this.addForm.value.password) {
        this.addForm.controls.comfirmPassword.setErrors({ notMatchPasword: true });
      } else {
        this.addForm.controls.comfirmPassword.setErrors({ required: true });
      }
    });
    if (row) {
      this.addForm.patchValue(row, { emitEvent: false });
      this.addForm.controls.empCode.disable();
      this.addForm.controls.email.disable();
    }
    this.modalRef = this.modalService.open(content);
  }

  save() {
    if (this.addForm.invalid) {
      this.fu.markFormGroupTouched(this.addForm);
      return;
    }
    this.http.save(this.addForm.value).subscribe(() => {
      this.modalRef.close();
      console.log(this.addForm)
      this.message.success('บันทึกข้อมูลสำเร็จ');
      this.search();
    });
  }

  remove(userId, modal) {
    this.modalService.open(modal).result.then((result) => {
      if (result.toLowerCase() == 'ok') {
        this.http.delete(userId).subscribe(() => {
          this.message.success('ลบข้อมูลสำเร็จ');
          this.search();
        });
      }
    }, (reson) => { });
  }
}
