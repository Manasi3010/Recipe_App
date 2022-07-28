import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuisineComponent } from './Component/cuisine/cuisine.component';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { ViewComponent } from './Component/view/view.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cuisine/:cuisineType', component: CuisineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
