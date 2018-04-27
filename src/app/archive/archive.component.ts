import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  years: number[];
  posts: Post[][];
  
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location){}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts(null).subscribe(psts => {
      this.years = new Array<number>();
      this.posts = new Array<Post[]>();
      var y = new Date().getFullYear();
      var yPosts = psts.filter(p => p.date.getFullYear() === y);
      while(yPosts.length > 0){
          this.years.push(y);
          this.posts.push(yPosts);
          y = y - 1;
          yPosts = psts.filter(p => p.date.getFullYear() === y);
      }
    });
  }
}
