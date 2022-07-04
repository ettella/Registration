import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //HTTP_INTERCEPTORS 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ //{
    // provide: HTTP_INTERCEPTORS,
    // //useClass: AuthInterceptorService,
    // multi: true
  //}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
