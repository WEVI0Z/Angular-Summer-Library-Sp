import {Injectable} from '@angular/core';
import {User} from "../shared/interface/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = "https://localhost:7281";
  user: User | null = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"}),
  };

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<User | null> {
    return this.http.get<User[]>(this.url + "/user", {...this.httpOptions, responseType: "json"}).pipe(
      map(users => {
        let target: User | null = null;

        users.forEach(item => {
          if (item.login === user.login && item.password === user.password) {
            this.user = user;

            localStorage.setItem("user", JSON.stringify(user));

            target = this.user;
          }
        })

        return target;
      })
    )
  }

  register(user: User): Observable<User | null> {
    return this.http.get<User[]>(this.url + "/user", {...this.httpOptions, responseType: "json"}).pipe(
      map(users => {
        let check: boolean = false;

        users.forEach(item => {
          if (item.login === user.login) {
            check = true;
          }
        })

        return check ? null : user;
      }),
      switchMap(item => {
        if (item) {
          return this.http.post<User>(this.url + "/user", user, {...this.httpOptions, responseType: "json"});
        }

        return new Observable<null>().pipe(map(() => null));
      })
    )
  }

  logout(): null {
    this.user = null;

    localStorage.removeItem("user");

    return this.user;
  }
}
