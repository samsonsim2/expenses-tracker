import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './components/home/home.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MonthlyTransactionComponent } from './components/monthly-transaction/monthly-transaction.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { CategoryComponent } from './components/category/category.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { NgxColorsModule } from 'ngx-colors';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';

// import { BarChartsComponent } from './components/bar-charts/bar-charts.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MonthSelectionComponent } from './components/month-selection/month-selection.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ChartsComponent } from './components/charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    HomeComponent,
    RegisterComponent,
    LogoutComponent,
    DashboardComponent,
    MonthlyTransactionComponent,
    UserProfileComponent,
    CategoryComponent,
    CategoryCardComponent,
    TransactionFormComponent,
    TransactionCardComponent,
    LoginPageComponent,
    DashboardPageComponent,
    LandingPageComponent,
    SettingsPageComponent,
    LoginModalComponent,
     TransactionsPageComponent,
     MonthSelectionComponent,
     PaginationComponent,
     ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule,
    MatDividerModule,
    MatSidenavModule,
    MatSelectModule,
    HttpClientModule,
    NgxColorsModule,
    NgxChartsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
