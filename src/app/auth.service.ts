import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
    public currentUser: any;

    constructor(private http: HttpClient) {
        // set token if saved in local storage
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
      
    login(email:string, password:string ) : Observable<boolean> {
        return this.http.post(environment.apiUrl + '/signin', {email, password}).map((response : any) =>{
            // login successful if there's a jwt token in the response
            if(response.idToken){
                this.currentUser = { username: email, token: response }
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                return true;
            }
            else{
                return false;
            }
        });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
}