import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../service/rest-backend/post-service';
import { Post } from '../../models/post';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { PostCard } from '../../shared/post-card/post-card';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Footer, PostCard],
  templateUrl: './all-posts.html',
  styleUrl: './all-posts.scss'
})
export class AllPosts implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchTerm = '';
  filterGender = '';
  sortOrder = 'desc';

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
      this.applyFilters();
    });
  }

  //filter
  applyFilters() {
    this.filteredPosts = this.posts
      .filter(post => //filter by title and gender
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.filterGender ? post.gender === this.filterGender : true) //if filterGender isn't set ignore it
      )
      .sort((a, b) => { //sort by date
        const dateA = new Date(a.createdAt!).getTime();
        const dateB = new Date(b.createdAt!).getTime();
        return this.sortOrder === 'desc' ? dateB - dateA : dateA - dateB; //desc or asc
      });
  }
}
