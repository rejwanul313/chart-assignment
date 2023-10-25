import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  
  { 
    path: '',
    component: ChartsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }