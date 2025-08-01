import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  imports: [],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss'
})
export class PostCard {
  @Input() post!: any;
}
