import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { environment } from '../environments/environment';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }
      
    login(email:string, password:string ) : Observable<boolean> {
        return this.http.post(environment.apiUrl + '/signin', {email, password}).map((response : any) =>{
            // login successful if there's a jwt token in the response
            if(response.idToken){
                localStorage.setItem('currentUser', JSON.stringify({ username: email, token: response }));
                return true;
            }
            else{
                return false;
            }
        });
    }

    loggedIn(): any{
        var u = localStorage.getItem('currentUser');
        if(u){
            return JSON.parse(u);
        }
        return null;
    }

    logout(): void {
        localStorage.removeItem('currentUser');
    }
}