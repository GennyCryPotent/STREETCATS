import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessario per ngModel
import { AuthService } from '../../service/auth/auth';
import { Navbar } from '../../shared/navbar/navbar';    
import { Footer } from '../../shared/footer/footer'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [ CommonModule, FormsModule, RouterModule, Navbar, Footer, HttpClientModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {

    username: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

    onSignup() {
      
      if (!this.username || !this.password) {
        this.toastr.error('Username e password sono obbligatori.', 'Errore di registrazione');
        return;
      }

      if (this.password.length < 4) {
        this.toastr.error('La password deve avere minimo 4 caratteri.', 'Errore di registrazione');
        this.password = '';
        return;
      }

      this.authService.signup(this.username, this.password).subscribe({
        next: () => {
          this.toastr.success(`Account creato con successo!`, `Benvenuto ${this.username}, effettua il login!`);
          this.router.navigate(['/auth']); // go to login page after successful signup
        },
        error: (SequelizeUniqueConstraintError) => {
          console.error('Signup error:', SequelizeUniqueConstraintError);
          this.toastr.error('Username già esistente, prova con un altro.', 'Errore di registrazione');
          this.username = '';
          this.password = '';
        },
    });

  }
}
