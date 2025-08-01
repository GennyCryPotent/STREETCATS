import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../service/auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})

export class Navbar {
  constructor(public auth: Auth) {}

  logout() {
    this.auth.logout();
  }
}
