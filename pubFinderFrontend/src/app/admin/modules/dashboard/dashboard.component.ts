import { Component } from '@angular/core';
import { UserManagementService } from '../service/user-management.service';
import { PublicationService } from '../../../client/modules/service/publication.service';
import { Publication } from '../../../Models/Publication';
import { User } from '../../../Models/User';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
constructor(private userMa:UserManagementService,private pubService:PublicationService ){}
statics!:any;
pubs!:Publication[];
activeUsers!:User[];
allUsers!: User[];
newUsers!:User[];

ngOnInit(){
this.getActiveUsers();
this.userMa.getStatistics().subscribe((data)=>{this.statics=data});
this.getUsers();
this.getPublications();
}
getActiveUsers(){
  this.userMa.getActiveUsers(this.currentPageActiveUsers,this.pageSizeActiveUsers).subscribe((data)=>{this.activeUsers=data.data,this.totalItemsActiveUsers==data.totalElements});
}
totalItemsActiveUsers = 100; // Total number of items
pageSizeActiveUsers = 5; // Number of items per page
currentPageActiveUsers = 1; // Current page index

  onPageChange(event:any): void {
    this.pageSizeActiveUsers = event.pageSize;
    this.currentPageActiveUsers = event.pageIndex+1;
    this.getActiveUsers();
  }




getUsers(){
  this.userMa.getUsers(this.currentPageUsers,this.pageSizeUsers).subscribe((data)=>{this.allUsers = data.data,this.totalItemsUsers=data.totalElements;
    // Sort users by creation date in descending order
    this.newUsers = this.allUsers.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()).slice(0, 5);
    });
}
totalItemsUsers = 100; // Total number of items
pageSizeUsers = 5; // Number of items per page
currentPageUsers= 1; // Current page index

  onUsers(event:any): void {
    this.pageSizeUsers = event.pageSize;
    this.currentPageUsers = event.pageIndex+1;
    this.getUsers();
  }


  getPublications(){
    this.pubService.getPublicationForAdmin(this.currentPagePub,this.pageSizePub).subscribe((data)=>{this.pubs=data.data,console.log(data),
              this.totalItemsPub = data.totalElements;
    });
  }
  totalItemsPub = 100; // Total number of items
  pageSizePub = 5; // Number of items per page
  currentPagePub= 1; // Current page index
onPub(event:PageEvent): void {
  this.pageSizePub = event.pageSize;
  this.currentPagePub = event.pageIndex+1;
  this.getPublications();
}

}
