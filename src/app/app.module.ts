import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SiteNavigationComponent } from './site-navigation/site-navigation.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';
import { StartLendingComponent } from './start-lending/start-lending.component';
import { OnboardLenderComponent } from './onboard-lender/onboard-lender.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { SeeMoreComponent } from './see-more/see-more.component';
import { SingUpComponent } from './sing-up/sing-up.component';
//import { ButtonsModule } from 'ngx-bootstrap/buttons';

// Imports for loading & configuring the in-memory web api
// import {InMemoryWebApiModule} from 'angular-in-memory-web-api'
// import {UserData} from './userData'

const appRoutes:Routes = [
  {path: 'market', component: MarketPlaceComponent},
  {path: 'home', component: WelcomePageComponent},
  {path: 'start/:id', component:OnboardLenderComponent},
  {path: 'start', component:OnboardLenderComponent},
  {path: 'settings', component:UserSettingsComponent},
  {path: 'more/:id', component:SeeMoreComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},

]


@NgModule({
  declarations: [
    AppComponent,
    MarketPlaceComponent,
    SiteNavigationComponent,
    WelcomePageComponent,
    StartLendingComponent,
    OnboardLenderComponent,
    UserSettingsComponent,
    SeeMoreComponent,
    SingUpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,

    ReactiveFormsModule,
   // ButtonsModule
   //InMemoryWebApiModule.forRoot(UserData)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
