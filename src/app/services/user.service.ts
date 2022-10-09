import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userServiceUrl = `${environment.userseUrl}`;
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userServiceUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.userServiceUrl}/${id}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.userServiceUrl}/${email}`);
  }

  createUser(user: User) {
    return this.httpClient.post(this.userServiceUrl, user);
  }

  updeteUser(user: User) {
    return this.httpClient.put(this.userServiceUrl, user);
  }

  deleteUser(id: string) {
    return this.httpClient.delete(`${this.userServiceUrl}/${id}`);
  }
}
