import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SniperComponent} from './sniper.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SniperComponent,
  },
]


@NgModule({
  declarations: [
    SniperComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class SniperModule {
}
