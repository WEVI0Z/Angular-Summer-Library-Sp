import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GamesComponent} from './games.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {CardComponent} from './card/card.component';

const routes: Routes = [
  {
    path: "",
    component: GamesComponent,
  },
  {
    path: "sniper",
    loadChildren: () => import("./sniper/sniper.module").then(m => m.SniperModule),
  }
]

@NgModule({
  declarations: [
    GamesComponent,
    CardComponent
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
export class GamesModule {
}
