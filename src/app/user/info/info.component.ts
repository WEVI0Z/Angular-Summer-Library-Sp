import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/interface/user";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit{
  user: User = this.userService.user!;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params["error"]) {
        this.error = params["error"];
      }
    })
  }

  logout() {
    if(this.userService.logout() === null) {
      this.router.navigate(["/main"]);
    }
  }
}
