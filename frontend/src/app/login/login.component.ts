import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  signin(){
    this.userService.signInService(this.username, this.password).subscribe((user: User)=>{
      if(user) {
        //rutiranje
        if(user.odobrenje == 0) {
          alert('jos nije odobren');
          return;
        }

        localStorage.setItem('user', JSON.stringify(user));
        if(user.type == 0) this.router.navigate(['user']);
        else if(user.type == 1) this.router.navigate(['admin']);
        else if(user.type == 2) this.router.navigate(['delegat']);
        else if(user.type == 3) this.router.navigate(['vodja']);
      }
      else {
        alert('nouser');
        //this.router.navigate(['']);
      }
    });
  }

}
