import { Component } from '@angular/core';
import { PublicationService } from '../service/publication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pub-page',
  templateUrl: './pub-page.component.html',
  styleUrl: './pub-page.component.css'
})
export class PubPageComponent {
  constructor(private pubService:PublicationService,private router:Router){}
  ngOnInit(){
    this.countrySelectedA=this.pubService.country;
    this.categorySelected=this.pubService.category;
    this.city=this.pubService.region;
    this.getPub();
    console.log(this.getPub());
  }
publications:any;
  getPub(){
    this.pubService.retreivePubByCountryAndCityAndCategory(this.countrySelectedA,this.city,this.categorySelected,1,9).
    subscribe((data)=>{this.publications=data;});
  }

    city!:any;
    categorySelected!:any;
    catgeroySeleted(category:String){
        if(category=="Product"){
           this.categorySelected=category;
           this.getPub();
        }
        else if(category=="Foods"){
          this.categorySelected=category;
          this.getPub();
        }
        else if(category=="Services"){
          this.categorySelected=category;
          this.getPub();
        }
        else if(category=="Clothes"){
          this.categorySelected=category;
          this.getPub();
        }
    }
    countrySelectedA!:any;
    countrySelected(country:String){
      if(country=="Chile"){
        this.countrySelectedA=country;
        this.getPub();
     }
     else if(country=="Argentina"){
       this.countrySelectedA=country;
       this.getPub();
     }
    }
     pubDetail(idPub:number){
          this.router.navigate(['/home/Pub/detail',idPub]);
    }
}
