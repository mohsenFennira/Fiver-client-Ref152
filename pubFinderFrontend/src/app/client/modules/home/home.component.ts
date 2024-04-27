import { Component } from '@angular/core';
import { PublicationService } from '../service/publication.service';
import { NgForm } from '@angular/forms';
import { Publication } from '../../../Models/Publication';
import { GenderType } from '../../../Models/enum/GenderType';
import { RegionData } from '../../../Models/data/RegionData';
import { Router } from '@angular/router';
import { AuthConfigService } from '../../../login/service/auth-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
constructor(private pubService:PublicationService,private router:Router,private authConfig:AuthConfigService){}
redirectToLogin() {
  // Set the message before redirecting
  this.authConfig.seller = true;
  this.router.navigate(['/register']);
}
ngOnInit(){
  this.ListsOfProductByCategoryHomePage();
}
countryData=[
  { name: 'Argentina', code: 'AR', phoneCode: '+54' },
  { name: 'Chile', code: 'CL', phoneCode: '+56' }
  // Add other countries here...
];
selectedCountry!: string;
selectedCity!: string;
categoryList=[
  {name:"Clothes"},
  {name:"Services"},
  {name:"Foods"},
  {name:"Product"}
];

cities!: string[];

  selectCountry(country: any): void {
    console.log(country);
    const countryName=country;
    this.selectedCountry = country;
    const selectedCountryObj = this.countryData.find(country => country.name === this.selectedCountry);
    console.log(selectedCountryObj);
    if (selectedCountryObj) {
      // Get the code of the selected country
      console.log(selectedCountryObj);
      const countryCode = selectedCountryObj.code;
      // Get cities for the selected country
      this.cities = RegionData[countryCode];

    }

  }

  selectCity(city: string): void {
    this.selectedCity = city;
  }
  selectedCategory!:String;
  selectCategory(category: string): void{
    this.selectedCategory =category;
    console.log(category);
  }
  productList: any;
  ListsOfProductByCategoryHomePage(){
    this.pubService.ListsOfProductByCategoryHomePage().subscribe((data)=>{this.productList = data,console.log(data)
  })
  }
  redirectToSearchProductPage(){
    this.pubService.country=this.selectedCountry;
    this.pubService.region=this.selectedCity;
    this.pubService.category=this.selectedCategory;
    this.router.navigate(['/home/Pub']);

  }
  AllcidadA!:any;
  coAll!:Boolean;
  Allcidad(){
    this.coAll=true;
    if(this.coAll){
      this.AllcidadA="Toda la ciudad";
    }
  }
  Allpais!:any;
  paiAll!:Boolean;
  AllpaisM(){
    this.paiAll=true;
    if(this.paiAll){
      this.Allpais="Todo la pais";
    }
  }
  AllCat!:any;
  catAll!:Boolean;
  AllcatsM(){
    this.catAll=true;
    if(this.catAll){
      this.AllCat="Todo la categoria";
    }
  }
  pubDetail(idPub:number){
    this.router.navigate(['/home/Pub/detail',idPub]);
}
}
