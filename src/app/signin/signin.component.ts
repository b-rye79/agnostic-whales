import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  title = 'Signin';
  form:FormGroup;
  
  constructor(private authService: AuthService, private router: Router) {
      this.form = new FormGroup({
        email: new FormControl(),
        password: new FormControl()
      });
  }

  login() {
    const val = this.form.value;
    if (val.email && val.password) {
        this.authService.login(val.email, val.password)
            .subscribe(
                loggedIn => {
                    this.router.navigateByUrl('/account');
                }
            );
    }
  }
}