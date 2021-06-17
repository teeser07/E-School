import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Inject, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { catchError, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private originUrl: string
    ) { }

    init() {
        
    }

    destory() {
    }

    // get isLoggedIn(): Observable<boolean> {
    //         map(user => {
    //             return user != null && !user.expired
    //         })
    //     )
    // }

    // get claims(): Observable<any> {
    //     return this.user.pipe(
    //         map(user => user.profile)
    //     )
    // }

    // get authorizationHeader(): Observable<string> {
    //     return this.user.pipe(
    //         map(user => user ? `${user.token_type} ${user.access_token}` : '')
    //     )
    // }

    signin() {

    }

    signout() {

    }

    // completeAuthentication() {
    //     return this.manager.pipe(
    //         switchMap(manager => {
    //             return from<any>(manager.signinRedirectCallback()).pipe(
    //                 catchError(() => of({}))
    //             )
    //         })
    //     )

    // }

    // get redirectUrl() {
    //     return sessionStorage.getItem(this.redirectUrlKey) || '/';
    // }
    // set redirectUrl(value) {
    //     sessionStorage.setItem(this.redirectUrlKey, value);
    // }

    get personalInfo(): Observable<any> {
        return this.http.get<any>('personal')
    }

}

// export function getClientSettings(originalUrl): UserManagerSettings {
//     return {
//         client_id: 'tmpc.spa',
//         redirect_uri: originalUrl + 'account/auth-callback',
//         post_logout_redirect_uri: originalUrl,
//         response_type: "code",
//         scope: "openid profile tmpc.resource.api tmpc.content.api ",
//         filterProtocolClaims: false,
//         loadUserInfo: true,
//         automaticSilentRenew: true,
//         accessTokenExpiringNotificationTime: 8,
//         silent_redirect_uri: originalUrl + '/silent.html'
//     };
// }
