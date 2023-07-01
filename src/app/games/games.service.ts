import { Injectable } from '@angular/core';
import {User} from "../shared/interface/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  url: string = "https://localhost:7281";

  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"}),
  };

  constructor(private http: HttpClient, private userService: UserService) {
  }

  replenish(value: number): Observable<User> {
    const body: User = this.userService.user!;

    body.balance += value;

    return this.http.put<User>(this.url + "/user", body, {...this.httpOptions, responseType: "json"});
  }
}
