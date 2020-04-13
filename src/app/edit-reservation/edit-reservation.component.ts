import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditreservationService } from '../services/editreservation.service';
import { Reservation } from '../services/reservation.service';
import { Router } from '@angular/router';

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
  tableId = -1;
  newTime;
  mail;
  typeTime
  condi = false;

  router;

  constructor(private activatedRoute: ActivatedRoute, private editreservation: EditreservationService, private Router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      this.name = params['name'];
      this.time = params['time'];
      this.resID = params['id'];
      this.mail = params['mail'];
    });
    this.typeTime = typeof this.time;
    this.condi = this.typeTime=='undefined' ? false : true;
    console.log(this.time);
    
    this.router = Router;
  }

  ngOnInit(): void {
    
  }

  deleteReservation() {
    this.editreservation.deleteReservation(this.resID, this.token).subscribe((response) => {
      if (response.status == 200) {
        alert("delete success");
        this.router.navigateByUrl('/reservation');
      }
    }, (err) => {
      if (err.status == 401) {
        alert("Ungültiger Token.")
        this.router.navigateByUrl('/reservation');
      }
      else
        alert("Beim Löschen der Reservierung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
        this.router.navigateByUrl('/reservation');
    });
  }

}
