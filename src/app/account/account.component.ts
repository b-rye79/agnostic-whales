import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  changesSaved: boolean;

  constructor(private userService: UserService){}

  ngOnInit(): void { 
    this.userService.getUser().subscribe(u => this.user = u);
  }

  updateUser(){
    this.userService.updateUser(this.user).subscribe(r => {
      this.changesSaved = r.ok === 1;
    });
  }
}