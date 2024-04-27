import { Component } from '@angular/core';
import { UserManagementService } from '../../service/user-management.service';
import { User } from '../../../../Models/User';
import { GenderType } from '../../../../Models/enum/GenderType';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrl: './get-users.component.css'
})
export class GetUsersComponent {

  genderTypeMen!: GenderType.MEN;
  idUserTodelete!:number;
constructor(private userM:UserManagementService,private r:Router, private snackBar: MatSnackBar){}
ngOnInit(){
  this.getUsers();
}
users!:User[];
 getUsers(){
 this.userM.getUsers(1,10).subscribe((data)=>{this.users=data.data});
 }
 deleteUser(idUser:number){
  this.userM.deleteUser(idUser).subscribe(
    () => {
      // Call the method to refresh the table data
      this.getUsers();
      // Show a notification to indicate the pickup was deleted successfully
      this.snackBar.open('The user was deleted successfully!', 'Close', {
        duration: 3000,
        panelClass: ['custom-snackbar']
      });
    },
    (error) => {
      // Handle error here, show an error notification or log the error
      console.error('Error deleting pickup:', error);
      this.snackBar.open('An error occurred while deleting the user. Please try again later.', 'Close', {
        duration: 3000,
        panelClass : ['custom-snackbar'],
      });
    }
  );
 }
 takeidToDelete(idUser:number){
 this.idUserTodelete=idUser;
 console.log(idUser)
 }
}
