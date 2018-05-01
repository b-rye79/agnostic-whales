import { Injectable } from '@angular/core';
import { Post } from './post';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(tag: string): Observable<Post[]> {
    if(tag && tag.length > 0){
      return this.http.get<Post[]>('api/catagory/' + tag);
    }
    return this.http.get<Post[]>('api/featured'); 
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>('api/post/' + id);
  }
}
