import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user/user.service";
import {User} from "../interface/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  user: User | null = this.userService.user;

  constructor(private userService: UserService) {}
}
