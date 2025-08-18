import { Component, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-selector',
  template: `<div id="map" style="height: 400px; width: 100%;"></div>`,
  styleUrls: ['./map-selector.scss']
})
export class MapSelector implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private marker!: L.Marker;

  @Output() coordinatesSelected = new EventEmitter<{ lat: number; lng: number }>();

  ngAfterViewInit(): void {
    if (this.map) this.map.remove();

    this.map = L.map('map').setView([42.1, 12.5], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    // Evento click sulla mappa
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const coords = { lat: e.latlng.lat, lng: e.latlng.lng };

      // Aggiungo o sposto il marker
      if (this.marker) {
        this.marker.setLatLng(e.latlng);
      } else {
        this.marker = L.marker(e.latlng).addTo(this.map);
      }

      // Emetto l'oggetto corretto
      this.coordinatesSelected.emit(coords);
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
