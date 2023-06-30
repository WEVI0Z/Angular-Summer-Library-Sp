import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {
    path: "catalog",
    loadChildren: () => import("./catalog/catalog.module").then(m => m.CatalogModule),
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then(m => m.UserModule),
  },
  {
    path: "games",
    loadChildren: () => import("./games/games.module").then(m => m.GamesModule),
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
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
