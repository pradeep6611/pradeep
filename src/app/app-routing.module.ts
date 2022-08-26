import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'quizDashboard',
  //   loadChildren: () => import('./app.module').then(m => m.AppModule),
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./app.module').then(m => m.AppModule),
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
