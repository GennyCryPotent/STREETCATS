import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post';
import { Comment } from '../../models/comment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private URL = 'http://localhost:3000/';
  private postEndpoint = 'posts/';

  createComment(comment: Comment, postId: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.URL}${this.postEndpoint}${postId}/comments`, comment);
  }

  deleteComment(commentId: number, postId: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}${this.postEndpoint}${postId}/comments/${commentId}`);
  }
}
