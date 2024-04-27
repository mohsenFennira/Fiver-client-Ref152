import { Component } from '@angular/core';
import { CountryData } from '../../Models/data/CountryData';
import { User } from '../../Models/User';
import { GenderType } from '../../Models/enum/GenderType';
import { AuthConfigService } from '../service/auth-config.service';
import { RoleType } from '../../Models/enum/RoleType';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { delay, timer } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Corrected property name
})
export class RegisterComponent {
  constructor(private authConfigService: AuthConfigService, private router: Router) {}
  seller!:Boolean;
  ngOnInit(){
     this.seller=this.authConfigService.seller;
     console.log(this.seller);
  }
  countries = CountryData;
  selectedCountry: string = 'US'; // Default country code
  selectedCountryPhoneCode: string = '+1'; // Default phone code
  updatePhoneCode(): void {
    const country = this.countries.find(c => c.code === this.selectedCountry);
    if (country) {
      this.selectedCountryPhoneCode = country.phoneCode;
    }
  }



  termsAgreed: boolean = false;

  cities: any;
  selectedGender: GenderType = GenderType.MEN; // Initialize with a default value
  user!: User;
  selectedRole!: RoleType; // Initialize with a default value
  errorMessage!:any;

  register(t7: NgForm) {
    this.user = new User();
    this.user.firstName = t7.controls["firstName"].value;
    this.user.lastName = t7.controls["lastName"].value;
    this.user.birthDate = t7.controls["dateBirth"].value;
    this.user.genderType = this.selectedGender;
    this.user.email = t7.controls["email"].value;
    this.user.password = t7.controls["password"].value;
    this.user.phoneNumber = t7.controls["phonenumber"].value;
    this.user.nationality= this.selectedNatinalitie;
    if(!this.seller){
      this.user.roleTypes=RoleType.ADMIN;
    this.authConfigService.registerAdmin(this.user).subscribe((data: any) => {
      Swal.fire('Success', 'User Registred successfully!', 'success');

  // Delay for 3 seconds before redirecting
  timer(1000).pipe(
    delay(1000)
  ).subscribe(() => {
    this.router.navigate(['/welcome']);
  });},
    (error: HttpErrorResponse) => {
      console.error(error); // Log the error for debugging
      if (error instanceof HttpErrorResponse) {
        if (error.error.error === 'DUPLICATED_EMAIL') {
          this.errorMessage = 'Email must be unique.';
        } else {
          this.errorMessage = error.error.messages ;
        }
        // Display an error message
        Swal.fire('Error', 'Failed to Register. ' + this.errorMessage, 'error');
      } else {
        // Handle the error here, if necessary
        // Display an error message
        Swal.fire('Error', 'Failed to Register. Cause: ' + this.errorMessage, 'error');
      }

    });
    }
    else{
      this.user.roleTypes=RoleType.SELLER;
      this.authConfigService.register(this.user).subscribe((data: any) => {
        Swal.fire('Success', 'User Registred successfully!', 'success');

    // Delay for 3 seconds before redirecting
    timer(1000).pipe(
      delay(1000)
    ).subscribe(() => {
      this.router.navigate(['/welcome']);
    });},
      (error: HttpErrorResponse) => {
        console.error(error); // Log the error for debugging
        if (error instanceof HttpErrorResponse) {
          if (error.error.error === 'DUPLICATED_EMAIL') {
            this.errorMessage = 'Email must be unique.';
          } else {
            this.errorMessage = error.error.messages || 'Unknown error occurred.';
          }
          // Display an error message
          Swal.fire('Error', 'Failed to Register. ' + this.errorMessage, 'error');
        } else {
          // Handle the error here, if necessary
          // Display an error message
          Swal.fire('Error', 'Failed to Register. Cause: ' + this.errorMessage, 'error');
        }

      });
    }

  }
selectedNatinalitie:string="United States";
  onCountryChange() {
    // Find the selected country
    const selectedCountryObj = this.countries.find(country => country.code === this.selectedCountry);
    // If a country is selected, update regions
    console.log(selectedCountryObj)
    if (selectedCountryObj) {
      this.selectedNatinalitie = selectedCountryObj.name;
      // Assuming RegionData contains an array of regions for each country
    }
  }
}
