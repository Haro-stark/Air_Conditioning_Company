import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { Roles } from '../models/Roles';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (!this.authService.isAuthorized()) {
    //   this.router.navigate(['login']);
    //   return false;
    // }

    // const roles = route.data['expectedRoles'];
    // if (roles && !roles.some((r: Roles) => this.authService.hasRole(r))) {
    //   this.router.navigate(['error', 'not-found']);
    //   return false;
    // }
    if (route.data && route.data['expectedRoles'] == "admin")
      return true;
    else return false
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthorized()) {
      return false;
    }

    const roles = route.data && route.data['roles'] as Roles[];
    if (roles && !roles.some(r => this.authService.hasRole(r))) {
      return false;
    }

    return true;
  }

}
