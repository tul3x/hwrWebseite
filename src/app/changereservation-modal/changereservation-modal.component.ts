import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../services/table.service';
import { EditreservationService } from '../services/editreservation.service';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-changereservation-modal',
  templateUrl: './changereservation-modal.component.html',
  styleUrls: ['./changereservation-modal.component.css']
})
export class ChangereservationModalComponent implements OnInit {

  isVisible = false;
  isOkLoading = false;

  tableClickCounter;
  reservedTables;
  tableSelected = false;
  nameChanged = false;

  tableOptions;
  tableOptionsPreload;
  reservations;
  reservationsIds;

  resDate;
  resTime;
  inputname;

  @Input()
  reqStarttime;

  @Input()
  name;

  @Input()
  resID;

  @Input()
  token;

  @Input()
  mail;

  starttime;

  constructor(private tableService: TableService, private editreservation: EditreservationService, private reservationService: ReservationService) {  

    
  }

  ngOnInit(): void {

    console.log(this.reqStarttime);
    this.starttime = this.convReqToStarttime(this.reqStarttime);

    this.tableClickCounter = new Array<{id,count}>();
    this.reservedTables = new Array<number>();
  
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

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.updateReservation();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  nameinputChanged(){
    if ((this.inputname != this.name) && (this.inputname != "")){
      this.nameChanged = true;
    } else {
      this.nameChanged = false;
    }
  }

  getNewNotify(emitelem): void{
    if (typeof emitelem == "string"){
      var datetimeArr = emitelem.split(" ");
      this.resDate = datetimeArr[1] + "." + datetimeArr[0] + ".";
      this.resTime = datetimeArr[2] + ":" + datetimeArr[3] + " Uhr";
      this.reqStarttime = datetimeArr[5]+"-"+datetimeArr[0]+"-"+datetimeArr[1]+"T"+datetimeArr[2]+":"+datetimeArr[3]+":"+datetimeArr[4]+".000Z"
    } else {
      this.reservationsIds = emitelem;

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

  getClickedTable(tableID){    
    var tableArrIndex = this.tableClickCounter.findIndex(x => x.id == tableID);
    if (tableArrIndex == -1){
      if (!(this.reservationsIds.includes(tableID))){
        this.tableClickCounter.push({id: tableID, count: 1});
        this.reservedTables.push(tableID);
        this.tableSelected = true;
      }
    } else {
      this.tableClickCounter[tableArrIndex].count += 1;
      this.tableSelected = false;
      this.tableClickCounter.forEach(elem => {
        if (elem.count%2 != 0){
          this.tableSelected = true;
        } else {
          this.reservedTables.splice(this.reservedTables.indexOf(elem.id), 1);
        }
      })
    }
  }

  updateReservation() {
    
    if (this.reservedTables.length == 1){
        const reservation = {
          starttime: this.reqStarttime,
          name: isInputName ? this.inputname : this.name,
          tableid: this.reservedTables[0]
        }
        this.editreservation.updateReservation(this.resID, this.token, reservation).subscribe((response) => {
          console.log(response);
        }, (err) => {
          console.log(err);
          
        });
    }   else {
      var first = true;
      var isInputName = false;
      if (this.inputname != ""){
        isInputName = true;
      }
      this.reservedTables.forEach(element => {
        if (first != true){
          const reservation = {
            starttime: this.reqStarttime,
            name: isInputName ? this.inputname : this.name,
            tableid: element,
            mail: this.mail
          }
          this.reservationService.createReservation(reservation).subscribe((data) => {
            this.isOkLoading = false;
            this.isVisible = false;
          }, (err) => {
            console.log(err);
          });
        } else {
          const reservation = {
            starttime: this.reqStarttime,
            name: isInputName ? this.inputname : this.name,
            tableid: element
          }
          this.editreservation.updateReservation(this.resID, this.token, reservation).subscribe((response) => {
            console.log(response);
            
          }, (err) => {
            console.log(err);
          });
        }
        first = false;
      });
      
    } 
    
  }

  convReqToStarttime(reqTime: string){
    
    var dateintime = reqTime.slice(0,10) + " " + reqTime.slice(11,19);
    return dateintime;
  }

}
