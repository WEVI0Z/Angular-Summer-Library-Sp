import {Component, OnInit} from '@angular/core';
import {Book} from "../../shared/interface/book";
import {User} from "../../shared/interface/user";
import {UserService} from "../user.service";
import {CatalogService} from "../../catalog/catalog.service";
import {books} from "../../shared/mock/books";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit{
  books: Book[] = [];
  user: User | null = this.userService.user;

  constructor(
    private userService: UserService,
    private catalogService: CatalogService
  ) {
  }

  ngOnInit() {
    if (this.user) {
      this.catalogService.getUserBooks().subscribe(books => {
        console.log(books);
        this.books = books;
      });
    }
  }
}
