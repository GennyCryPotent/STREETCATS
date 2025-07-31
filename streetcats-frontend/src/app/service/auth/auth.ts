import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token); 
      const expiration = decodedToken.exp; // Get expiration time from token
      return expiration !== undefined && Date.now() < expiration * 1000; // Check if token is not expired
    }
    return false;
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/']); // Redirect to home or login page after logout
  }

}
