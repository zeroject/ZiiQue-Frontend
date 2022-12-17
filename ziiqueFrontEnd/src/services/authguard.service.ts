import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor() {
  }

  /// checks if there is a token in local storage and checks if this token is valid
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem("token");
    if (token) {
      let decodedToken = jwtDecode(token) as Token;
      let currentDate = new Date();
      if (decodedToken.exp) {
        let expire = new Date(decodedToken.exp*1000)
        if (currentDate<expire)
        {
          return true;
        }
      }
    }
    return false;
    }
  }
class Token {
  exp?: number;
}

