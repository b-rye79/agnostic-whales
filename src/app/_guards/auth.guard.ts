import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private authService: AuthService, private router: Router) { }
 
    canActivate() {
        if (this.authService.loggedIn()) {
            return true;
        }
 
        // TODO: add return url and handle in signin component
        this.router.navigate(['/login']);
        return false;
    }
}