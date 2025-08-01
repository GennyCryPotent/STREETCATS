import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  constructor(private router: Router) {}

  isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token); 
      const expiration = decodedToken.exp;
      return expiration !== undefined && Date.now() < expiration * 1000;
    } catch (e) {
      // Token non valido o malformato
      return false;
    }
  }
  return false;
}

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/']); // Redirect to home or login page after logout
  }

}
