import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../services/table.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.css']
})
export class DatetimepickerComponent implements OnInit {

  onChange(result: Date): void {
   // console.log('Selected Time: ', result);
  }

  onOk(result: Date): void {
    if (result != null){
      console.log('onOk', result);
      var starttime =  this.convertStarttime(this.convertDateObj(result));
      console.log(starttime);
      
      this.tableService.getReservations(starttime).subscribe((data) => {
        var reservations = data;
        var reservationsIds = this.getReservationsIds(reservations);
        $('.table').each(function(i, currTable) {
          var chairs = currTable.parentElement.getAttribute("ng-reflect-seats-input");
          if (reservationsIds.includes(currTable.parentElement.getAttribute("ng-reflect-table-i-d"))){
            $(currTable).children(":first").attr("src", "assets/images/" + chairs + "tableRed.svg");
          } else {
            $(currTable).children(":first").attr("src", "assets/images/" + chairs + "tableGrey.svg");
          }
        });
      }, (err) => {
        console.log(err);
      });
    }
  }

  @Input()
  CurrentTime;

  tService; 

  constructor(private tableService: TableService) {
    this.tService = tableService;

   }

  ngOnInit(): void {
  }

  getReservationsIds(reservations){
    var resIds = [];
    reservations.forEach(element => {
      resIds.push(element.tableid.toString());
    });
    return resIds;
  }

  convertStarttime(starttime:string){
    return starttime.replace(" ", "T") + ".000Z";
  }

  convertDateObj(dateObj: Date){
    var month = (dateObj.getMonth() + 1).toString();
    if (month.length == 1){
      
      month = "0" + month;
    }
    var day = String(dateObj.getDate()).padStart(2, '0');
    if (day.length == 1){
      day = "0" + day;
    }
    var year = dateObj.getFullYear();
    var hour = dateObj.getHours().toString();
    if (hour.length == 1){
      hour = "0" + hour;
    }
    var minutes = dateObj.getMinutes().toString();
    if (minutes.length == 1){
      minutes = "0" + minutes;
    }
    var seconds = dateObj.getSeconds().toString();
    if (seconds.length == 1){
      seconds = "0" + seconds;
    }
    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
  }

}
