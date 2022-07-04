import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Account } from './account.model';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  credentials: Array<Account> = []; //volt posztok
  loading: boolean = false;
  errorMessage: string ='';
  private errorSub: Subscription = new Subscription //observable
  
  constructor(private http: HttpClient, private accountService: AccountService) {}

  ngOnInit(): void {
    this. errorSub = this.accountService.errorMessage.subscribe( error => { //observable
      this.errorMessage = error;
    })
    this.fetchCredentials();
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }


  addNewCredential(form: NgForm) {
    const adatok = form.value;
    //const newAccount: Account = ;
    this.accountService.addNewAccount({firstName: adatok.firstName, lastName: adatok.lastName, password01: adatok.passworld01, password02: adatok.passworld02, email: adatok.email})
   
  }


  private fetchCredentials() { //async műv.

      this.loading = true;

      this.accountService.fetchAllAccount()
      .subscribe(
        adatok => {
          this.credentials = adatok;
          this.errorMessage = '';
          this.loading = false;
          }, error => {
            this.errorMessage = error;
            this.loading = false;
          } );

         
    }


  getCredentials() {
    this.fetchCredentials();
    //console.log(this.credentials);
  }

  deleteCredentials() {
    this.accountService.deleteAllCredentials().subscribe( () => {
        this.credentials = [];
    });
  }

}
