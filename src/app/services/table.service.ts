import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  getTables(){
    this.http.get("http://localhost:8080/tables")
  }

  getReservations(time){

  }
}
