import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkAuth().subscribe(isLoggedIn => {
      console.log('Sessione attiva?', isLoggedIn);
    });
  }
}
