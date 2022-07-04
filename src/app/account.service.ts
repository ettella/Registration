import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Account } from './account.model';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  errorMessage = new Subject<string>();  //observable !

  constructor(private http: HttpClient) {}

  addNewAccount(account: Account) {
    
    let parameters = new HttpParams();
     parameters = parameters.append('tomorrow','tuesday');

    this.http
    .post<{name: string }>
    ('https://ng-http-login-default-rtdb.europe-west1.firebasedatabase.app/account.json', 
    account, {
                  headers: new HttpHeaders({'My-message-is':'Helloo!', 'Another-message':'Fantastic'}),
                  params: parameters,
                  //new HttpParams().set('day', 'monday')
                  observe: 'response'

    })
    .subscribe(response => {console.log(response);}, 
    (error: HttpErrorResponse) => {
      this.errorMessage.next(error.error.error);
    } );
  }


  fetchAllAccount() {
    return this.http.get<{[key: string]: Account}>('https://ng-http-login-default-rtdb.europe-west1.firebasedatabase.app/account.json')
    .pipe(
      map( (response: any) => {
      let responseCredentials: Array<Account> = [];
      
      for(let key in response) {
        if(response.hasOwnProperty(key) ) {
            responseCredentials.push( { ...response[key], id: key});
          }
        }
      return responseCredentials;
      }),
      catchError((error:HttpErrorResponse) => {
        //console.log(error);
        return throwError(error.error.error);
      })
      );
  }


  deleteAllCredentials() {
      return this.http.delete('https://ng-http-login-default-rtdb.europe-west1.firebasedatabase.app/account.json',
      {
        observe: 'events',
        responseType: 'text'
      }).pipe(
            tap( response => { console.log(response); //null értéket fog adni
            if( response.type === HttpEventType.Sent ) {
              console.log(response.type);
            } //enum type
            })
      );
  }
}


