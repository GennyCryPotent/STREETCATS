import { Component} from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PostService } from '../../service/rest-backend/post-service';
import { Post } from '../../models/post'

@Component({
  selector: 'app-map-display',
  imports: [LeafletModule],
  templateUrl: './map-display.html',
  styleUrl: './map-display.scss'
})
export class MapDisplay {

    options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 13,
    center: L.latLng(45.4642,9.185) //Milano 
  };

  layers: L.Layer[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((posts: Post[]) => {
      this.layers = posts.map((post) =>
        L.marker([post.latitude, post.longitude])
          .bindPopup(`<b>${post.title}</b><br>${post.description}`)
      );
    });
  }


}
