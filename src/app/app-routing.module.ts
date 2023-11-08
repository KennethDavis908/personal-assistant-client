import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DailyToDoComponent } from './components/daily-to-do/daily-to-do.component';

const routes: Routes = [
  { path: '', redirectTo: '/daily-to-do', pathMatch: 'full' },
  { path: 'daily-to-do', component: DailyToDoComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
