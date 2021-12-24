import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/home/login/login.component';
import { RegisterComponent } from '../components/home/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from '../components/home/about/about.component';
import { ShopTransitionComponent } from '../components/home/shop-transition/shop-transition.component';
import { HomeComponent } from '../components/home/home.component';
import { VisitorGuard } from '../guards/visitor.guard';
import { CustomerGuard } from '../guards/customer.guard';

const routes: Routes = [
  {
    path: "home", component: HomeComponent, children: [
      { path: "login", canActivate: [VisitorGuard], component: LoginComponent },
      { path: "register", canActivate: [VisitorGuard], component: RegisterComponent },
      { path: "shop", canActivate: [CustomerGuard], component: ShopTransitionComponent },
      { path: "", redirectTo: "login", pathMatch: "full" }
    ]
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ShopTransitionComponent,
    AboutComponent
  ],
  imports: [
    FormsModule, ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes) // Importing the above routes
  ]
})
export class HomeRoutingModule { }
