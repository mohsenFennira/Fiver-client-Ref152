import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../login/service/user-auth.service';
import { AuthConfigService } from '../login/service/auth-config.service';
import { RoleType } from '../Models/enum/RoleType';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private userAuth:UserAuthService,private router:Router,private authConfig:AuthConfigService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Your authentication logic here
    if(this.userAuth.getToken() !==null){
         const role = route.data["roles"] as RoleType;
         if(role){
              const match = this.authConfig.roleMatch(role);
              if (match) {
                    return true;
            }
              else{
                let navigationPending = true;
                if (navigationPending) {
                  // If pending, navigate to forbidden page
                  this.router.navigate(['/forbidden']);
              }
              return false;
              }
         }
    }
    return false;
  }
}
