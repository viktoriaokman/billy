import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public showPassword: boolean = false;
  public user$: Observable<User> = new Observable<User>();
  public email: string = '';
  public password: string = '';

  constructor(private userService: UserService) {}
  ngOnInit(): void {}

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getUser(email: string) {
    this.user$ = this.userService.getUserByEmail(email);
  }

  onEnter(email: string, password: string) {
    this.email = email;
    this.password = password;

    this.getUser(this.email);
    this.user$.subscribe((data) => {
      if (!data?.id) {
        console.log('User not exist');
        return;
      }

      if (this.password !== data.password) {
        console.log('password not corect');
        return;
      }
      console.log('log in sacsses');
    });
  }
}
