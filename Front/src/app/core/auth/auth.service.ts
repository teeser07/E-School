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

    aseKey: string = 'cw29Ky7d7SJZU9bfLyd6DOE6db6rVausz4MZyi3W';

    constructor(
        private http: HttpClient,
        private router: Router,
        private message: MessageService
    ) { }

    init() {
        // refresh token automatic
        interval(1 * 60000).subscribe(() => {
            this.authenticated.subscribe(res => {
                if (res) {
                    try {
                        this.refreshToken(this.decrypt(this.user.refreshToken)).subscribe((user: User) => {
                            Object.assign(user, { refreshToken: this.encrypt(user.refreshToken) });
                            this.user = user;
                        });
                    } catch {
                        this.message.warning('คุณไม่มีสิทธิ์เข้าถึงเนื้อหา');
                        this.signout();
                    }
                } else {
                    if (!this.router.url.includes('account/signin') && !this.router.url.includes('account/signup')) {
                        this.signout();
                    }
                }
            });
        });


    }

    private encrypt(plainText) {
        return CryptoJS.AES.encrypt(plainText, this.aseKey).toString();
    }

    private decrypt(cipherText) {
        const bytes = CryptoJS.AES.decrypt(cipherText, this.aseKey);
        const plainText = bytes.toString(CryptoJS.enc.Utf8);
        return plainText;
    }

    signin(value) {
        return this.http.disableAuth().disableHeader().disableLoading().post('account/authenticate', value).pipe(
            tap((user: User) => {
                Object.assign(user, { refreshToken: this.encrypt(user.refreshToken) });
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

        // if (new Date(this.user.expireDate) < new Date()) {
        //     return this.refreshToken().pipe(
        //         tap((user: User) => this.user = user),
        //         switchMap(() => of(true))
        //     );
        // }

        return of(true);
    }

    get expired() {
        if (new Date(this.user.expireDate) > new Date())
            return false;

        return true;
    }

    private refreshToken(token) {
        return this.http.disableLoading().post('account/refresh-token', { token: token });
    }
}