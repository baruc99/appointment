import { Component, computed, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/demo/service/login.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import Swal from 'sweetalert2';
import { AuthStatus } from '../interfaces';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;


    private fb = inject(FormBuilder);
    private loginServices = inject(LoginService);
    private router = inject(Router);
    private spinner = inject(NgxSpinnerService);

    private authServices = inject(LoginService);


    constructor(public layoutService: LayoutService) { }

    public loginForm: FormGroup = this.fb.group({
        user: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        rememberMe: [false]
    });

    ngOnInit() {
        // Verificamos si hay credenciales guardadas en el almacenamiento local al iniciar el componente
        const savedUser = localStorage.getItem('user');
        const savedPassword = localStorage.getItem('password');
        if (savedUser && savedPassword) {
            // Si hay credenciales guardadas, las establecemos en el formulario y marcamos "rememberMe"
            this.loginForm.patchValue({
                user: savedUser,
                password: savedPassword,
                rememberMe: true
            });
        }
    }

    login() {
        this.spinner.show();
        const { user, password, rememberMe } = this.loginForm.value;

        this.loginServices.login(user, password)
            .subscribe({
                next: () => {
                    this.router.navigateByUrl('/dashboard')
                    if (rememberMe) {
                        // Si el usuario ha marcado "rememberMe", guardamos las credenciales en el almacenamiento local
                        localStorage.setItem('user', user);
                        localStorage.setItem('password', password);
                    } else {
                        // Si no, limpiamos las credenciales del almacenamiento local
                        localStorage.removeItem('user');
                        localStorage.removeItem('password');
                    }

                }
                ,
                error: (msg) => {
                    Swal.fire('Error', msg, 'error')
                }
            })

        this.spinner.hide();
    }

}
