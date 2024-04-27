import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../admin/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DefaultClientComponent } from './default-client.component';
import { HomeComponent } from '../../modules/home/home.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DefaultClientComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class DefaultClientModule { }
