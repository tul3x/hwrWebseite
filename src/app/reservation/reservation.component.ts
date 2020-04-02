import { Component, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {

  tableOptions;
  starttime;
  reservations;
  reqStarttime;
  reservationsIds;
  tableOptionsPreload;
  tableSelected;

  tableClickCounter;

  resName;
  resDate;
  resTime;

  constructor(private tableService: TableService) { 

  this.tableClickCounter = new Array<{id,count}>();

  this.resName = "SuperRest";

  this.starttime = this.getCurrentTime();
  this.reqStarttime = this.convertStarttime(this.starttime);

  this.tableService.getTables().subscribe((data)=>{
    this.tableOptionsPreload = data;
    this.tableService.getReservations(this.reqStarttime).subscribe((data) => {
      this.reservations = data;
      this.reservationsIds = this.getReservationsIds(this.reservations)
      this.tableOptionsPreload.forEach((element, i) => {
        if (this.reservationsIds.includes(element.id)){
          
          this.tableOptionsPreload[i].reserved = true;
          
        } else {
          this.tableOptionsPreload[i].reserved = false;
        }
      });
      this.tableOptions = this.tableOptionsPreload;
    }, (err) => {
    });
  }, (err) => {
  });
}

  getChildDatetime(datetime: string): void{
    console.log("Received child's datetime: " + datetime);
    var datetimeArr = datetime.split(" ");
    this.resDate = datetimeArr[1] + "." + datetimeArr[0] + ".";
    this.resTime = datetimeArr[2] + ":" + datetimeArr[3] + " Uhr";
  }

  getResIds(resids: Array<String>): void{
    this.reservationsIds = resids;
  }

  getReservationsIds(reservations){
    var resIds = [];
    reservations.forEach(element => {
      resIds.push(element.tableid);
    });
    
    return resIds;
  }

  convertStarttime(starttime:string){
    return starttime.replace(" ", "T") + ".000Z";
  }

  getCurrentTime(){
    var dateObj = new Date();
    //month = this.monthNames[this.dateObj.getMonth()];
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
    this.resDate = `${day}.${month}.`;
    this.resTime = `${hour}:${minutes} Uhr`;
    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
  }

  tableClicked(tableID){
    var tableArrIndex = this.tableClickCounter.findIndex(x => x.id == tableID);
    if (tableArrIndex == -1){
      if (!(this.reservationsIds.includes(tableID))){
        this.tableClickCounter.push({id: tableID, count: 1});
        this.tableSelected = true;
      }
    } else {
      this.tableClickCounter[tableArrIndex].count += 1;
      this.tableSelected = false;
      this.tableClickCounter.forEach(elem => {
        if (elem.count%2 != 0){
          this.tableSelected = true;
        }
      })
    }
  }

  ngOnInit(): void {
  }

  

}
