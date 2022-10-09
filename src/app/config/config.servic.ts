import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  userseUrl: string;
}

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}
  cofigUrl = 'assets/config.json';

  getConfig() {
    return this.http.get<Config>(this.cofigUrl);
  }
}
