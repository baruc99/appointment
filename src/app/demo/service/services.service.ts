import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddServiceResponse, DeleteServiceResponse, GetAllServicesResponse, UpdateSerciveResponse } from '../components/services/interfaces';
import { UpdateClientResponse } from '../components/clients/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {

    private readonly baseUrl: String = environment.baseUrl;
    private http = inject(HttpClient);

    constructor() { }

    addServiceServices(service_name: string, service_description: string, service_price: number, service_approximate_time: number): Observable<boolean> {
        const url = `${this.baseUrl}/service`
        const token = localStorage.getItem('token');
        const body = {
            service_name,
            service_description,
            service_price,
            service_approximate_time,
        }

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.post<AddServiceResponse>(url, body, { headers, observe: 'response' })
            .pipe(
                map(response => {
                    console.log(response);

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

    getAllServices() {
        const url = `${this.baseUrl}/services`;
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.get<GetAllServicesResponse>(url, { headers })
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

    updateClientServices(
        service_id: number,
        service_name: string,
        service_description: string,
        service_price: number,
        service_approximate_time: string,
        userAdd: number
    ): Observable<boolean> {

        const url = `${this.baseUrl}/service/${service_id}`
        const token = localStorage.getItem('token');
        const body = {
            service_name,
            service_description,
            service_price,
            service_approximate_time,
            userAdd
        }

        // console.log( body );

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.put<UpdateSerciveResponse>(url, body, { headers, observe: 'response' })
            .pipe(
                map(response => {
                    console.log(response);

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

    deleteServiceServices(service_id: number): Observable<boolean> {
        const url = `${this.baseUrl}/service/${service_id}`
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.delete<DeleteServiceResponse>(url, { headers, observe: 'response' })
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

}
