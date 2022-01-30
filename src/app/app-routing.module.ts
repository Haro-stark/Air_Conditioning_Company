import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AdminComponent } from './admin/admin.component';
import { AssistantComponent } from './assistant/assistant.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AdminGuardGuard } from './cores/guards/admin-guard.guard';
import { AssistantGuardGuard } from './cores/guards/assistant-guard.guard';
import { OfficerGuardGuard } from './cores/guards/officer-guard.guard';
import { HomeComponent } from './home/home.component';
import { OfficerComponent } from './officer/officer.component';
import { WorklogComponent } from './worklog/worklog.component';
import { BudgetsComponent } from './shared/budgets/budgets.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductsComponent } from './admin/products/products.component';
import { SuppliersComponent } from './admin/suppliers/suppliers.component';
import { AuthenticationService } from './services/authentication.service';
import { SupplierPurchasedHistoryComponent } from './admin/supplier-purchased-history/supplier-purchased-history.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  {
    path: 'admin',
    redirectTo: 'admin/employees',
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardGuard],
    children: [
      { path: 'employees', component: EmployeesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'suppliersPurchasedHistory', component: SupplierPurchasedHistoryComponent },

      { path: 'budgets', component: BudgetsComponent },
      { path: 'workLog', component: WorklogComponent },
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
    ],
  },
  {
    path: 'officer',
    component: OfficerComponent,
    canActivate: [OfficerGuardGuard],
    children: [
      { path: 'budgets', component: BudgetsComponent },
      { path: 'workLog', component: WorklogComponent },
    ],
  },
  {
    path: 'assistant',
    component: AssistantComponent,
    canActivate: [AssistantGuardGuard],
    children: [{ path: 'workLog', component: WorklogComponent }],
  },

  {
    path: 'access-denied',
    component: LoginComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '404', component: LoginComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationService],
})
export class AppRoutingModule {}
