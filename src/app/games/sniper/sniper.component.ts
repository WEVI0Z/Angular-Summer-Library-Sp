import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GamesService} from "../games.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sniper',
  templateUrl: './sniper.component.html',
  styleUrls: ['./sniper.component.scss']
})
export class SniperComponent implements OnInit {
  field!: HTMLElement;
  xSize!: number;
  ySize!: number;
  score: number = 0;

  constructor(
    private gamesService: GamesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.field = document.querySelector(".sniper__field")!;

    this.xSize = +this.field.style.width;
    this.ySize = +this.field.style.height;

    this.createBaloon();
  }

  getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  createBaloon() {
    const baloon = document.createElement("div");
    const size: number = this.getRandomArbitrary(50, 300);

    baloon.style.setProperty("width", size + "px");
    baloon.style.setProperty("height", size + "px");
    baloon.style.setProperty("background-color", "#C7EEFF");
    baloon.style.setProperty("border-radius", "50%");
    baloon.style.setProperty("margin-top", this.getRandomArbitrary(0, 500 - size) + "px");
    baloon.style.setProperty("margin-left", this.getRandomArbitrary(0, 1200 - size) + "px");

    baloon.addEventListener("click", () => {
      this.pop();
    })

    this.field.appendChild(baloon);
  }

  pop() {
    this.field.innerHTML = "";

    this.score += 5;

    this.createBaloon();
  }

  finish() {
    this.gamesService.replenish(this.score).subscribe(() => {
      this.router.navigate(["/user/info"])
    });
  }
}
