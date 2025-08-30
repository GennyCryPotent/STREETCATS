import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  constructor(public auth: AuthService, private toast: ToastrService) {}

  isHome() {
    return location.pathname === '/';
  }

  logout() {
    this.auth.logout();
    this.toast.success('Logout effettuato con successo.', 'Successo');
  }
}
