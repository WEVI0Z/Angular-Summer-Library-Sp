import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {map, Observable, switchMap} from "rxjs";
import {User} from "../shared/interface/user";
import {Book} from "../shared/interface/book";
import {BookLink} from "../shared/interface/bookLink";
import {books} from "../shared/mock/books";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  url: string = "https://localhost:7281";
  exampleBooks: Book[] = books;

  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"}),
  };

  constructor(private http: HttpClient, private userService: UserService) {
  }

  buy(book: Book): Observable<BookLink | null> {
    const body: User = this.userService.user!;

    if(body.balance >= book.cost) {
      body.balance -= book.cost;

      return this.http.put<User>(this.url + "/user", body, {...this.httpOptions, responseType: "json"}).pipe(
        switchMap(user => {
          const body: BookLink = {
            userId: this.userService.user!.login,
            bookId: book.id
          }

          return this.http.post<BookLink>(this.url + "/user/book", body, {...this.httpOptions, responseType: "json"})
        })
      );
    } else {
      return new Observable<null>(subscriber => subscriber.next(null));
    }
  }

  getUserBooks(): Observable<Book[]> {
    return this.http.get<BookLink[]>(this.url + "/user/book", {...this.httpOptions, responseType: "json"}).pipe(
      map(bookLinks => {
        const books: Book[] = [];
        bookLinks.forEach(bookLink => {
          if (bookLink.userId == this.userService.user!.login) {
            books.push(this.exampleBooks[bookLink.bookId - 1]);
          }
        })

        return books;
      })
    )
  }
}
