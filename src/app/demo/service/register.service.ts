import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthStatus, RegisterResponse } from '../components/auth/interfaces';
import { Observable, catchError, map, tap, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private readonly baseUrl: String = environment.baseUrl;
    private http = inject(HttpClient);

    // private _currentUser = signal<User | null>
    // private _registerStatus = signal<AuthStatus>(AuthStatus.created)

    //! mundo exterior
    // public registerStatus = computed(() => this._registerStatus)


    constructor() { }

    register(email: string, nickname: string, password: string, phone_id: number, user_lastName: string, user_name: string, id_timetable: number, roles_id: number): Observable<boolean> {

        const url = `${this.baseUrl}/users`
        const body = {
            email_id: email,
            nickname,
            password,
            phone_id,
            user_lastName,
            user_name,
            roles_id,
        }

        return this.http.post<RegisterResponse>(url, body)
            .pipe(
                tap(({ token }) => {
                    localStorage.setItem('token', token);
                }),
                map(() => true),
                catchError(err => {
                    return throwError(() => err.error.message)
                })
            );
    }

    convertirStringANumero(str) {
        // Intenta convertir el string a un número usando la función parseFloat o parseInt
        // Dependiendo de si deseas números decimales o enteros
        // let numero = parseFloat(str); // Utiliza parseFloat para números decimales
        let numero = parseInt(str, 10); // Utiliza parseInt para números enteros

        // Verifica si el resultado es un número válido o NaN (Not a Number)
        if (!isNaN(numero)) {
            return numero; // Devuelve el número convertido si la conversión fue exitosa
        } else {
            // En caso de que el string no pueda ser convertido a un número, puedes devolver un valor predeterminado
            return null; // O puedes devolver un mensaje de error, lanzar una excepción, etc.
        }
    }

}
