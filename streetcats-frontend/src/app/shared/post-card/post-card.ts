import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  imports: [RouterModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss'
})
export class PostCard {
  @Input() post!: any;

  getImageUrl(path: string): string {
  return `http://localhost:3000/${path}`;
}

}
