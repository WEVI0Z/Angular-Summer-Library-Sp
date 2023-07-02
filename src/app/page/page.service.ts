import { Injectable } from '@angular/core';
import {Book} from "../shared/interface/book";
import {books} from "../shared/mock/books";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {map, Observable} from "rxjs";
import {Rate} from "../shared/interface/rate";
import {Review} from "../shared/interface/review";

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
      mark
    }

    return this.http.post<Rate>(this.url + "/rate", rate, {...this.httpOptions, responseType: "json"});
  }

  sendReview(book: Book, text: string): Observable<Review> {
    const review: Review = {
      bookId: book.id,
      userId: this.userService.user!.login,
      text
    }

    return this.http.post<Review>(this.url + "/review", review, {...this.httpOptions, responseType: "json"});
  }

  getBookReviews(book: Book): Observable<Review[]> {
    return  this.http.get<Review[]>(this.url + "/review", {...this.httpOptions, responseType: "json"}).pipe(
      map(reviews => {
        return reviews.filter(review => review.bookId === book.id);
      })
    );
  }
}
