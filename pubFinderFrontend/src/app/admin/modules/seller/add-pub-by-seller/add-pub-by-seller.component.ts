import { Component } from '@angular/core';
import { PublicationService } from '../../../../client/modules/service/publication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CountryData } from '../../../../Models/data/CountryData';
import { CategoryData } from '../../../../Models/data/CategoryDat';
import { Publication } from '../../../../Models/Publication';
import { NgForm } from '@angular/forms';
import { RegionData } from '../../../../Models/data/RegionData';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { catchError, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-pub-by-seller',
  templateUrl: './add-pub-by-seller.component.html',
  styleUrl: './add-pub-by-seller.component.css'
})
export class AddPubBySellerComponent {
  constructor(private pubService:PublicationService,private snackBar:MatSnackBar,private r:Router,private toastr: ToastrService){}
  selectedOption: String ="Product";
  selectedCountry!: string ; // Default country code
  countries=[
    { name: 'Argentina', code: 'AR', phoneCode: '+54' },
    { name: 'Chile', code: 'CL', phoneCode: '+56' }
    // Add other countries here...
  ];
  category=CategoryData;
  regions: string[] = [];
  selectedRegion!: string;
  pub!:Publication;
  selectedCategory: string = 'Product';
  addPub(t7: NgForm): void {
    const pub = new Publication();
    pub.title = t7.controls['title'].value;
    pub.region = t7.controls['region'].value;
    pub.country = this.selectedCountryName;
    pub.shortDescription = t7.controls['shortdescription'].value;
    pub.longDescription = t7.controls['longdescription'].value;

    pub.category = this.selectedOption;

    this.pubService.addPublication(pub).pipe(
      switchMap((data: any) => {
        const idPublication = data.idPublication;
        // Check if there's an image to upload
        if (this.image) {
          // If image exists, proceed with image upload
          return this.pubService.updatePubToAddImage(idPublication, this.image).pipe(
            catchError(() => {
              // If image upload fails, delete the publication
              return this.pubService.deletePost(idPublication);
            })
          );
        } else {
          // If no image, just return a successful response
          return of(null);
        }
      })
    ).subscribe(
      () => {
        if(this.image){
          Swal.fire('Success', 'Publication added successfully!', 'success').then(() => {
            this.r.navigate(['/seller/myPub']);
          });
        }
        else{
          Swal.fire('Error', 'Failed to add publication you need to add a valid image .', 'error');
        }
        // If both addPublication and updatePubToAddImage are successful

      },
      (error: HttpErrorResponse) => {
        console.error(error); // Log the error for debugging
        this.errorMessage = error.error.messages;
        // Handle the error here, if necessary
        // Display an error message
        Swal.fire('Error', 'Failed to add publication.', 'error');
      }
    );
  }

  errorMessage!:any;

  image!: File;
  publ!:Publication;
  idPub!:number;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.image=file;
    console.log(this.image);

  }
   selectedCountryName!: string ;
  onCountryChange() {
    // Find the selected country
    const selectedCountryObj = this.countries.find(country => country.code === this.selectedCountry);
    // If a country is selected, update regions
    if (selectedCountryObj) {
      this.selectedCountryName = selectedCountryObj.name;
      // Assuming RegionData contains an array of regions for each country
      this.regions = RegionData[selectedCountryObj.code];
    } else {
      // Clear regions if no country is selected
      this.regions = [];
    }
  }
}

