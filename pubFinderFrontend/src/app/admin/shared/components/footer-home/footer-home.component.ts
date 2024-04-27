import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-home',
  templateUrl: './footer-home.component.html',
  styleUrl: './footer-home.component.css'
})
export class FooterHomeComponent {
  constructor(private r:Router){}
  redirectToLogin(){
      this.r.navigate(['/login'])
  }
}
