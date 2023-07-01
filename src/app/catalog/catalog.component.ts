import {Component, OnInit} from '@angular/core';
import {books} from "../shared/mock/books";
import {Book} from "../shared/interface/book";
import {UserService} from "../user/user.service";
import {User} from "../shared/interface/user";
import {CatalogService} from "./catalog.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  books: Book[] = books;
  user: User | null = this.userService.user;

  constructor(
    private userService: UserService,
    private catalogService: CatalogService
  ) {
  }

  ngOnInit() {
    if (this.user) {
      this.catalogService.getUserBooks().subscribe(books => {
        this.books = this.books.filter(book => {
          return !books.includes(book);
        })
      });
    }
  }
}
