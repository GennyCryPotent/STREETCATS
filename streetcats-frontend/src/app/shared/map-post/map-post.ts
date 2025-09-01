import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { LeafletDirective, LeafletModule } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-map-post',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map-post.html',
  styleUrls: ['./map-post.scss']
})
export class MapPost implements OnChanges {
  @Input() latitude!: number;
  @Input() longitude!: number;

  @ViewChild(LeafletDirective) mapDirective!: LeafletDirective;

  options: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 5,
    center: L.latLng(41.9027835, 12.4963655) // Default: Roma
  };

  layers: L.Layer[] = [];

  private map!: L.Map;

  onMapReady(map: L.Map) {
    this.map = map;
    if (this.latitude && this.longitude) {
      this.updateMarker();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['latitude'] || changes['longitude']) && this.latitude && this.longitude) {
      if (this.map) {
        // change view to new coordinates
        this.map.flyTo([this.latitude, this.longitude], 16, { duration: 1 });
        this.updateMarker();
      }
    }
  }

  private updateMarker() {
    this.layers = [];

    const marker = L.marker([this.latitude, this.longitude]).bindPopup(
      `Latitudine: <b>${this.latitude}</b><br>Longitudine: <b>${this.longitude}</b>`
    );
    this.layers = [marker];
  }
}