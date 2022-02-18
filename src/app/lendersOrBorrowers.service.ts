import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { LendersOrBorrowers } from "./ILendersOrBorrowers";

@Injectable({
  providedIn: "root",
})
export class LenderOrBorrowersService {

  private baseUrl = "http://reqres.in/api/users";

  constructor(private http: HttpClient) {}

//1. To populate the market place with all the users
  getLenderOrBorrower(): Observable<LendersOrBorrowers[]> {
    return this.http.get<LendersOrBorrowers[]>(this.baseUrl).pipe(
      map((response) => <LendersOrBorrowers[]>response),
      catchError(this.handleError)
    );
  }

  // 2. To view details of a single offering

  getUser(id: number): Observable<LendersOrBorrowers[]> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<LendersOrBorrowers[]>(url).pipe(
      map((response) => <LendersOrBorrowers[]>response),
      catchError(this.handleError)
    );
  }

  //3. PUT : To update user data
  //TO DO : update status for the accepted offers
  updateUser(user:LendersOrBorrowers): Observable<LendersOrBorrowers> {
    const url = `${this.baseUrl}/${user.id}`;
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.put<LendersOrBorrowers>(url,user, { headers: headers}).pipe(
      tap(()=>console.log('updateUser: '+ JSON.stringify(user))),
      map(()=>user)
    );
  }
  //4. POST : To create a new user
  createUser(user): Observable<LendersOrBorrowers[]> {
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    user.id = null;
    return this.http.post<LendersOrBorrowers[]>(this.baseUrl,user, { headers: headers}).pipe(
      tap((user)=>console.log('createUser: '+ JSON.stringify(user))),
      map(()=>user)
      );
    }
    //5. Delete : TO Delete User
    // TO DO: shall delete offers
    deleteUser(id:number): Observable<{}> {
      const url = `${this.baseUrl}/${id}`;
      const headers = new HttpHeaders({'Content-Type':'application/json'});
      return this.http.delete<LendersOrBorrowers[]>(url, { headers: headers})
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
      id: 0,
      first_name: null,
      last_name: null,
      avatar: null,
      email: null,
    };
  }
}
