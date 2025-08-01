import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../shared/navbar/navbar';    
import { Footer } from '../../shared/footer/footer';    
import { PostCard } from '../../shared/post-card/post-card'  

@Component({
  selector: 'app-home',
  
  imports: [CommonModule, Navbar, Footer, PostCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  posts = [
    { title: 'Gatto nero', description: 'Avvistato al parco', latitude: 45.47, longitude: 9.18, imageUrl: '/cats1.jpg' },
    { title: 'Gattino bianco', description: 'Molto piccolo', latitude: 45.46, longitude: 9.19, imageUrl: '/cats2.jpg'}
];

}