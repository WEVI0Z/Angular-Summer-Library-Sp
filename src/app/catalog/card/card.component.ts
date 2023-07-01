import {Component, Input} from '@angular/core';
import {Book} from "../../shared/interface/book";
import {User} from "../../shared/interface/user";
import {CatalogService} from "../catalog.service";
import {books} from "../../shared/mock/books";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() book!: Book;
  @Input() user: User | null = null;
  @Input() favourite: boolean = false;

  constructor(private catalogService: CatalogService, private router: Router) {
  }

  buy() {
    this.catalogService.buy(this.book).subscribe(item => {
      if (item) {
        this.router.navigate(["/user/library"])
        return;
      }

      this.router.navigate(["/user/info"], {queryParams: {error: "На счете не хватает средств"}});
    });
  }

  add() {
    this.catalogService.add(this.book).subscribe(() => this.favourite = true);
  }

  remove() {
    this.catalogService.remove(this.book).subscribe(() => this.favourite = false);
  }
}
