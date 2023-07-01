import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavouritesComponent} from './favourites.component';
import {RouterModule, Routes} from "@angular/router";
import {LibraryComponent} from "../library/library.component";
import {SharedModule} from "../../shared/shared.module";
import {CardComponent} from "./card/card.component";

const routes: Routes = [{
  path: "",
  component: FavouritesComponent,
}]


@NgModule({
  declarations: [
    FavouritesComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [
    RouterModule
  ]
})
export class FavouritesModule {
}
