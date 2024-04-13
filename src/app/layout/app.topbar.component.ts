import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { LoginService } from '../demo/service/login.service';
import { Client } from '../demo/components/clients/interfaces';
import { User } from '../demo/components/auth/interfaces';



@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    private authService = inject(LoginService)

    items!: MenuItem[];
    user!: User;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.getUserbyToken();
    }


    getUserbyToken() {
        this.authService.getUserByToken().subscribe({
            next: (data) => {
                this.user = data['user'];
            },
            error: (msg) => {
                console.log(msg);
            }
        })
    }


    cerrarSesion() {
        this.authService.logout();
    }
}
