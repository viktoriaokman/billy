import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  constructor() {}

  public logedInUser: User = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  private messageSourse = new BehaviorSubject(this.logedInUser);

  currentMessage = this.messageSourse.asObservable();

  changeMessage(message: User) {
    this.messageSourse.next(message);
  }
}
