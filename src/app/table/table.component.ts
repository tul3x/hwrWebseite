import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  seats: number | undefined;

  @Input()
  tableID: number;
  @Input()
  reserved: boolean;
  @Input()
  public set seatsInput(seats: number | undefined) {
    if (seats) {
      this.seats = seats;
      this.setTableOptions()
    }
  }
  

  public state = false;
  public image: string | undefined;
  public clickImage: string | undefined;

  constructor() {
  }

  ngOnInit() {
    this.pload("assets/images/4tableGreen.svg", 
    "assets/images/6tableGreen.svg", 
    "assets/images/8tableGreen.svg");
  }

  imgs = new Array();

  private pload(...args: any[]):void {
    for (var i = 0; i < args.length; i++) {
      this.imgs[i] = new Image();
      this.imgs[i].src = args[i];
    }
  }

  private setTableOptions(): void {
    console.log(this.reserved + " | " + this.seats);
    
    if (this.seats) {
      switch (this.seats) {
        case 4: {
          if (this.reserved){
            this.image = 'assets/images/4tableRed.svg';
            this.clickImage = 'assets/images/4tableRed.svg';
          } else {
            this.image = 'assets/images/4tableGrey.svg';
            this.clickImage = 'assets/images/4tableGreen.svg';
          }
          
          break;
        }
        case 6: {
          if (this.reserved){
            this.image = 'assets/images/6tableRed.svg';
            this.clickImage = 'assets/images/6tableRed.svg';
          } else {
            this.image = 'assets/images/6tableGrey.svg';
            this.clickImage = 'assets/images/6tableGreen.svg';
          }
          
          break;
        }
        case 8: {
          if (this.reserved){
            this.image = 'assets/images/8tableRed.svg';
            this.clickImage = 'assets/images/8tableRed.svg';
          } else {
            this.image = 'assets/images/8tableGrey.svg';
            this.clickImage = 'assets/images/8tableGreen.svg';
          }
          
          break;
        }
      }
    }
  }

  changeState() {
    this.state = !this.state;
  };

}

