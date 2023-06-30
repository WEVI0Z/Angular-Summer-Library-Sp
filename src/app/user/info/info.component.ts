import { Component } from '@angular/core';
import {User} from "../../shared/interface/user";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  user: User = this.userService.user!;

  constructor(private userService: UserService, private router: Router) {
  }

  logout() {
    if(this.userService.logout() === null) {
      this.router.navigate(["/main"]);
    }
  }
}
