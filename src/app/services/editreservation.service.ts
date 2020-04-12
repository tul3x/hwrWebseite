import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from './reservation.service';

@Injectable({
  providedIn: 'root'
})
export class EditreservationService {

  constructor(private http: HttpClient) { }

  deleteReservation(id, token){
    const headers = new HttpHeaders({'Authorization': "Bearer " + token});
    return this.http.delete("https://hwrrestapi.berlin-fn.de/reservation/"+id, {
      headers: headers,
      observe: 'response'
    });
  }

  updateReservation(id, token, reservation: ChangedReservation): Observable<ChangedReservation>{
    const headers = new HttpHeaders({'Authorization': "Bearer " + token});
    if (reservation.tableid != -1){
      return this.http.put<ChangedReservation>("https://hwrrestapi.berlin-fn.de/reservation/" + id, reservation, {
        headers: headers
      });
    } else {
      return this.http.put<ChangedReservation>("https://hwrrestapi.berlin-fn.de/reservation/" + id, {name: reservation.name}, {
        headers: headers
      });
    }
    
  }

}

class ChangedReservation{
  starttime: String; 
  name: String; 
  tableid: number;
}
