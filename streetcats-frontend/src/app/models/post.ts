export interface Post {
  id?: number;  // Optional ID for the post      
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  image?: string;
  gender?: string
  createdAt?: Date;
  userId?: number;       
}