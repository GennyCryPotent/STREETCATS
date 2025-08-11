import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessario per ngModel
import { AuthService } from '../../service/auth/auth';
import { Navbar } from '../../shared/navbar/navbar';    
import { Footer } from '../../shared/footer/footer'; 
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Footer, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
     console.log('Attempting login with:', this.username, this.password); // Debug
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']); // vai in home se login OK
      },
      error: () => {
        this.errorMessage = 'Credenziali non valide';
        alert(this.errorMessage); // show error message
      }
    });
  }
}
