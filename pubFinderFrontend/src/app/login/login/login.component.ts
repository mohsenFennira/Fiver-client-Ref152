import { Component } from '@angular/core';
import { User } from '../../Models/User';
import { UserAuthService } from '../service/user-auth.service';
import { RoleType } from '../../Models/enum/RoleType';
import { AuthConfigService } from '../service/auth-config.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 constructor(private authUserService:AuthConfigService,private userAuthService:UserAuthService,private router:Router){}
 user!:User;
 errorMessage: string = '';

 login(t7:NgForm){
  this.user=new User();
  this.user.email=t7.controls["email"].value;
  this.user.password=t7.controls["password"].value;
  this.user.roleTypes=RoleType.ADMIN;
  this.authUserService.login(this.user).subscribe((data:any)=>{console.log(data.jwtToken);
  console.log(data.user);
  this.userAuthService.setRoles(data.user.roleTypes);
  this.userAuthService.setToken(data.jwtToken);
  this.userAuthService.setEmail(data.user.email);
  const role =data.user.roleTypes;
  if(role=="ADMIN"){
  this.router.navigate(['/admin']);
  }
  else if(role=="SELLER"){
    this.router.navigate(['/home']);
  }
  else{
    this.router.navigate(['/home'])
  }
  },
  (error: HttpErrorResponse ) => {
    console.error(error); // Log the error for debugging

    // Handle error here
    if (error.error.error === "BAD_LOGIN_CREDENTIALS") {
      // Set error message to be displayed on the login page
      this.errorMessage = "Invalid Information";
    } else {
      // Set error message to be displayed on the login page
      this.errorMessage = error.error.message ;
    }
  }
  );
 }
 redirectToRegister() {
  // Set the message before redirecting
  if(this.authUserService.seller){
    this.authUserService.seller = true;
    this.router.navigate(['/register'])
  }
  else{
       this.router.navigate(['/register'])
  }

}
}
