import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthConfigService } from '../service/auth-config.service';
import { User } from '../../Models/User';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  constructor(private router: Router,private authConfig:AuthConfigService,private r:ActivatedRoute) {}
     user!:User;
     verifcode!:number;
     ngOnInit() {
      // Redirect to login page after 5 seconds
      this.r.params.subscribe(params => {
        this.verifcode = params['verificationCode'];
      });
    }
  changepassword(t7:NgForm){
     this.user=new User;
     this.user.password=t7.controls['newpassword'].value;
     this.authConfig.changePassword(this.verifcode,this.user).subscribe((data=>{console.log(data);
    this.router.navigate(['/login']);
    }));
  }
}
