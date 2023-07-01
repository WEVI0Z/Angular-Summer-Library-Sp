import { Component } from '@angular/core';
import {Book} from "../../shared/interface/book";
import {User} from "../../shared/interface/user";
import {UserService} from "../user.service";
import {CatalogService} from "../../catalog/catalog.service";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  books: Book[] = [];
  user: User | null = this.userService.user;

  constructor(
    private userService: UserService,
    private catalogService: CatalogService
  ) {
  }

  ngOnInit() {
    if (this.user) {
      this.catalogService.getFavouriteBooks().subscribe(books => {
        this.books = books;
      });
    }
  }
}
