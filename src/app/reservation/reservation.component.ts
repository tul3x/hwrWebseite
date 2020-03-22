import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  tableOptions = [
    { id: 1, seats: 4 },
    { id: 2, seats: 6 },
    { id: 5, seats: 4},
    { id: 3, seats: 8 },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
