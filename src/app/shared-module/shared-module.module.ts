import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteNavigationComponent } from '../site-navigation/site-navigation.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { userRoutes } from '../data/user/user.routes';
import { UserProfileComponent } from '../data/user-profile/user-profile.component';
import { LoginComponent } from '../data/login/login.component';




@NgModule({
  declarations: [
    SiteNavigationComponent,
    UserProfileComponent,
    LoginComponent

  ],

  exports:[
    SiteNavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    ReactiveFormsModule

  ],
})
export class SharedModuleModule { }
