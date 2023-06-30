import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: "catalog",
    loadChildren: () => import("./catalog/catalog.module").then(m => m.CatalogModule),
  },
  {
    path: "main",
    loadChildren: () => import("./main/main.module").then(m => m.MainModule),
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/main"
  },
  {
    path: "**",
    redirectTo: "/main"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
