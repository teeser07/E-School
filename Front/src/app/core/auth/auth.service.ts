import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Inject, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, forkJoin, from, interval, Observable, of, Subject } from 'rxjs';
import { catchError, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import * as CryptoJS from 'crypto-js';
import { MessageService } from '../message.service';

class User {
    id: number;
    token: string;
    userName: string;
    expireDate: Date;
    refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private message: MessageService
    ) { }

    init() {
        interval(1 * 60000).subscribe(() => {
            this.authenticated.subscribe(res => {
                if (res) {
                    this.refreshToken(this.user.refreshToken).subscribe((user: User) => {
                        this.user = user;
                    });
                } else {
                    if (!this.router.url.includes('account/signin') && !this.router.url.includes('account/signup')) {
                        this.message.warning('คุณไม่มีสิทธิ์เข้าถึงเนื้อหา');
                        this.signout();
                    }
                }
            });
        });
    }

    signin(value) {
        return this.http.disableAuth().disableHeader().disableLoading().post('account/authenticate', value).pipe(
            tap((user: User) => {
                this.user = user;
            })
        );
    }

    signout() {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/account/signin');
    }

    get user(): User {
        return JSON.parse(localStorage.getItem('user'));
    }

    set user(value) {
        localStorage.setItem('user', JSON.stringify(value));
    }

    get authenticated(): Observable<boolean> {
        if (!this.user)
            return of(false);

        if (!this.user.id || !this.user.token || !this.user.userName || !this.user.expireDate)
            return of(false);

        return of(true);
    }

    get expired() {
        if (new Date(this.user.expireDate) > new Date())
            return false;

        return true;
    }

    private refreshToken(refreshToken) {
        return this.http.disableLoading().post('account/refresh-token', { refreshToken: refreshToken });
    }
}