import { Comment } from './comment';

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
  //user

  User?: {
    username: string;
  };

  //comments
  Comments?: Comment[];
}