import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { AuthInterceptor } from './_interceptors/auth.interceptor';

import { PostService } from './post.service';

import { UserService } from './user.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { BlogComponent } from './blog/blog.component';
import { AccountComponent } from './account/account.component';
import { PageNotFoundComponent } from './404/404.component';

import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { ArchiveComponent } from './archive/archive.component';
import { SigninComponent } from './signin/signin.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { SignoutComponent } from './signout/signout.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signout', component: SignoutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:tag', component: BlogComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'post/:id',      component: PostComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: PostEditComponent, canActivate: [AuthGuard] },
  { path: 'create', component: PostEditComponent, canActivate: [AuthGuard] },
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
    ArchiveComponent, 
    SigninComponent,
    AccountComponent,
    PostEditComponent,
    SignoutComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: environment.production != false } 
    ),
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, AuthGuard, AuthService, PostService, UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
