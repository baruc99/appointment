import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DeleteUserbyAdminResponse, GetAllRoles, GetAllTimeTables, GetAllUserByAdminResponse } from '../components/users/interface';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { RegisterResponse } from '../components/auth/interfaces';
import { DeleteClienteResponse } from '../components/clients/interfaces';
import { DeleteTimeTableResponse } from '../components/users/interface/deleteTimeTable-response.interface';
import { UpdateTimeTableResponse } from '../components/users/interface/updateTimeTable-response.interface';
import { UpdateUserByAdminResponse } from '../components/users/interface/updateUserByAdmin-response.interface';


@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private readonly baseUrl: String = environment.baseUrl;
    private http = inject(HttpClient);

    constructor() { }

    getAllRoles() {
        const url = `${this.baseUrl}/roles`;
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.get<GetAllRoles>(url, { headers })
            .pipe(
                map(response => {
                    return response['resp'];
                }),
                catchError(error => {
                    // Aquí manejas los errores, puedes decidir qué hacer con ellos.
                    // Por ejemplo, podrías simplemente reenviar el error:
                    console.error('Error al obtener los clientes', error);
                    return throwError(() => new Error('Error al obtener los clientes: ' + error.message));
                })
            );
    }

    addUser(email: string, nickname: string, password: string, phone_id: number, user_lastName: string, user_name: string, id_timetable: number, roles_id: number): Observable<boolean> {

        const url = `${this.baseUrl}/addUsers`
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        const body = {
            email_id: email,
            nickname,
            password,
            phone_id,
            user_lastName,
            user_name,
            roles_id,
            id_timetable
        }


        return this.http.post<RegisterResponse>(url, body, { headers, observe: 'response' })
            .pipe(
                map(response => {
                    if (response.status === 201) {
                        return true;
                    } else {
                        throw new Error(response['message']);
                    }
                }),
                catchError(err => {
                    return throwError(() => err.error.message)
                })
            );
    }

    getAllUsersbyadmin() {
        const url = `${this.baseUrl}/userbyadmin`;
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.get<GetAllUserByAdminResponse>(url, { headers })
            .pipe(
                map(response => {
                    return response['resp'];
                }),
                catchError(error => {
                    console.error('Error al obtener los usuarios', error);
                    return throwError(() => new Error('Error al obtener los usuarios: ' + error.message));
                })
            );
    }

    deleteUserByAdmin(id: number): Observable<boolean> {
        const url = `${this.baseUrl}/userbyadmin/${id}`
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.delete<DeleteUserbyAdminResponse>(url, { headers, observe: 'response' })
            .pipe(
                map(response => {
                    if (response.status === 200) {
                        return true;
                    } else {
                        throw new Error(response['message']);
                    }
                }),
                catchError(err => {
                    return throwError(() => err.error.message)
                })
            );
    }

    updateUserByAdmin(
        user_id: number,
        user_name: string,
        user_lastName: string,
        nickname: string,
        phone_id: number,
        email_id: string,
        password: string,
        id_timetable: number,
        roles_id: number,
    ): Observable<boolean> {

        const url = `${this.baseUrl}/userbyadmin/${user_id}`
        const token = localStorage.getItem('token');
        const body = {
            user_name,
            user_lastName,
            nickname,
            phone_id,
            email_id,
            password,
            id_timetable,
            roles_id
        }

        console.log( body );


        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.put<UpdateUserByAdminResponse>(url, body, { headers, observe: 'response' })
            .pipe(
                map(response => {
                    if (response.status === 200) {
                        return true;
                    } else {
                        throw new Error(response['message']);
                    }
                }),
                catchError(err => {
                    console.log(err);

                    return throwError(() => err.error.message)
                })
            );
    }

    // timetables

    addTimeTable(
        description_timetable: string,
        monday_start: string,
        monday_end: string,
        tuesday_start: string,
        tuesday_end: string,
        wednesday_start: string,
        wednesday_end: string,
        thursday_start: string,
        thursday_end: string,
        friday_start: string,
        friday_end: string,
        saturday_start: string,
        saturday_end: string,
        sunday_start: string,
        sunday_end: string,
    ): Observable<boolean> {
        const url = `${this.baseUrl}/addtimeTable`
        const token = localStorage.getItem('token');
        const body = {
            description_timetable,
            monday_start,
            monday_end,
            tuesday_start,
            tuesday_end,
            wednesday_start,
            wednesday_end,
            thursday_start,
            thursday_end,
            friday_start,
            friday_end,
            saturday_start,
            saturday_end,
            sunday_start,
            sunday_end
        }

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.post<UpdateTimeTableResponse>(url, body, { headers, observe: 'response' })
            .pipe(
                map(response => {
                    if (response.status === 200) {
                        return true;
                    } else {
                        throw new Error(response['message']);
                    }
                }),
                catchError(err => {
                    console.log(err);

                    return throwError(() => err.error.message)
                })
            );
    }

    updateTimeTableServices(
        id_timetable: number,
        description_timetable: string,
        monday_start: string,
        monday_end: string,
        tuesday_start: string,
        tuesday_end: string,
        wednesday_start: string,
        wednesday_end: string,
        thursday_start: string,
        thursday_end: string,
        friday_start: string,
        friday_end: string,
        saturday_start: string,
        saturday_end: string,
        sunday_start: string,
        sunday_end: string,
    ): Observable<boolean> {

        const url = `${this.baseUrl}/timeTable/${id_timetable}`
        const token = localStorage.getItem('token');
        const body = {
            description_timetable,
            monday_start,
            monday_end,
            tuesday_start,
            tuesday_end,
            wednesday_start,
            wednesday_end,
            thursday_start,
            thursday_end,
            friday_start,
            friday_end,
            saturday_start,
            saturday_end,
            sunday_start,
            sunday_end
        }



        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.put<UpdateTimeTableResponse>(url, body, { headers, observe: 'response' })
            .pipe(
                map(response => {
                    if (response.status === 200) {
                        return true;
                    } else {
                        throw new Error(response['message']);
                    }
                }),
                catchError(err => {
                    console.log(err);

                    return throwError(() => err.error.message)
                })
            );
    }

    deleteTimeTableServices(id: number): Observable<boolean> {
        const url = `${this.baseUrl}/timeTable/${id}`
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.delete<DeleteTimeTableResponse>(url, { headers, observe: 'response' })
            .pipe(
                map(response => {
                    if (response.status === 200) {
                        return true;
                    } else {
                        throw new Error(response['message']);
                    }
                }),
                catchError(err => {
                    return throwError(() => err.error.message)
                })
            );
    }

    getAllTimeTables() {
        const url = `${this.baseUrl}/timeTable`;
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.get<GetAllTimeTables>(url, { headers })
            .pipe(
                map(response => {
                    return response['resp'];
                }),
                catchError(error => {
                    console.error('Error al obtener los horarios', error);
                    return throwError(() => new Error('Error al obtener los horarios: ' + error.message));
                })
            );
    }

    parseTimeStringToTimeDate(timeString) {
        const timeParts = timeString.split(':');
        const timeDate = new Date();



        timeDate.setHours(parseInt(timeParts[0], 10));
        timeDate.setMinutes(parseInt(timeParts[1], 10));
        timeDate.setSeconds(parseInt(timeParts[2], 10));

        // console.log(timeDate);

        return timeDate;
    }

    extractHourAndMinute(approximate_time) {
        let soloHora = '';

        if (typeof approximate_time === 'object' && approximate_time !== null) {
            // Si approximate_time es un objeto
            if (approximate_time instanceof Date) {
                // Si approximate_time es un objeto Date
                const horas = approximate_time.getHours();
                const minutos = approximate_time.getMinutes();
                soloHora = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
            } else {
                console.error('Error: El objeto proporcionado no es una instancia de Date.');
            }
        } else if (typeof approximate_time === 'string') {
            // Si approximate_time es una cadena
            const timeParts = approximate_time.split(':');
            if (timeParts.length >= 2) {
                const horas = parseInt(timeParts[0], 10);
                const minutos = parseInt(timeParts[1], 10);
                if (!isNaN(horas) && !isNaN(minutos)) {
                    const formattedHours = horas.toString().padStart(2, '0');
                    const formattedMinutes = minutos.toString().padStart(2, '0');
                    soloHora = `${formattedHours}:${formattedMinutes}`;
                } else {
                    console.error('Error: Los valores de horas y minutos no son válidos.');
                }
            } else {
                console.error('Error: La cadena proporcionada no tiene un formato válido de hora.');
            }
        } else {
            console.error('Error: approximate_time no es un objeto ni una cadena.');
        }

        return soloHora;
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
