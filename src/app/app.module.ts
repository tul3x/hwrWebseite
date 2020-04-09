import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TableComponent } from './table/table.component';
import{Router} from '@angular/router';
import { TableService } from './services/table.service';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, de_DE } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { DatetimepickerComponent } from './datetimepicker/datetimepicker.component';
import { ReservationModalComponent } from './reservation-modal/reservation-modal.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';

registerLocaleData(de);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReservationComponent,
    NavbarComponent,
    FooterComponent,
    TableComponent,
    DatetimepickerComponent,
    ReservationModalComponent,
    EditReservationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgZorroAntdModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [TableService, { provide: NZ_I18N, useValue: de_DE }],
  bootstrap: [AppComponent]
})
export class AppModule { constructor(router:Router){} }
