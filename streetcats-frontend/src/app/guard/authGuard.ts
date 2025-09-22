import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from '../service/auth/auth';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of } from 'rxjs';


export const authGuard : CanActivateFn = (route, state) => {

    const router = inject(Router);
    const authService = inject(AuthService);
    const toastr = inject(ToastrService);

    return authService.checkAuth().pipe(
        map(isAuth => {
            if (isAuth) {
                return true;
            } else {
                router.navigate(['/auth']);
                toastr.error('Esegui il login.', 'Accesso negato');
                return false;
            }
        }),
        catchError(() => {
            router.navigate(['/auth']);
            toastr.error('Esegui il login.', 'Accesso negato');
            return of(false);
        })
    );
};