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

  private truncateText(text: string): string { // Truncate text to 100 characters without cutting words
    if (!text || text.length <= 100) {
      return text;
    }
    
    let truncated = text.substring(0, 100);
    const lastSpace = truncated.lastIndexOf(' ');
    
    
    if (lastSpace !== -1) {
        truncated = truncated.substring(0, lastSpace);
    }

    return truncated + '...';
  }


  getDescriptionHtml(): SafeHtml {
    const description = this.post?.description || '';
    const truncatedDescription = this.truncateText(description);
    const htmlContent = marked.parse(truncatedDescription) as string;
    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }

  getImageUrl(path: string): string {
    
  return `http://localhost:3000${path}`;
}

}
