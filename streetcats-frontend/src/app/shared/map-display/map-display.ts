import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PostService } from '../../service/rest-backend/post-service';
import { Post } from '../../models/post';
import { marked } from 'marked';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map-display.html',
  styleUrl: './map-display.scss'
})
export class MapDisplay implements OnInit {

  constructor(private postService: PostService) {}

  @Input() post: Post | null = null;  // show all posts

  options: L.MapOptions = {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap contributors'
        })
      ],
      zoom: 5,
      center: L.latLng(41.9027835, 12.4963655) // default Rome
    };

  layers: L.Layer[] = [];


  ngOnInit(): void {
      // all posts (homepage)
      this.postService.getAllPosts().subscribe((posts: Post[]) => {
        this.layers = posts.map((post) =>
          L.marker([post.latitude, post.longitude])
            .bindPopup(`
              <b>${post.title}</b>${this.getDescriptionHtml(post)}
              <a href="/posts/${post.id}" class="popup-link">Visualizza</a>
            `)
        );
      });
    }


   getDescriptionHtml(post: Post): SafeHtml {
     return post ? marked.parse(post.description || '') as string : '';
  }
  
  }
