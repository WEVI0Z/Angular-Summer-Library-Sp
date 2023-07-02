import { Injectable } from '@angular/core';
import {Book} from "../shared/interface/book";
import {books} from "../shared/mock/books";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {map, Observable} from "rxjs";
import {Rate} from "../shared/interface/rate";

@Injectable({
  providedIn: 'root'
})
export class PageService {
  url: string = "https://localhost:7281";
  exampleBooks: Book[] = books;

  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"}),
  };

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getBookRates(book: Book): Observable<Rate[]> {
    return this.http.get<Rate[]>(this.url + "/rate", {...this.httpOptions, responseType: "json"}).pipe(
      map(rates => {
        return rates.filter(rate => rate.bookId === book.id);
      })
    );
  }

  sendRate(book: Book, mark: number): Observable<Rate> {
    const rate: Rate = {
      bookId: book.id,
      userId: this.userService.user!.login,
      mark: mark
    }

    return this.http.post<Rate>(this.url + "/rate", rate, {...this.httpOptions, responseType: "json"});
  }
}
