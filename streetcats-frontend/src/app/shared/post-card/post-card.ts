import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post-card',
  imports: [RouterModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss'
})
export class PostCard {

  constructor(private sanitizer: DomSanitizer) {}
  @Input() post!: any;


  getDescriptionHtml(): SafeHtml {
    return this.post ? this.sanitizer.bypassSecurityTrustHtml(marked.parse(this.post.description || '') as string): '';
  }

  getImageUrl(path: string): string {
    
  return `http://localhost:3000${path}`;
}

}
