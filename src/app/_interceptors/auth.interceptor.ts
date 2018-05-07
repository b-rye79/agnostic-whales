import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import {AuthService} from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = this.authService.token.token;
        console.log(token)

        if (token) {
            const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

            return next.handle(authReq);
        }

    }

}