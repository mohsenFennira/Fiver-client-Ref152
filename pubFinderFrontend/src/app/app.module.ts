import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./login/register/register.component";
import { WelcomeRegisterComponent } from "./login/welcome-register/welcome-register.component";
import { ConfirmationComponent } from "./login/confirmation/confirmation.component";
import { ForgotPasswordComponent } from "./login/forgot-password/forgot-password.component";
import { ChangePasswordComponent } from "./login/change-password/change-password.component";
import { AddUserFromAdminSideComponent } from "./admin/modules/backoffice/add-user-from-admin-side/add-user-from-admin-side.component";
import { GetUsersComponent } from "./admin/modules/backoffice/get-users/get-users.component";
import { ProfileAdminComponent } from "./admin/modules/backoffice/profile-admin/profile-admin.component";
import { EditProfileComponent } from "./admin/modules/backoffice/edit-profile/edit-profile.component";
import { LoginComponent } from "./login/login/login.component";
import { HomeComponent } from "./client/modules/home/home.component";
import { ListPostToAdminComponent } from "./admin/modules/backoffice/list-post-to-admin/list-post-to-admin.component";
import { ViewMyPubSellerComponent } from "./admin/modules/seller/view-my-pub-seller/view-my-pub-seller.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { DefaultModule } from "./admin/layouts/default/default.module";
import { DefaultClientModule } from "./client/layouts/default-client/default-client.module";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AddPubBySellerComponent } from './admin/modules/seller/add-pub-by-seller/add-pub-by-seller.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";
import { PubPageComponent } from './client/modules/pub-page/pub-page.component';
import { AuthGuard } from "./_auth/auth.guard";
import { AuthInterceptor } from "./_auth/auth.interceptor";
import { PubDetailComponent } from './client/modules/pub-detail/pub-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    WelcomeRegisterComponent,
    ConfirmationComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    GetUsersComponent,
    AddUserFromAdminSideComponent,
    ProfileAdminComponent,
    EditProfileComponent,
    LoginComponent,
    HomeComponent,
    ListPostToAdminComponent,
    ViewMyPubSellerComponent,
    AddPubBySellerComponent,
    PubPageComponent,
    PubDetailComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    DefaultClientModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    ],
  providers: [
    AuthGuard,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


