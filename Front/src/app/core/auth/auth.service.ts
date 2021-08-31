import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Inject, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, forkJoin, from, interval, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, first, map, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import * as CryptoJS from 'crypto-js';
import { MessageService } from '../message.service';

class User {
    id: number;
    role: string;
    empCode: string;
    studentCode: string;
    token: string;
    userName: string;
    expireDate: Date;
    refreshToken: string;
    empProfileId :number;
    studentProfileId :number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    intervalSub: Subscription;

    constructor(
        private http: HttpClient,
        private router: Router,
        private message: MessageService
    ) { }

    init() {
        this.authenticated.subscribe(res => {
            if (res) {
                if (this.tokenExpired) {
                    this.refreshToken(this.user.refreshToken).subscribe((user: User) => this.user = user);
                } else {
                    this.intervalSub = interval(10 * 60000).subscribe(() => {
                        this.refreshToken(this.user.refreshToken).subscribe((user: User) => this.user = user);
                    });
                }
            } else {
                if (!this.router.url.includes('account/signin') && !this.router.url.includes('account/signup')) {
                    this.signout();
                }
            }
        });
    }

    signin(value) {
        return this.http.disableAuth().disableHeader().disableLoading().post('account/authenticate', value).pipe(
            tap((user: User) => this.user = user),
            //tap(() => this.init())
        );
    }

    signout() {
        localStorage.removeItem('user');
        if (this.intervalSub) this.intervalSub.unsubscribe();
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

        if (!this.user.id || 
            !this.user.role ||
            !(this.user.empCode || this.user.studentCode) ||
            !this.user.token || 
            !this.user.expireDate)
            return of(false);

        return of(true);
    }

    get tokenExpired() {
        if (new Date(this.user.expireDate) > new Date())
            return false;

        return true;
    }

    private refreshToken(refreshToken) {
        return this.http.disableLoading().skipErrorHandler().post('account/refresh-token', { refreshToken: refreshToken });
    }
}