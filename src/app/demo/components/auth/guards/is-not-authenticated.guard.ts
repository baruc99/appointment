import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { LoginService } from 'src/app/demo/service/login.service';


export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {


    const authService = inject(LoginService);
    const router = inject(Router);

    if (authService.authStatus() === AuthStatus.aunthenticated) {
        router.navigateByUrl('/dashboard')
        return false;
    }

    return true;
};
