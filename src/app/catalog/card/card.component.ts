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

  constructor(private catalogService: CatalogService, private router: Router) {
  }

  buy() {
    this.catalogService.buy(this.book).subscribe(item => {
      if (item) {
        return;
      }

      this.router.navigate(["/user/info"], {queryParams: {error: "На счете не хватает средств"}});
    });
  }
}
