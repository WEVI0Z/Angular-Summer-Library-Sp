import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CatalogComponent} from './catalog.component';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "../main/main.component";
import {SharedModule} from "../shared/shared.module";
import {CardComponent} from './card/card.component';


const routes: Routes = [{
  path: "",
  component: CatalogComponent,
}]

@NgModule({
  declarations: [
    CatalogComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [
    RouterModule,
    CardComponent
  ]
})
export class CatalogModule {
}
