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

const appRoutes:Routes = [
  {path: 'market', component: MarketPlaceComponent},
  {path: 'home', component: WelcomePageComponent},
  {path: 'start', component:StartLendingComponent},
  {path: '', redirectTo: 'market', pathMatch: 'full'},

]


@NgModule({
  declarations: [
    AppComponent,
    MarketPlaceComponent,
    SiteNavigationComponent,
    WelcomePageComponent,
    StartLendingComponent,
    OnboardLenderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
