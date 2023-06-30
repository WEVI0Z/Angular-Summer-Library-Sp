import {CanActivateFn, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {UserService} from "../user.service";

@Injectable({
  providedIn: "root"
})
class PermissionsService {
  constructor(
    private userService: UserService
  ) {}

  canActivate(): boolean {
    return !!this.userService.user;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
