import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { PostService } from '../../service/rest-backend/post-service';
import { Post } from '../../models/post';
import { AuthService } from '../../service/auth/auth';

@Component({
  selector: 'app-post-detail',
  imports: [ Navbar, Footer, RouterModule, DatePipe, CommonModule, FormsModule ],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss'
})
export class PostDetail {

    constructor(private router: Router, private toastr: ToastrService, private postService: PostService, public authService : AuthService) {}
    post: Post | null = null; 

    commentText: string = '';


    ngOnInit() {
      const id = this.router.url.split('/').pop(); // Get the post ID from the URL

      if(id){
        this.postService.getPostById(id).subscribe({
          next: (post) => {
            this.post = post; // Set the post details
            console.log('Post details:', this.post);
          },
          error: (err) => {
            console.error('Error fetching post:', err);
            this.toastr.error('Errore nel recupero del post.', 'Errore');
          }
        });
      }
    }

    addComment() { //implement the function to add a comment
    }

    getImageUrl(path?: string): string {
      return `http://localhost:3000${path}`;
    }


}
