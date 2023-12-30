import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: '', redirectTo: '/signIn', pathMatch: 'full' },
  { path: 'signIn', component: SignInComponent },
  { path: 'daily', component: MainPageComponent, canActivate: [AuthGuard] },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
