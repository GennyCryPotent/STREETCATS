import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; 

  private isAuthenticatedState = false;
  private currentUser: { id: number; username: string } | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ user: { id: number; username: string } }>(this.apiUrl,{ username, password }, { withCredentials: true }).pipe(
      tap(response => {
        //set the authentication state and current user
        this.isAuthenticatedState = true;
        console.log('Response from login:', response); // Debug
        this.currentUser = response.user;
        console.log('Login successful:', this.currentUser);
      })
    );
  }


  signup(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password });
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.isAuthenticatedState = false;
        this.currentUser = null;
        this.router.navigate(['/']);
      },
      error: () => {
        console.log("Errore durante il logout, la sessione locale è stata resettata.");
        this.isAuthenticatedState = false;
        this.currentUser = null;
        this.router.navigate(['/']);
      }
    });
  }

  // Check session status on app initialization
  checkAuth(): Observable<boolean> {
    return this.http.get<{ loggedIn: boolean; user?: { id: number; username: string } }>(
      `${this.apiUrl}/session`,
    ).pipe(
      tap(response => {
        this.isAuthenticatedState = response.loggedIn;
        this.currentUser = response.user ?? null;
      }),
      map(response => response.loggedIn),
      catchError(() => { // In case of error, assume not authenticated
        this.isAuthenticatedState = false;
        this.currentUser = null;
        return of(false); 
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedState;
  }

  getUserId(): number | null {
    return this.currentUser?.id ?? null;
  }

  getUsername(): string | null {
    return this.currentUser?.username ?? null;
  }
}
