import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: Post[];
  
  constructor(private postService: PostService){}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.posts = this.postService.getPosts();
  }
}
