import { Component } from '@angular/core';
import { PublicationService } from '../../../../client/modules/service/publication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Publication } from '../../../../Models/Publication';

@Component({
  selector: 'app-view-my-pub-seller',
  templateUrl: './view-my-pub-seller.component.html',
  styleUrl: './view-my-pub-seller.component.css'
})
export class ViewMyPubSellerComponent {
  constructor(private pubS:PublicationService, private snackBar: MatSnackBar){}
  ngOnInit(){
    this.getPubs();
  }
  pubs!:Publication[];
  getPubs(){
    this.pubS.getMyPublications().subscribe((data)=>{this.pubs=data});
  }
  deletePost(idPost:number){
    this.pubS.deletePost(idPost).subscribe(
      () => {
        // Call the method to refresh the table data
        this.getPubs();
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
   idPostTodelete!:number;
   takeidToDelete(idPost:number){
   this.idPostTodelete=idPost;
   console.log(idPost)
   }
}
