import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin/admin.component';
import { AssistantComponent } from './assistant/assistant.component';
import { OfficerComponent } from './officer/officer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { WorklogComponent } from './worklog/worklog.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './admin/employees/employees.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { SuppliersComponent } from './admin/suppliers/suppliers.component';
import { ProductsComponent } from './admin/products/products.component';
import { BudgetsComponent } from './shared/budgets/budgets.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SupplierPurchasedHistoryComponent } from './admin/supplier-purchased-history/supplier-purchased-history.component';
import { UrlNotFoundComponent } from './url-not-found/url-not-found.component';
import { FilterCustomerPipe } from './pipes/filter-customer.pipe';

@NgModule({
  declarations: [
    AppComponent,
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
    WorklogComponent,
    AccessDeniedComponent,
    LoadingSpinnerComponent,
    SupplierPurchasedHistoryComponent,
    UrlNotFoundComponent,
    FilterCustomerPipe,
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
