import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { LendersOrBorrowers } from "./ILendersOrBorrowers";

@Injectable({
  providedIn: "root",
})
export class LenderOrBorrowersService {

 // private baseUrl = "http://reqres.in/api/users";

 private baseUrl = "http://localhost:8080/api/lenders";
 private offersUrl = "http://localhost:8080/offer/offers"

  constructor(private http: HttpClient) {}

//1. To populate the market place with all the users
  getLenderOrBorrower(): Observable<LendersOrBorrowers[]> {
    return this.http.get<LendersOrBorrowers[]>(this.baseUrl).pipe(
     tap ((response)=>console.log(response)),
      map((response) => <LendersOrBorrowers[]>response),
      catchError(this.handleError)
    );
  }

  // 2. To view details of a single offering

  getUser(id): Observable<LendersOrBorrowers[]> {
     const url = `${this.baseUrl}/${id}`;
    //const url = `${this.baseUrl}?id=${id}`; TO DO:
    return this.http.get<LendersOrBorrowers[]>(url).pipe(
      tap ((response)=>console.log(response)),
      map((response) => <LendersOrBorrowers[]>response),
      catchError(this.handleError)
    );
  }

  //3. PUT : To update user data
  // pass in the user to be updated
  //TO DO : update status for the accepted offers
  updateUser(user): Observable<LendersOrBorrowers> {
    const url = `${this.baseUrl}/${user._id}`;
    console.log(user.id)
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.put<LendersOrBorrowers>(url,user, { headers: headers}).pipe(
      tap(()=>console.log('updateUser: '+ JSON.stringify(user))),
      map(()=>user)
    );
  }
  //4. POST : To create a new user
  createUser(user): Observable<LendersOrBorrowers[]> {
    const headers = new HttpHeaders({'Content-Type':'application/json'});
   // user.id = null;
    return this.http.post<LendersOrBorrowers[]>(this.baseUrl,user, { headers: headers}).pipe(
      tap((user)=>console.log('createUser: '+ JSON.stringify(user))),
      map(()=>user)
      );
    }
    //5. Delete : TO Delete User
    // TO DO: shall delete offers
    deleteUser(id): Observable<{}> {
      const url = `${this.baseUrl}/${id}`;
      const headers = new HttpHeaders({'Content-Type':'application/json'});
      return this.http.delete<LendersOrBorrowers[]>(url, { headers: headers})
    }

    //6. To populate the market place with all the offers
  getOffers(): Observable<LendersOrBorrowers[]> {
    return this.http.get<LendersOrBorrowers[]>(this.offersUrl).pipe(
     tap ((response)=>console.log(response)),
      map((response) => <LendersOrBorrowers[]>response),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  private initializeUser(): LendersOrBorrowers {
    // Return an initialized object
    return {

      id: null,
      first_name: null,
      last_name: null,
      avatar: null,
      email: null,
    };
  }
}
