import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DailyToDoComponent } from './components/daily-to-do/daily-to-do.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { NewToDoListItemDialogComponent } from './components/new-to-do-list-item-dialog/new-to-do-list-item-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DailyToDoComponent,
    NewToDoListItemDialogComponent,
    MainPageComponent,
    NavbarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
      maxOpened: 5,
    }),
    AuthModule.forRoot(
      {
        ...environment.auth0,
        httpInterceptor: {
          allowedList: [
            {
              uri: `${environment.personalAssistantApi.personalAssistantApiRoot}*`,
              tokenOptions: {
                authorizationParams: {
                  audience: environment.auth0.authorizationParams.audience,
                  scope: environment.auth0.authorizationParams.scope
                }
              }
            }
          ]
        }
      }
    ),
  ],
  exports: [
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
