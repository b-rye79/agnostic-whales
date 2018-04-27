import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PostService } from './post.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { BlogComponent } from './blog/blog.component';
import { PageNotFoundComponent } from './404/404.component';

import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'post/:id',      component: PostComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    PostComponent, 
    BlogComponent, 
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: environment.production == false } 
    ),
    BrowserModule
  ],
  providers: [ PostService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
