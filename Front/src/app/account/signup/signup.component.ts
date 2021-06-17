import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/core/message.service';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [SharedAnimations]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private message: MessageService,
    private http: SignupService,
    private router: Router,) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      retypePassword: [null, Validators.required],
    });
  }

  signup() {
    if (this.signupForm.invalid) {
      this.message.warning('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (this.signupForm.value.password != this.signupForm.value.retypePassword) {
      this.message.warning('รหัสผ่านไม่เหมือนกัน');
      return;
    }

    this.loading = true;
    this.http.signup(this.signupForm.value).pipe(finalize(() => this.loading = false)).subscribe(() => {
      this.message.success('สมัครสมาชิกสำเร็จ');
      this.router.navigateByUrl('/account/signin');
    });
  }

}
