import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../shared/navbar/navbar';    
import { Footer } from '../../shared/footer/footer';    
import { PostCard } from '../../shared/post-card/post-card'  
import { Post } from '../../models/post'; 
import { PostService } from '../../service/rest-backend/post-service';

@Component({
  selector: 'app-home',
  
  imports: [CommonModule, Navbar, Footer, PostCard],
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



}