import { Component } from '@angular/core';
import { RoleType } from '../../../../Models/enum/RoleType';
import { AuthConfigService } from '../../../../login/service/auth-config.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private authConfigUser:AuthConfigService){}
  role!:RoleType;
ngOnInit(){
  this.getUseerInSession();
}
  getUseerInSession() {
    this.authConfigUser.getUserByToken().subscribe((data) => {
      this.role = data.roleTypes;
    });
  }
  isSubmenuOpen: boolean = false;

  toggleSubmenu(): void {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }
}
