import {Component, Input} from '@angular/core';
import {User} from "../../shared/interface/user";
import {GamesService} from "../games.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() bookName!: string;
  @Input() description!: string;
  @Input() link!: string;
  @Input() user: User | null = null;

  constructor(
    private gamesService: GamesService,
    private router: Router
  ) {
  }

  play() {
    this.gamesService.replenish(100).subscribe(() => {
      this.router.navigate(["/user/info"])
    });
  }
}
