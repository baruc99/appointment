import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../components/auth/interfaces';
import { Client } from '../components/clients/interfaces';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private readonly baseUrl: String = environment.baseUrl;
    private http = inject(HttpClient);

    private _currentUser = signal<User | null>(null)
    private _authStatus = signal<AuthStatus>(AuthStatus.checking)

    //! al mundo exterior

    public currentUser = computed(() => this._currentUser());
    public authStatus = computed(() => this._authStatus())

    private setAunthentication(user: User, token: string): boolean {
        this._currentUser.set(user)
        this._authStatus.set(AuthStatus.aunthenticated)
        localStorage.setItem('token', token);

        return true
    }


    constructor() {
        this.checkAuthStatus().subscribe();
    }

    login(usuario: string, password: string): Observable<boolean> {

        const url = `${this.baseUrl}/users/login`
        const body = {
            usuario,
            password,
        }

        return this.http.post<LoginResponse>(url, body)
            .pipe(
                map(({ token, user }) => this.setAunthentication(user, token)),
                catchError(err => {
                    return throwError(() => err.error.message)
                })
            );
    }

    checkAuthStatus(): Observable<boolean> {
        const url = `${this.baseUrl}/users/login/check-token`

        const token = localStorage.getItem('token');

        if (!token) {
            this.logout();
            return of(false)
        }

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.get<CheckTokenResponse>(url, {
            headers
        }).pipe(
            map(({ token, user }) => this.setAunthentication(user, token)),
            catchError(() => {
                this._authStatus.set(AuthStatus.notAunthenticated)
                return of(false)
            })
        )

    }

    getUserByToken(): Observable<User> {
        const token = localStorage.getItem('token');

        const url = `${this.baseUrl}/user/getUserByToken`;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.get<User>(url, { headers }).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                console.error('Error al obtener el usuario por token', error);
                return throwError(() => new Error('Error al obtener el usuario por token'));
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        this._currentUser.set(null)
        this._authStatus.set(AuthStatus.notAunthenticated)
    }

}
