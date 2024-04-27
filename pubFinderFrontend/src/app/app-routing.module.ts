import { NgModule } from '@angular/core';
import { DefaultComponent } from './admin/layouts/default/default.component';
import { DashboardComponent } from './admin/modules/dashboard/dashboard.component';
import { RegisterComponent } from './login/register/register.component';
import { WelcomeRegisterComponent } from './login/welcome-register/welcome-register.component';
import { ConfirmationComponent } from './login/confirmation/confirmation.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { GetUsersComponent } from './admin/modules/backoffice/get-users/get-users.component';
import { AddUserFromAdminSideComponent } from './admin/modules/backoffice/add-user-from-admin-side/add-user-from-admin-side.component';
import { ProfileAdminComponent } from './admin/modules/backoffice/profile-admin/profile-admin.component';
import { EditProfileComponent } from './admin/modules/backoffice/edit-profile/edit-profile.component';
import { DefaultClientComponent } from './client/layouts/default-client/default-client.component';
import { HomeComponent } from './client/modules/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { ListPostToAdminComponent } from './admin/modules/backoffice/list-post-to-admin/list-post-to-admin.component';
import { ViewMyPubSellerComponent } from './admin/modules/seller/view-my-pub-seller/view-my-pub-seller.component';
import { RouterModule, Routes } from '@angular/router';
import { AddPubBySellerComponent } from './admin/modules/seller/add-pub-by-seller/add-pub-by-seller.component';
import { PubPageComponent } from './client/modules/pub-page/pub-page.component';
import { AuthGuard } from './_auth/auth.guard';
import { ForbiddenComponent } from './admin/shared/components/forbidden/forbidden.component';
import { RoleType } from './Models/enum/RoleType';
import { PubDetailComponent } from './client/modules/pub-detail/pub-detail.component';
import { SpinnerComponent } from './admin/shared/components/spinner/spinner.component';

const routes: Routes = [

  {
    path: 'home',component:DefaultClientComponent,
    children: [
      {
        path:'' ,
        component:HomeComponent,
      },
      {
        path:'Pub' ,
        component:PubPageComponent,
      },
      {
        path:'Pub/detail/:idPub' ,
        component:PubDetailComponent,
      },
    ]
  },
  {
    path: 'seller',component:DefaultComponent,canActivate:[AuthGuard],data:{roles:RoleType.SELLER},
    children: [
      {
        path:'myPub' ,
        component:ViewMyPubSellerComponent,
      },
      {
        path:'addMyPub' ,
        component:AddPubBySellerComponent,
      },
      {
        path:'profile' ,
        component:ProfileAdminComponent,
      },
      {
        path:'profile/editProfile/:idUser' ,
        component:EditProfileComponent,
      },

    ]

},

  {
        path: 'admin',component:DefaultComponent,canActivate:[AuthGuard],data:{roles:RoleType.ADMIN},
        children: [
          {
            path:'' ,
            component:DashboardComponent,
          },
          {
            path:'users' ,
            component:GetUsersComponent,
          },
          {
            path:'addUser' ,
            component:AddUserFromAdminSideComponent,
          },
          {
            path:'profile' ,
            component:ProfileAdminComponent,
          },
          {
            path:'profile/editProfile/:idUser' ,
            component:EditProfileComponent,
          },
          {
            path:'posts' ,
            component:ListPostToAdminComponent,
          },



        ]

  },
  {
    path:'login',component:LoginComponent,
  },
  {
    path:'register',component:RegisterComponent,
  },
  {
    path:'welcome',component:WelcomeRegisterComponent,
  },
  {
    path:'confirmation/:verificationCode',component:ConfirmationComponent,
  },
  {
    path:'forgotPassword',component:ForgotPasswordComponent,
  },
  {
    path:'changePassword/:verificationCode',component:ChangePasswordComponent,
  },
  {
    path:'forbidden',component:ForbiddenComponent,
  },
  {
    path:'spineer',component:SpinnerComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
