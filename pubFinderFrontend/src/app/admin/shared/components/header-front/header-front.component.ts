import { Component } from '@angular/core';
import { UserAuthService } from '../../../../login/service/user-auth.service';
import { Router } from '@angular/router';
import { AuthConfigService } from '../../../../login/service/auth-config.service';
import { timer } from 'rxjs';
import { RoleType } from '../../../../Models/enum/RoleType';
import { GenderType } from '../../../../Models/enum/GenderType';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrl: './header-front.component.css'
})
export class HeaderFrontComponent {
  constructor(private r:Router, private authConfigUser:AuthConfigService,private userAuth:UserAuthService,private router:Router){

  }
  redirectToLogin() {
    // Set the message before redirecting
    if(!this.role){
      this.authConfigUser.seller = true;
      this.router.navigate(['/login'])
    }
    else{
         this.router.navigate(['/seller/addMyPub'])
    }

  }
  redirectToPubAdmin(){
    this.router.navigate(['/admin/posts'])

  }
  gender!:GenderType;
  redirectToRegister(){
    this.authConfigUser.seller = true;
    this.router.navigate(['/register'])
  }
  spinnerVisible: boolean = true;
  role!:RoleType;
ngOnInit(){
  this.getUseerInSession();
}
  getUseerInSession() {
    this.authConfigUser.getUserByToken().subscribe((data) => {
      this.role = data.roleTypes;this.gender=data.genderType;
    });
  }

  public logout(){
    this.authConfigUser.logout(this.userAuth.getEmail()).subscribe((data)=>{console.log(data)});
    this.userAuth.clear();
  }
}
