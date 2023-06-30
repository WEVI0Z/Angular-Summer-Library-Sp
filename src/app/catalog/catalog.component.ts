import { Component } from '@angular/core';
import {books} from "../shared/mock/books";
import {Book} from "../shared/interface/book";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  books: Book[] = books;
}
