import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from '../service/auth/auth';
import { ToastrService } from 'ngx-toastr';


export const authGuard : CanActivateFn = (route, state) => {

    const router = inject(Router);
    const authService = inject(AuthService);
    const toastr = inject(ToastrService);

    if (authService.isAuthenticated()) {
        return true;
    }
    else {
        router.navigate(['/auth']);
        toastr.error('Esegui il login.', 'Accesso negato');
        return false;
    }
};