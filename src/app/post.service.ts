import { Injectable } from '@angular/core';
import { Post } from './post';
import { POSTS } from './_mock/mock-posts';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PostService {

  constructor() { }

  getPosts(tag: string): Observable<Post[]> {
    if(tag && tag.length > 0){
      return of(POSTS.filter(post => post.tags.some(t => t === tag)));
    }
    return of(POSTS);
  }

  getPost(id: string): Observable<Post> {
    return of(POSTS.find(post => post._id === id));
  }
}
