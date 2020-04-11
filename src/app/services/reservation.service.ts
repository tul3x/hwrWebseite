import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {}

  createReservation(reservation: Reservation): Observable<Reservation>{
    return this.http.post<Reservation>("https://hwrrestapi.berlin-fn.de/reservation", reservation);
  }

}

export class Reservation{
    starttime: string;
    name: string;
    mail: string;
    tableid : number
}
