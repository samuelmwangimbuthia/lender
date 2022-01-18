import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from "rxjs";
import {catchError, map, tap} from 'rxjs/operators'
import { Playlist } from "./playlist";


@Injectable({
  providedIn: "root",
})
export class PlaylistService {
  private playListUrl = "https://reqres.in/api/users";

  constructor(private http: HttpClient) {}

  getPlaylist():Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.playListUrl ).pipe(
      map((response) => <Playlist[]>response),
      catchError(this.handleError),
    );
}

private handleError(err:HttpErrorResponse){
  let errorMessage = '';
  if (err.error instanceof ErrorEvent){
    errorMessage = `An error occurred: ${err.error.message}`
  }else {
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage)
}

}
