import { Injectable } from '@angular/core';
import { Post } from './post.model';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(tag: string): Observable<Post[]> {
    if(tag && tag.length > 0){
      return this.http.get<Post[]>(environment.apiUrl + '/catagory/' + tag);
    }
    return this.http.get<Post[]>(environment.apiUrl + '/featured'); 
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(environment.apiUrl + '/post/' + id);
  }
  
  updatePost(post: Post): Observable<any>{
    return this.http.post<any>(environment.apiUrl + '/post', post);
  }
}
