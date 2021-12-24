import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VisitorGuard implements CanActivate {

  public constructor(private router: Router) {}

  public canActivate(): boolean {
    const isLoggedIn = sessionStorage.getItem("token");
    const userType = sessionStorage.getItem("userType");

    if(!isLoggedIn) {
        return true;
    }

    if(userType == "ADMIN")
    {
      this.router.navigateByUrl("/admin");
    }
    else
    {
      this.router.navigateByUrl("/customer");
    }

    return false;
  }
  
}
