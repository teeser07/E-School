import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'src/app/core/message.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private message: MessageService
    ) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Loading Dashboard Module...';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });

        this.signinForm = this.fb.group({
            userName: [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    signin() {
        if (this.signinForm.invalid) {
            this.message.warning('กรอกข้อมูลให้ครบถ้วน');
            return;
        } 

        this.loading = true;
        this.loadingText = 'Sigining in...';
        this.auth.signin(this.signinForm.value).pipe(
            finalize(() => this.loading = false)
        ).subscribe(() => {
            this.loading = false;
            this.message.success('เข้าสู่ระบบสำเร็จ');
            this.router.navigateByUrl('/page/lobby');
        });
    }

}
