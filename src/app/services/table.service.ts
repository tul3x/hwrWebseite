import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  getTables(){
    return this.http.get("https://hwrrestapi.berlin-fn.de/table");
  }

  getReservations(starttime){
    return this.http.get("https://hwrrestapi.berlin-fn.de/reservation?starttime=" + starttime);
  }
}
