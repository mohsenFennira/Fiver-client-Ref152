import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GenderType } from '../../../../Models/enum/GenderType';
import { CountryData } from '../../../../Models/data/CountryData';
import { RoleType } from '../../../../Models/enum/RoleType';
import { User } from '../../../../Models/User';
import { UserManagementService } from '../../service/user-management.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-user-from-admin-side',
  templateUrl: './add-user-from-admin-side.component.html',
  styleUrl: './add-user-from-admin-side.component.css'
})
export class AddUserFromAdminSideComponent {
  constructor(private userM:UserManagementService,private r:Router){}
  countries = CountryData;
  selectedCountry: string = 'TN'; // Default country code
  selectedGender: GenderType = GenderType.MEN;
  selectedRole: RoleType = RoleType.ADMIN;
  errorMessage: string = '';

     user!:User;
  addUser(t7:NgForm){
    this.user=new User();
    this.user.firstName=t7.controls['firstName'].value;
    this.user.lastName=t7.controls['lastName'].value;
    this.user.email=t7.controls['email'].value;
    this.user.password=t7.controls['password'].value;
    this.user.birthDate=t7.controls['dateBirth'].value;
    this.user.genderType=this.selectedGender;
    this.user.nationality=t7.controls['nationality'].value;
    this.user.phoneNumber=t7.controls['phone'].value;
    this.user.roleTypes=this.selectedRole;

    this.userM.addUser(this.user).subscribe((data)=>{console.log(data);
      this.r.navigate(['/admin/users']);
    },(error: HttpErrorResponse ) => {
      console.error(error);
      if (error.error && error.error.messages) {
        this.errorMessage = error.error.messages.join(', ');
      } else {
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    })
 }


}
