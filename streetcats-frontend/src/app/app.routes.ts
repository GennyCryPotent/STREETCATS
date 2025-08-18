import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PostDetail } from './pages/post-detail/post-detail';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { NewPost } from './pages/new-post/new-post';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Streetcats - Home'
    },
    {
        path: 'posts/new',
        component: NewPost,
        title: 'Streetcats - New Post',
    },
    {   
        path: 'posts/:id', 
        component: PostDetail, 
        title: 'Streetcats - Post Detail' 
    },
    {
        path: 'auth',
        component: Login,
        title: 'Streetcats - Login'
    },
    {
        path: 'auth/signup',
        component: Signup,
        title: 'Streetcats - Signup'
    },
];
