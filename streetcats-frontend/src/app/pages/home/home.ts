import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';    
import { Footer } from '../../shared/footer/footer';    
import { PostCard } from '../../shared/post-card/post-card'  
import { Post } from '../../models/post'; 
import { PostService } from '../../service/rest-backend/post-service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapDisplay } from '../../shared/map-display/map-display';
import * as L from 'leaflet'; 

@Component({
  selector: 'app-home',
  
  imports: [CommonModule, RouterModule, Navbar, Footer, PostCard, LeafletModule, MapDisplay],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  posts: Post[] = []; // Initialize posts as an empty array

  constructor(private postService: PostService) {}

  
  ngOnInit() { //this function is called when the component is initialized
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts; // Assign the fetched posts to the component's posts property
    });
  }

  options = { 
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 13,
    center: L.latLng(45.4642, 9.19)
  };

  layers = []; 

}