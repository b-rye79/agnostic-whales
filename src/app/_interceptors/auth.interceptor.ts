import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import {AuthService} from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this.authService.currentUser)

        if (this.authService.currentUser) {
            const authReq = req.clone({ setHeaders: { "X-Auth-Token": `${this.authService.currentUser.token.idToken}` } });

            return next.handle(authReq);
        }
        return next.handle(req);

    }

}