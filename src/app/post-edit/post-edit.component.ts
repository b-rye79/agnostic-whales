import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  originalId: String;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location){}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.route.params.subscribe(params => {
      if(params['id']){
        this.postService.getPost(params['id']).subscribe(p => {
          this.post = p;
          this.originalId = p._id;
        })
      } else {
        this.route.url.subscribe(url => {
          if(url[0].path === 'create'){
            this.post = new Post();
          }
        })
      }
    });
  }

  updatePost(){
    if(!this.post._id){
      this.post._id = this.post.title.split(' ').join('-').toLowerCase();
    }
    this.postService.updatePost(this.post).subscribe(r => {
      this.changesSaved = r.ok === 1;
      if(this.originalId !== this.post._id){
        this.router.navigate(['/edit/' + this.post._id],);
      }
    });
  }
}
