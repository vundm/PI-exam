import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppDetailsComponent } from './app-details/app-details.component';

const routes: Routes = [
 { path: '', component: DashboardComponent },
 { path: 'app/:id', component: AppDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
