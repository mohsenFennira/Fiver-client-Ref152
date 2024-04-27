import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthConfigService } from '../service/auth-config.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  constructor(private router: Router,private authConfig:AuthConfigService,private r:ActivatedRoute) {}
  verifcode!:number;
  ngOnInit() {
    // Redirect to login page after 5 seconds
    this.r.params.subscribe(params => {
      this.verifcode = params['verificationCode'];
    });
    this.authConfig.validateAccount(this.verifcode).subscribe((data=>{console.log(data)}));
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000);
}
}
