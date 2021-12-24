import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from '../components/customer/customer.component';
import { AdminComponent } from '../components/admin/admin.component';
import { AdminGuard } from '../guards/admin.guard';
import { CustomerGuard } from '../guards/customer.guard';

const routes: Routes = [
    { path: "home", loadChildren: "./home.module#HomeRoutingModule"},
    { path: "customer", canActivate: [CustomerGuard], component: CustomerComponent},
    { path: "admin", canActivate: [AdminGuard], component: AdminComponent},
    { path: "", redirectTo: "home", pathMatch: "full" }, // pathMatch = התאמת המחרוזת הריקה לכלל הנתיב
    // { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes) // Importing the above routes
  ]
  })
export class RoutingModule {}
