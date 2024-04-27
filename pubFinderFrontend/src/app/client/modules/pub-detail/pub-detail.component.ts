import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationService } from '../service/publication.service';
import { Publication } from '../../../Models/Publication';

@Component({
  selector: 'app-pub-detail',
  templateUrl: './pub-detail.component.html',
  styleUrl: './pub-detail.component.css'
})
export class PubDetailComponent {
  constructor(private r:ActivatedRoute,private router:Router,private pubService:PublicationService){}
  ngOnInit(){
    this.r.params.subscribe(params => {
      this.idPub = params['idPub'];
    });
    this.getPublicationWithId(this.idPub);
  }
  pub!:Publication;
  idPub!:number;
  getPublicationWithId(idPub:number){
    this.pubService.getPublicationWithId(idPub).subscribe((data)=>{this.pub=data});

   }
}
