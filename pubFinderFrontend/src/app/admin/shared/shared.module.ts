import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderFrontComponent } from './components/header-front/header-front.component';
import { SidebarFrontComponent } from './components/sidebar-front/sidebar-front.component';
import { RightSideBarFrontComponent } from './components/right-side-bar-front/right-side-bar-front.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FooterHomeComponent } from './components/footer-home/footer-home.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    HeaderFrontComponent,
    SidebarFrontComponent,
    RightSideBarFrontComponent,
    ForbiddenComponent,
    SpinnerComponent,
    FooterHomeComponent
    ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent ,
    SidebarComponent,
    HeaderFrontComponent,
    SidebarFrontComponent,
    RightSideBarFrontComponent,
    SpinnerComponent,
    FooterHomeComponent

  ]
})
export class SharedModule { }
