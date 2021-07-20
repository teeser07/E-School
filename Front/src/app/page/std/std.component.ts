import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { MessageService } from 'src/app/core/message.service';
import { FormUtilService } from 'src/app/shared/services/form-util.service';
import { ProductService } from 'src/app/shared/theme/services/product.service';
import { StdService } from './std.service';
@Component({
  selector: 'app-std',
  templateUrl: './std.component.html',
  styleUrls: ['./std.component.scss']
})
export class StdComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  products;
  filteredProducts;
  modalRef: NgbModalRef;
  addForm: FormGroup;
  stdList: any;
  keyword: string = '';

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private stdService : StdService,
    private fb: FormBuilder,
    private fu: FormUtilService,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.search();
    
  }

  search() {
    this.stdService.getStd(this.keyword).subscribe(res => {
      this.stdList = res;
    });
  }

  openModalDetail(content, row?) {
    this.addForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      studentCode: [null, [Validators.required, Validators.maxLength(10)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      tel: [null, [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9-#,]*')]],
      status: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.maxLength(50)]],
      comfirmPassword: [null, [Validators.required, Validators.maxLength(50)]],
      userId: null,
      studentProfileId: null
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
      this.addForm.controls.studentCode.disable();
    }
    this.modalRef = this.modalService.open(content);
  }
  save() {
    if (this.addForm.invalid) {
      this.fu.markFormGroupTouched(this.addForm);
      return;
    }
    this.stdService.save(this.addForm.value).subscribe(() => {
      this.modalRef.close();
      this.message.success('บันทึกข้อมูลสำเร็จ');
      this.search();
    });
  }

  remove(userId, modal) {
    this.modalService.open(modal).result.then((result) => {
      if (result.toLowerCase() == 'ok') {
        this.stdService.delete(userId).subscribe(() => {
          this.message.success('ลบข้อมูลสำเร็จ');
          this.search();
        });
      }
    }, (reson) => { });
  }

}
