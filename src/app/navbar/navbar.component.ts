import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  toggleNav = true;
  private screenWidh = 0;

  ngOnInit(): void {
    this.setWidth(window.innerWidth);
    this.checkSize();
    
    // Scrolling Effect
    $(window).on("scroll", function () {
      if ($(window).scrollTop()) {
        $('nav').addClass('black');
        $('#arrowButton').fadeOut();
      } else {
        $('nav').removeClass('black');
      }
      if ($(window).scrollTop() == 0){
        $('#arrowButton').fadeIn();
          }
    });

  }

  arrowclick(){
		var headerheight = $('#navbartop').height();
		var topofbody = document.getElementById("scroll").offsetTop - headerheight;
		window.scroll({top: topofbody, behavior: "smooth"});
  }
  
  changeState(){   
    this.toggleNav = !this.toggleNav;
  }

  public onResize(event: any) {    
    this.screenWidh = event.target.innerWidth;
    this.checkSize();    
  }

  private checkSize()
  {
    this.toggleNav = !(this.screenWidh < 1000);
  }

  private setWidth( width: number){
    this.screenWidh = width;
  }

}
