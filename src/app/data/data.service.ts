import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSettings } from './user-settings';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 url = 'https://putsreq.com/K5mGEIrSVXlpmk07qx6l'
  constructor(private http:HttpClient) { }

  postUserSettingsForm(userSettings:UserSettings):Observable<any>{
    //return of(userSettings)
   return this.http.post(this.url, userSettings)
  }
}
