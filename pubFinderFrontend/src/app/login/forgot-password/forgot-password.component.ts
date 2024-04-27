import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthConfigService } from '../service/auth-config.service';
import { User } from '../../Models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  constructor(private authConfigService:AuthConfigService,private router:Router,private matSnack:MatSnackBar){}
  user!:User;
  errorMessage: string = '';
  forgotpassword(t7:NgForm){
      this.user=new User();
       this.user.email=t7.controls["email"].value;
       this.authConfigService.forgotPassword(this.user.email).subscribe((data:any)=>{console.log(data);this.errorMessage=data;
        this.matSnack.open('your forgot password link sended in your email!', 'Close', {
          duration: 3000,
          panelClass: ['custom-snackbar']
        });

      },

        (error: HttpErrorResponse ) => {
          console.log(error);
            this.errorMessage = error.error.messages;
        }
        );
      }
     }

