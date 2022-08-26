import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()

export class AuthGuard {
  constructor(){}

  // canActivate() {
  //   // const userId = this.storageService.getAuthCookie();
  //   // if(!true) {
  //   //   this.router.navigateByUrl("/login");
  //   //   return false;
  //   // }
  //   return true;
  // }
  
}
