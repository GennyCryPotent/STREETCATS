export interface Post {
  id?: number;  // Optional ID for the post      
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  createdAt?: Date;
  userId?: number;       
}