import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {CatalogService} from "../catalog/catalog.service";
import {Book} from "../shared/interface/book";
import {books} from "../shared/mock/books";
import {User} from "../shared/interface/user";
import {map, Observable, switchMap, tap} from "rxjs";
import {PageService} from "./page.service";
import {Review} from "../shared/interface/review";

const FILTER: string[] = ["черт", "блин", "ничтожно"]

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  public book?: Book;
  public user: User | null = this.userService.user;
  public favourite: boolean = false;
  public owned: boolean = false;
  public rated: boolean = false;
  public mark: number = 0;
  public reviews: Review[] = [];
  public badReview: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private catalogService: CatalogService,
    private router: Router,
    private pageService: PageService,
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        this.book = books[params["id"] - 1];

        return this.catalogService.getUserBooks().pipe(
          switchMap(books => {
            this.owned = books.includes(this.book!);

            return this.catalogService.getFavouriteBooks().pipe(
              tap(books => this.favourite = books.includes(this.book!)),
              switchMap(() => this.pageService.getBookRates(this.book!).pipe(
                tap(rates => {
                  let tempMark: number = 0;

                  rates.forEach(rate => {
                    if (rate.userId === this.user!.login || !this.user) {
                      this.rated = true
                    }

                    tempMark += rate.mark;
                  })

                  this.mark = tempMark / rates.length;
                }),
                switchMap(() => this.pageService.getBookReviews(this.book!).pipe(
                    tap(reviews => {
                      this.reviews = reviews;
                    })
                  )
                )
              ))
            );
          })
        );
      })
    ).subscribe();
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

  calcRate() {
    this.pageService.getBookRates(this.book!).pipe(
      tap(rates => {
        let tempMark: number = 0;

        rates.forEach(rate => {
          if (rate.userId === this.user!.login || !this.user) {
            this.rated = true
          }

          tempMark += rate.mark;
        })

        this.mark = tempMark / rates.length;
      })
    ).subscribe();
  }

  rate() {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(".page__rate input");

    let mark: number | undefined;

    inputs.forEach(input => {
      if (input.checked) {
        mark = +input.value;
      }
    })

    if (mark) {
      this.pageService.sendRate(this.book!, mark).subscribe(rate => {
        this.rated = true;
        this.calcRate();
      });
    }
  }

  sendReview() {
    const review: HTMLInputElement = document.querySelector(".page__reviews textarea")!;
    this.badReview = false;

    let text: string | undefined = review.value;

    FILTER.forEach(item => {
      if (text?.includes(item)) {
        this.badReview = true;
      }
    })

    if (text && !this.badReview) {
      this.pageService.sendReview(this.book!, text).subscribe(review => {
        this.reviews.push(review);
      })
    }
  }
}
