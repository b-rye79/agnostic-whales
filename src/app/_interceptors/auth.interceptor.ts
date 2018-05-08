import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import {AuthService} from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var currentUser = this.authService.loggedIn();
        if (currentUser) {
            const authReq = req.clone({ setHeaders: { "X-Auth-Token": `${currentUser.token.idToken}` } });

            return next.handle(authReq);
        }
        return next.handle(req);

    }

    // TODO: intercept responses to look for 401's and perform logout and redirect
}