import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}

