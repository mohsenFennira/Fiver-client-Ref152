import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    DefaultComponent ,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatPaginatorModule


  ]
})
export class DefaultModule { }
