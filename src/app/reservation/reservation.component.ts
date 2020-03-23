import { Component, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  tableOptions;

  constructor(private tableService: TableService) { 

  this.tableService.getTables().subscribe((data)=>{
    console.log(data);
    this.tableOptions = data;
  }, (err) => {
    console.log(err);
  });
}

  ngOnInit(): void {
  }

}
