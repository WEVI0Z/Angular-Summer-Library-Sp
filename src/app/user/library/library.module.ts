import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LibraryComponent} from './library.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CardComponent} from "./card/card.component";


const routes: Routes = [{
  path: "",
  component: LibraryComponent,
}]


@NgModule({
  declarations: [
    CardComponent,
    LibraryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ], exports: [
    RouterModule
  ]
})
export class LibraryModule {
}
