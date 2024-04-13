import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { LoginService } from 'src/app/demo/service/login.service';


export const isAuthenticatedGuard: CanActivateFn = (route, state) => {


    const authService = inject(LoginService);
    const router = inject(Router);

    if (authService.authStatus() === AuthStatus.aunthenticated) {
        return true;
    }

    // if (authService.authStatus() === AuthStatus.checking) {
    //     return false
    // }
    // const url = state.url;
    // localStorage.setItem('url', url);

    router.navigateByUrl('/auth/login')

    return false;
};
