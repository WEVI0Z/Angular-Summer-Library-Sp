import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {CatalogService} from "../catalog/catalog.service";
import {Book} from "../shared/interface/book";
import {books} from "../shared/mock/books";
import {User} from "../shared/interface/user";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit{
  public book?: Book;
  public user: User | null = this.userService.user;
  public favourite: boolean = false;
  public owned: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private catalogService: CatalogService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        this.book = books[params["id"]];

        return this.catalogService.getUserBooks().pipe(
          switchMap(books => {
            this.owned = books.includes(this.book!)

            return this.catalogService.getFavouriteBooks();
          })
        );
      })
    ).subscribe(books => this.favourite = books.includes(this.book!));
  }

  add() {
    this.catalogService.add(this.book!).subscribe(() => this.favourite = true);
  }

  remove() {
    this.catalogService.remove(this.book!).subscribe(() => this.favourite = false);
  }

  buy() {
    this.catalogService.buy(this.book!).subscribe(item => {
      if (item) {
        this.router.navigate(["/user/library"])
        return;
      }

      this.router.navigate(["/user/info"], {queryParams: {error: "На счете не хватает средств"}});
    });
  }
}
