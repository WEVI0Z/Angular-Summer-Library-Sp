import { Injectable } from '@angular/core';
import {User} from "../shared/interface/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | null = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

  constructor(private router: Router) { }

  login(user: User): User {
    this.user = user;

    localStorage.setItem("user", JSON.stringify(user));

    return this.user;
  }

  logout(): null {
    this.user = null;

    localStorage.removeItem("user");

    return this.user;
  }
}
