import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  
  private URL = 'http://localhost:3000/';
  private postEndpoint = 'posts/';
  private new = 'new/'; // Endpoint for creating a new post
  private uploadImageEndpoint = 'uploadImage'; //endpoint for uploading images

  constructor(private http: HttpClient) {}

  //use a observable to fetch posts
  getAllPosts(): Observable<Post[]> { // Fetch all posts from the backend
    return this.http.get<Post[]>(this.URL);
  }

  getPostById(id: string): Observable<Post> { // Fetch a single post by ID
    return this.http.get<Post>(`${this.URL}${this.postEndpoint}${id}`);
  }

  createPost(post: Post): Observable<Post> { // Create a new post
    return this.http.post<Post>(`${this.URL}${this.postEndpoint}${this.new}`, post);
  }

  uploadImage(image: File): Observable<any> { 
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<{ filename: string }>(`${this.URL}${this.postEndpoint}${this.uploadImageEndpoint}`, formData);
  }

}
