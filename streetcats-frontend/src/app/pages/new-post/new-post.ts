import { Component, ViewChild, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessario per ngModel
import { Navbar } from '../../shared/navbar/navbar';    
import { Footer } from '../../shared/footer/footer'; 
import { MapSelector } from '../../shared/map-selector/map-selector';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../service/rest-backend/post-service';
import { Post } from '../../models/post';


@Component({
  selector: 'app-new-post',
  imports: [ CommonModule, FormsModule, RouterModule, Navbar, Footer, MapSelector ],
  templateUrl: './new-post.html',
  styleUrl: './new-post.scss'
})
export class NewPost {
  constructor(private router: Router, private toastr: ToastrService, private postService: PostService) {}
  @ViewChild('imageInput') imageInput!: ElementRef; // Reference to the image input element
  readonly MAX_DESCRIPTION_LENGTH = 500; 

  latitude: number = 0;
  longitude: number = 0;
  title: string = '';
  description: string = ''; //max 500 characters
  image: File | null = null;
  imageUrl: string = ''; 
  gender: string = '';


  onCoordinatesSelected(coords: { lat: number; lng: number }) {
    this.latitude = coords.lat;
    this.longitude = coords.lng;
  }

onImageSelected(event: Event) {
   const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
      this.postService.uploadImage(this.image).subscribe({
        next: (response) => {
          this.imageUrl = response.filename;
          this.toastr.success('Immagine caricata con successo!');
        },
        error: (err) => {
          const errorMessage = err.error?.error || 'Errore durante il caricamento dell\'immagine';
          this.toastr.error(errorMessage);
          this.imageInput.nativeElement.value = ''; // Reset the input field
          this.image = null; // Reset the image variable
          this.imageUrl = ''; // Reset the image URL
          console.error(err);
        }
      });
    } else {
      this.image = null;
      this.imageUrl = '';
    }
  }

  onSubmit() {
    if (!this.title || !this.description || !this.image || !this.latitude || !this.longitude || !this.gender) {
      this.toastr.error('Per favore, compila tutti i campi.');
      //this.resetForm();
    if (this.description.length > this.MAX_DESCRIPTION_LENGTH) {
      this.toastr.error('La descrizione non può superare i 500 caratteri.');
    }
      return;
    }

    console.log(this.imageUrl);

    const post: Post = {
        title: this.title,
        description: this.description,
        gender: this.gender,
        image: this.imageUrl,
        latitude: this.latitude,
        longitude: this.longitude
    };

    this.postService.createPost(post).subscribe({
        next: () => {
            this.toastr.success('Post creato con successo!');
            this.router.navigate(['/']);
        },
        error: (err) => {
            this.toastr.error('Errore durante la creazione del post.');
            console.error(err);
        }
    });

  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.image = null;
    this.imageUrl = '';
    this.latitude = 0;
    this.longitude = 0;
    this.gender = '';
  }

   get descriptionLength(): number {
    return this.description.length;
  }
  
}
