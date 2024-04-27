import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthConfigService } from '../../../../login/service/auth-config.service';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../../../Models/User';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrl: './profile-admin.component.css'
})
export class ProfileAdminComponent {
  constructor(private authConfigUser:AuthConfigService, @Inject(PLATFORM_ID) private platformId: Object){}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Only call getUserInSession if in the browser environment
      this.getUseerInSession();
    }
  }
   user!: User;

  getUseerInSession() {
    this.authConfigUser.getUserByToken().subscribe((data) => {
      this.user = data;console.log(data)
    });
  }
}
