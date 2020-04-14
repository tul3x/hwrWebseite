import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ResSuccessComponent } from './res-success/res-success.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'editReservation', component: EditReservationComponent},
  { path: 'impressum', component: ImpressumComponent},
  { path: 'resSuccess', component: ResSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }