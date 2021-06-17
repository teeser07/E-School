import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Inject, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, forkJoin, from, Observable, of, Subject } from 'rxjs';
import { catchError, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class Profile {
    profileId: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    checkSignin() {
        if (!this.profile) this.router.navigateByUrl('/account/signin');
    }

    signin(value) {
        return this.http.post('account/signin', value).pipe(
            tap(value => this.profile = value)
        );
    }

    signout() {
        localStorage.removeItem('profile');
        this.router.navigateByUrl('/account/signin');
    }

    get profile() {
        return JSON.parse(localStorage.getItem('profile'));
    }

    set profile(value) {
        localStorage.setItem('profile', JSON.stringify(value))
    }
}