import { Injectable } from '@angular/core';
import { Post } from './post';
import { POSTS } from './_mock/mock-posts';

@Injectable()
export class PostService {

  constructor() { }

  getPosts(): Post[] {
    return POSTS;
  }


  getPost(id: string): Post {
    return POSTS.find(post => post._id === id);
  }
}
