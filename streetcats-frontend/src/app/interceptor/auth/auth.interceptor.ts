import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const router = inject(Router);

  //add withCredentials to every request
  const reqWithCredentials = request.clone({ withCredentials: true });

  //catch 401 errors and redirect to login
  return next(reqWithCredentials).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.log('Utente non autenticato, reindirizzo a login...');
        router.navigate(['/auth']); // redirect to login page
      }
      return throwError(() => error);
    })
  );
}
