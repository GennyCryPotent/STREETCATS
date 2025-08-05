import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../service/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})

export class Navbar {
  constructor(public auth: Auth, private router: Router) {}

  logout() {
    this.auth.logout();
  }

  isHome(): boolean {
    return this.router.url === '/';
  }
}
