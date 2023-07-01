import { Component } from '@angular/core';
import {User} from "../shared/interface/user";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
  user: User | null = this.userService.user;

  constructor(private userService: UserService) {
  }
}
