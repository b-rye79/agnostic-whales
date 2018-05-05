import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { PostService } from './post.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { BlogComponent } from './blog/blog.component';
import { PageNotFoundComponent } from './404/404.component';

import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { ArchiveComponent } from './archive/archive.component';
import { SigninComponent } from './signin/signin.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: SigninComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:tag', component: BlogComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'post/:id',      component: PostComponent },
  { path: 'home',
    redirectTo: '',
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
    PageNotFoundComponent, 
    ArchiveComponent, SigninComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: environment.production == false } 
    ),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ PostService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
