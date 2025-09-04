import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { Router } from '@angular/router';
import { MapPost } from '../../shared/map-post/map-post';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { PostService } from '../../service/rest-backend/post-service';
import { CommentService } from '../../service/rest-backend/comment-service';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';
import { AuthService } from '../../service/auth/auth';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-post-detail',
  imports: [Navbar, Footer, RouterModule, DatePipe, CommonModule, FormsModule, MapPost],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss'
})
export class PostDetail {

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router, 
    private toastr: ToastrService, 
    private postService: PostService, 
    public authService: AuthService, 
    public commentService: CommentService,
  ) { }

  activeMenu: number | null = null;
  post: Post | null = null;
  commentText: string = '';


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Get the post ID from the URL

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

  addComment() {
  if (!this.post) return;
  if (!this.commentText.trim()) {
    this.toastr.error('Il commento non può essere vuoto.', 'Errore');
    return;
  }

  const payload = { text: this.commentText, postId: this.post.id! };

  this.commentService.createComment(payload, this.post.id!).subscribe({
    next: (savedComment) => {
      this.toastr.success('Commento aggiunto!');
      this.addLocalComment(savedComment);
      this.commentText = '';
    },
    error: (err) => {
      console.error('Error adding comment:', err);
      this.toastr.error('Errore nell\'aggiunta del commento.', 'Errore');
    }
  });
}

  private addLocalComment(savedComment: Comment) { // Add the new comment to the local post object
    const commentToAdd = {
      ...savedComment,
      date: savedComment.date ?? new Date().toISOString()
    };
    this.post!.Comments = [commentToAdd, ...(this.post!.Comments ?? [])];
  }


    delComment(commentId: number) {
    if (!this.post?.id) return;

    this.commentService.deleteComment(commentId, this.post.id).subscribe({
      next: () => {
        this.toastr.success('Commento eliminato!');
        this.post!.Comments = (this.post!.Comments ?? []).filter(c => c.id !== commentId);
      },
      error: (err) => {
        console.error('Error deleting comment:', err);
        this.toastr.error('Errore nell\'eliminazione del commento.', 'Errore');
      }
    });
  }

  getDescriptionHtml(): SafeHtml {
    return this.post ? this.sanitizer.bypassSecurityTrustHtml(marked.parse(this.post.description || '') as string): '';
  }

  getImageUrl(path?: string): string {
    return path ? `http://localhost:3000${path}` : 'assets/default-cat.png';
  }



}
