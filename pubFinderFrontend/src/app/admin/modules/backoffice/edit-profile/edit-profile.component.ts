import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../../Models/User';
import { UserManagementService } from '../../service/user-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleType } from '../../../../Models/enum/RoleType';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  constructor(private userM:UserManagementService,private r:ActivatedRoute, private snackBar: MatSnackBar,private o:Router){}
  ngOnInit(){
    this.r.params.subscribe(params => {
      this.idUser = params['idUser'];
    });
    this.getUserById(this.idUser);

  }
  idUser!:number;
  user!:User;
  editProfile(t7:NgForm){
    this.user=new User();
    this.user.firstName=t7.controls['firstName'].value;
    this.user.lastName=t7.controls['lastName'].value;
    this.user.phoneNumber=t7.controls['phone'].value;
    this.user.email=t7.controls['email'].value;

    this.userM.editProfile(this.user,this.idUser).subscribe((data)=>{
      if(this.userSession.roleTypes==RoleType.ADMIN){
        Swal.fire('Success', 'User updated successfully!', 'success').then(() => {
          this.o.navigate(['/admin/profile']);
        });
      }
      else{
        Swal.fire('Success', 'User updated successfully!', 'success').then(() => {
          this.o.navigate(['/seller/profile']);
        });      }

    });
  }
  userSession!:User;
  getUserById(idUser:number){
    this.userM.getUserById(idUser).subscribe((data)=>{this.user=data;this.userSession=data

    });
  }
}
