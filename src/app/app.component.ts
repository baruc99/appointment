import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AppConfig, LayoutService } from './layout/service/app.layout.service';


import { TranslateService } from '@ngx-translate/core';
import { LoginService } from './demo/service/login.service';
import { AuthStatus } from './demo/components/auth/interfaces';
import { Router } from '@angular/router';




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    private authServices = inject(LoginService);
    private router = inject(Router);

    constructor(private primengConfig: PrimeNGConfig, private layoutService: LayoutService, private translateService: TranslateService) { }

    ngOnInit() {
        // this.primengConfig.ripple = true;
        // this.primengConfig.inputStyle = 'filled'
        this.translateChange('es')
        //optional configuration with the default configuration
        const config: AppConfig = {
            ripple: true,                      //toggles ripple on and off
            inputStyle: 'Filled',             //default style for input elements
            menuMode: 'static',                 //layout mode of the menu, valid values are "static" and "overlay"
            colorScheme: 'dark',               //color scheme of the template, valid values are "light" and "dark"
            // theme: 'mdc-dark-deeppurple',         //default component theme for PrimeNG
            theme: 'lara-dark-purple',         //default component theme for PrimeNG
            scale: 14                           //size of the body font size to scale the whole application
        };
        this.layoutService.config.set(config);
    }

    translateChange(lang: string) {
        this.translateService.use(lang)
        this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res))
    }

    public authStatusChangedEffect = effect(() => {

        console.log("estatus: ", this.authServices.authStatus());


        switch (this.authServices.authStatus()) {
            case AuthStatus.checking:
                return;

            case AuthStatus.aunthenticated:
                this.router.navigateByUrl('/dashboard');
                break;

            case AuthStatus.notAunthenticated:
                this.router.navigateByUrl('/');
                break;
        }
    })

    public finishedAuthCheck = computed<boolean>(() => {
        if (this.authServices.authStatus() === AuthStatus.checking) {
            return false;
        }
        return true;
    });

}
