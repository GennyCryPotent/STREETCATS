import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../../models/comment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private URL = 'http://localhost:3000/';
  private postEndpoint = 'posts/';

  createComment(comment: Comment, postId: number): Observable<Comment> {
    return this.http.post<Comment>(`${this.URL}${this.postEndpoint}${postId}/comments`, comment);
  }

  deleteComment(commentId: number, postId: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}${this.postEndpoint}/comments/${commentId}`);
  }

  updateComment(commentId: number, postId: number, updatedText: string): Observable<Comment> {
    return this.http.put<Comment>(`${this.URL}${this.postEndpoint}/comments/${commentId}`, { text: updatedText });
  } 
}
