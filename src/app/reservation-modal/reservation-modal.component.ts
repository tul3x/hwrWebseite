import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css']
})

export class ReservationModalComponent implements OnInit {

  @Input()
  resname;

  @Input()
  resdate;

  @Input()
  restime;

  @Input()
  starttime;

  @Input()
  tableids;

  constructor(private reservationService: ReservationService) {  }

  ngOnInit(): void {
  }

  isVisible = false;
  isOkLoading = false;
  username: string;
  usermail: string;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.username.length != 0 && this.usermail.length != 0){
      this.isOkLoading = true;

      this.tableids.forEach(element => {
        
        const reservation = {
          starttime: this.starttime,
          name: this.username,
          mail: this.usermail,
          tableid: element
        }
  
        this.reservationService.createReservation(reservation).subscribe((data) => {
          console.log(data);
          this.isOkLoading = false;
          this.isVisible = false;
        }, (err) => {
          console.log(err);
        });

      });
      
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}

