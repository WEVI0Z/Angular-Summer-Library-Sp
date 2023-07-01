import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import {RouterModule, Routes} from "@angular/router";
import {GamesComponent} from "../games/games.component";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
  {
    path: ":id",
    component: PageComponent,
  },
]

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class PageModule { }
