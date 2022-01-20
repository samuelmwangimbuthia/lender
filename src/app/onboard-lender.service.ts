import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import {catchError} from 'rxjs/operators';
import { Lender } from './lender';

@Injectable({
  providedIn: 'root'
})
export class OnboardLenderService {
lendersUrl = 'https://api-m.sandbox.paypal.com';
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'A21AAJ1XsBokwEnqmupbN8c9ZFZ59L9fQwKfy1mQnzn869vuT15Mr9GSAEeD9Ll5ikGCxXhtVbi-zSBzfrXd3nK4ft6jlwpJg'
  })
};

  constructor(private http: HttpClient) { }
  /** POST: onboard a new lender */
onboardLender(lender: Lender) {
  return this.http.post(this.lendersUrl, lender, this.httpOptions)
    .pipe(
      
      catchError(this.handleError)
      );
}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
