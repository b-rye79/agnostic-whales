import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post;
  changesSaved:boolean;

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

  updatePost(){
    this.postService.updatePost(this.post).subscribe(r => {
      this.changesSaved = r.ok === 1;
    });
  }
}
