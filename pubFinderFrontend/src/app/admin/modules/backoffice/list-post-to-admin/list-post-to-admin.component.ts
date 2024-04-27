import { Component } from '@angular/core';
import { PublicationService } from '../../../../client/modules/service/publication.service';
import { Publication } from '../../../../Models/Publication';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-post-to-admin',
  templateUrl: './list-post-to-admin.component.html',
  styleUrl: './list-post-to-admin.component.css'
})
export class ListPostToAdminComponent {
constructor(private pubS:PublicationService, private snackBar: MatSnackBar){}
ngOnInit(){
  this.getPublications();
}
pubs!:Publication[];
getPublications(){
  this.pubS.getPublicationForAdmin(this.currentPagePub,this.pageSizePub).subscribe((data)=>{this.pubs=data.data,console.log(data),
            this.totalItemsPub = data.totalElements;
  });
}
idPo!:number;
publication!:Publication;
updateStatusOfPub(idPost:number,status:Boolean){
  this.publication=new Publication();
  this.publication.enabled=status;
  this.pubS.updateStatusOfPostByAdmin(this.publication,this.idPo).subscribe((data)=>{this.getPublications()});
}
getid(id:number){
this.idPo=id;
}
deletePost(idPost:number){
  this.pubS.deletePost(idPost).subscribe(
    () => {
      // Call the method to refresh the table data
      this.getPublications();
      // Show a notification to indicate the pickup was deleted successfully
      this.snackBar.open('The Post was deleted successfully!', 'Close', {
        duration: 3000,
        panelClass: ['custom-snackbar']
      });
    },
    (error) => {
      // Handle error here, show an error notification or log the error
      console.error('Error deleting pickup:', error);
      this.snackBar.open('An error occurred while deleting the Post. Please try again later.', 'Close', {
        duration: 3000,
        panelClass : ['custom-snackbar'],
      });
    }
  );
 }
 idPostTodelete!:number;
 takeidToDelete(idPost:number){
 this.idPostTodelete=idPost;
 console.log(idPost)
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
