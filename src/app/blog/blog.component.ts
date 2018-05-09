import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: Post[];
  
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location){}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.route.params.subscribe(params => 
      this.postService.getPosts(params['tag']).subscribe(psts => this.posts = psts));
  }
}
