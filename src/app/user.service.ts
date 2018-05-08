import { Injectable } from '@angular/core';
import { User } from './user.model';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/user');
  }
}
