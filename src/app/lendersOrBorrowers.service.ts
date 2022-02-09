import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from "rxjs";
import {catchError, map, tap} from 'rxjs/operators';
import { LendersOrBorrowers } from "./ILendersOrBorrowers";



@Injectable({
  providedIn: "root",
})
export class LenderOrBorrowersService {
  // private lendersOrBorrowersUrl = "http://reqres.in/api/users";
  private lendersOrBorrowersUrl = "http://reqres.in/api/users";

  constructor(private http: HttpClient) {}

  getLenderOrBorrower():Observable<LendersOrBorrowers[]> {
    return this.http.get<LendersOrBorrowers[]>(this.lendersOrBorrowersUrl ).pipe(
      map((response) => <LendersOrBorrowers[]>response),
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
