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
import { EmployeesComponent } from './admin/employees/employees.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { SuppliersComponent } from './admin/suppliers/suppliers.component';
import { ProductsComponent } from './admin/products/products.component';
import { BudgetsComponent } from './shared/budgets/budgets.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AdminComponent,
    AssistantComponent,
    OfficerComponent,
    SidebarComponent,
    EmployeesComponent,
    OrdersComponent,
    SuppliersComponent,
    ProductsComponent,
    BudgetsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
