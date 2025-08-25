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
import { CommentService } from '../../service/rest-backend/comment-service';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';
import { AuthService } from '../../service/auth/auth';
import { marked } from 'marked';

@Component({
  selector: 'app-post-detail',
  imports: [Navbar, Footer, RouterModule, DatePipe, CommonModule, FormsModule],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss'
})
export class PostDetail {

  constructor(
    private router: Router, 
    private toastr: ToastrService, 
    private postService: PostService, 
    public authService: AuthService, 
    public commentService: CommentService,
  ) { }
  post: Post | null = null;
  comment: Comment | null = null;

  commentText: string = '';


  ngOnInit() {
    const id = this.router.url.split('/').pop(); // Get the post ID from the URL

    if (id) {
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
    if (!this.post) {
      this.toastr.error('Impossibile aggiungere commento: post non trovato.', 'Errore');
      return;
    }
    if (!this.commentText.trim()) {
      this.toastr.error('Il commento non può essere vuoto.', 'Errore');
      return;
    }

    const comment = {
      text: this.commentText,
      postId: this.post.id!,
    };

    this.commentService.createComment(comment, this.post.id!.toString()).subscribe({
      next: (savedComment) => {
        this.toastr.success('Commento aggiunto!');

        // Ensure date is a string for compatibility
        const commentToAdd = {
          ...savedComment,
          date: savedComment.date ?? new Date().toISOString()
        };
        this.post?.Comments?.unshift(commentToAdd);
        this.commentText = '';
      },
      error: (err) => {
        console.error('Error adding comment:', err);
        this.toastr.error('Errore nell\'aggiunta del commento.', 'Errore');
      }
    });

  }

getDescriptionHtml(): string {
  return this.post ? marked.parse(this.post.description || '') as string : '';
}

  getImageUrl(path?: string): string {
    return `http://localhost:3000${path}`;
  }


}
