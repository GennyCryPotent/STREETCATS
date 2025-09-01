import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PostService } from '../../service/rest-backend/post-service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map-display.html',
  styleUrl: './map-display.scss'
})
export class MapDisplay implements OnInit {

  @Input() post: Post | null = null;  // Post != null show map for single post, else show all posts

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

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    if (this.post) { //single post (page post-datails)
    
      this.options.center = L.latLng(this.post.latitude, this.post.longitude);
      this.layers = [
        L.marker([this.post.latitude, this.post.longitude])
          .bindPopup(`<b>${this.post.latitude}<br>${this.post.longitude}</b>`)
      ];
    } else {
      // all posts (homepage)
      this.postService.getAllPosts().subscribe((posts: Post[]) => {
        this.layers = posts.map((post) =>
          L.marker([post.latitude, post.longitude])
            .bindPopup(`
              <b>${post.title}</b><br>${post.description}<br>
              <a href="/posts/${post.id}" class="popup-link">Visualizza</a>
            `)
        );
      });
    }
  }
}
