import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditreservationService } from '../services/editreservation.service';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {

  resID;
  token;
  name;
  time;

  constructor(private activatedRoute: ActivatedRoute, private editreservation: EditreservationService) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      this.name = params['name'];
      this.time = params['time'];
      this.resID = params['id']
  });
  }

  ngOnInit(): void {
  }

  deleteReservation(){
    this.editreservation.deleteReservation(this.resID, this.token).subscribe((data) => {
      console.log(data);
    });
  }

}
