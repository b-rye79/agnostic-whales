import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'

import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
    private isLoggedIn: BehaviorSubject<boolean>;

    constructor(private http: HttpClient) {
        var cuString = localStorage.getItem('currentUser');
        this.isLoggedIn = new BehaviorSubject<boolean>(cuString != null);
    }
      
    login(email:string, password:string ) : Observable<boolean> {
        return this.http.post(environment.apiUrl + '/signin', {email, password}).map((response : any) =>{
            if(response.idToken){
                localStorage.setItem('currentUser', JSON.stringify({ username: email, token: response }));
                this.isLoggedIn.next(true);
                return true;
            }
            return false;
        });
    }

    loggedIn(): Observable<boolean>{
        return this.isLoggedIn;
    }

    logout(): Observable<boolean>{
        localStorage.removeItem('currentUser');
        this.isLoggedIn.next(false);
        return this.isLoggedIn;
    }

    
}