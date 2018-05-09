import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post } from '../post.model';
import { PostService } from '../post.service';


import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  isLoggedIn:boolean;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location){}

  ngOnInit(): void {
    this.getPost();
    this.authService.loggedIn().subscribe(result => this.isLoggedIn = result);
  }

  getPost(): void {
    this.route.params.subscribe(params => 
      this.postService.getPost(params['id']).subscribe(p => this.post = p));
  }
}
