import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import * as custumValidators from '../../shared/validators/validators';

import { RegisterService } from 'src/app/demo/service/register.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
})
export class RegisterComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    mostrarInput: boolean = false;

    private fb = inject(FormBuilder);
    private registerService = inject(RegisterService);
    private router = inject(Router);
    private spinner = inject(NgxSpinnerService);


    constructor(public layoutService: LayoutService) { }

    public registerForm: FormGroup = this.fb.group({
        user_name: [``, [Validators.required, Validators.minLength(4)]],
        user_lastName: [``, [Validators.required, Validators.minLength(4)]],
        nickname: [``, [Validators.required, Validators.minLength(4)]],
        phone_id: [``, [Validators.required, Validators.minLength(4)]],
        email: [``, [Validators.required, Validators.minLength(4), Validators.pattern(custumValidators.emailPattern)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        id_timetable: ['1', [Validators.required]],
        roles_id: ['1', [Validators.required]]
    });

    register() {
        this.spinner.show();
        const { email, nickname, password, phone_id, user_lastName, user_name, id_timetable, roles_id } = this.registerForm.value;

        let phoneNumberString: string = phone_id.toString(); // Convertir phone_id a string
        phoneNumberString = phoneNumberString.replace(/\D/g, ""); // Eliminar caracteres que no sean dígitos

        const phoneNumber: number = this.registerService.convertirStringANumero(phoneNumberString)
        const idTimeTable: number = this.registerService.convertirStringANumero(id_timetable)
        const idRoles: number = this.registerService.convertirStringANumero(roles_id)


        this.registerService.register(email, nickname, password, phoneNumber, user_lastName, user_name, idTimeTable, idRoles)
            .subscribe({
                next: () => {
                    Swal.fire('Usuario creado correctamente.', '', 'success')
                    this.router.navigateByUrl('/auth/login')
                },
                error: (msg) => {
                    Swal.fire('Error', msg, 'error')
                }

            });
        this.spinner.hide();
    }

}
