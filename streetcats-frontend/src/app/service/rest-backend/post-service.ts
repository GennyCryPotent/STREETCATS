import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  
  private URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  //use a observable to fetch posts
  getAllPosts(): Observable<Post[]> { // Fetch all posts from the backend
    return this.http.get<Post[]>(this.URL);
  }

}
