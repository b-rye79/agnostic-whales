import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location){}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.route.params.subscribe(params => 
      this.postService.getPost(params['id']).subscribe(p => this.post = p));
  }
}
