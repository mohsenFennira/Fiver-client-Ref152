import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthConfigService } from '../../../../login/service/auth-config.service';
import { User } from '../../../../Models/User';
import { isPlatformBrowser } from '@angular/common';
import { UserAuthService } from '../../../../login/service/user-auth.service';
import { Router } from '@angular/router';
import { RoleType } from '../../../../Models/enum/RoleType';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  gender!:String
  firstName!:String;
  lastName!:String;
  role!:RoleType;
constructor(private r:Router, private authConfigUser:AuthConfigService,private userAuth:UserAuthService, @Inject(PLATFORM_ID) private platformId: Object){}
ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    // Only call getUserInSession if in the browser environment
    this.getUseerInSession();
  }

}
 user!: User;

getUseerInSession() {
  this.authConfigUser.getUserByToken().subscribe((data) => {
    this.gender = data.genderType;this.firstName = data.firstName;;this.lastName = data.lastName;this.role=data.roleTypes;
  });
}
public logout(){
  this.authConfigUser.logout(this.userAuth.getEmail()).subscribe((data)=>{console.log(data)});
  this.r.navigate(['/home']);
  this.userAuth.clear();
}
}
