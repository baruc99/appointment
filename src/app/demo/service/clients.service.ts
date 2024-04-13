import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddClientsResponse, Client, DeleteClienteResponse, UpdateClientResponse } from '../components/clients/interfaces';
import { GetAllClients } from '../components/clients/interfaces/getAllClients-response.interfaces';


@Injectable({
    providedIn: 'root'
})
export class ClientsService {

    private readonly baseUrl: String = environment.baseUrl;
    private http = inject(HttpClient);

    constructor() { }

    getAllClients() {
        const url = `${this.baseUrl}/clients`;
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.get<GetAllClients>(url, { headers })
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

    addClientServices(client_name: string, client_lastName: string, client_address: string, phone_id: number, email_id: string): Observable<boolean> {
        const url = `${this.baseUrl}/clients`
        const token = localStorage.getItem('token');
        const body = {
            client_name,
            client_lastName,
            client_address,
            phone_id,
            email_id
        }

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.post<AddClientsResponse>(url, body, { headers, observe: 'response' })
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

    updateClientServices(
        client_id: number,
        client_name: string,
        client_lastName: string,
        client_address: string,
        phone_id: number,
        email_id: string
    ): Observable<boolean> {

        const url = `${this.baseUrl}/clients/${client_id}`
        const token = localStorage.getItem('token');
        const body = {
            client_name,
            client_lastName,
            client_address,
            phone_id,
            email_id
        }

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.put<UpdateClientResponse>(url, body, { headers, observe: 'response' })
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

    deleteClienteServices(client_id: number): Observable<boolean> {
        const url = `${this.baseUrl}/clients/${client_id}`
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);

        return this.http.delete<DeleteClienteResponse>(url, { headers, observe: 'response' })
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
