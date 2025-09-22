import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../service/auth/auth';
import { Navbar } from '../../shared/navbar/navbar';    
import { Footer } from '../../shared/footer/footer'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Navbar, Footer, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr : ToastrService) {}

  onLogin() {
    
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']); // vai in home se login OK
        this.toastr.success(`Bentornat* ${this.username}!`, 'Accesso riuscito');
      },
      error: () => {
        this.toastr.error('Credenziali non valide, riprova.', 'Errore di accesso');
        this.username = '';
        this.password = '';
      }
    });
  }
}
