import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditreservationService {

  constructor(private http: HttpClient) { }

  deleteReservation(id, token){
    const headers = new HttpHeaders({'Authorization': "Bearer " + token});
    return this.http.delete("http://berlin-fn.de:8080/reservation/"+id, {
      headers: headers
    });
  }

}
