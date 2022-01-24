import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin/admin.component';
import { AssistantComponent } from './assistant/assistant.component';
import { OfficerComponent } from './officer/officer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeesComponent } from './employees/employees.component';
import { OrdersComponent } from './orders/orders.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ProductsComponent } from './products/products.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { WorklogComponent } from './worklog/worklog.component';
import { HttpClientModule } from '@angular/common/http';
import { UserRoleDirective } from './directives/user-role.directive';
import { UserDirective } from './directives/user.directive';

@NgModule({
  declarations: [AppComponent, AuthenticationComponent, LoginComponent, SignupComponent, HomeComponent, AdminComponent, AssistantComponent, OfficerComponent, SidebarComponent, EmployeesComponent, OrdersComponent, SuppliersComponent, ProductsComponent, BudgetsComponent, WorklogComponent, UserRoleDirective, UserDirective],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbModule,
    HttpClientModule
  ],
  exports: [
    UserDirective,
    UserRoleDirective
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
