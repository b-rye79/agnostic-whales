import { Component, OnInit } from '@angular/core';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  title = 'Account';

  user: User;

  constructor(private userService: UserService){}

  ngOnInit(): void { 
      this.userService.getUser().subscribe(p => this.user = p);
  }
}