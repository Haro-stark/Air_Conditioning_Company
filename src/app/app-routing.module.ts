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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignupComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardGuard],
    children: [
      { path: 'employees', component: EmployeesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'budgets', component: BudgetsComponent },
      { path: 'workLog', component: WorklogComponent },
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
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationService],
})
export class AppRoutingModule {}
