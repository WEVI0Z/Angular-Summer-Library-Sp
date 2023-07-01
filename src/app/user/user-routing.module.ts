import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {authGuard} from "./guards/auth.guard";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {
    path: "info",
    canActivate: [authGuard],
    loadChildren: () => import("./info/info.module").then(m => m.InfoModule),
  },
  {
    path: "login",
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule),
  },
  {
    path: "register",
    loadChildren: () => import("./register/register.module").then(m => m.RegisterModule),
  },
  {
    path: "library",
    loadChildren: () => import("./library/library.module").then(m => m.LibraryModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
