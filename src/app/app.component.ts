import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Agnostic Whales';
  loggedin:Boolean;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.loggedIn().subscribe(b => 
      this.loggedin = b);
  }
}
