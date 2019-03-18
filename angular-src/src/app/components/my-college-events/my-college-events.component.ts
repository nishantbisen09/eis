import { Component, OnInit } from "@angular/core";
import { EventService } from "src/app/services/event.service";
import { AuthService } from "src/app/services/auth.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-college-events",
  templateUrl: "./my-college-events.component.html",
  styleUrls: ["./my-college-events.component.css"]
})
export class MyCollegeEventsComponent implements OnInit {
  events: any = [];
  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private spinnerService: Ng4LoadingSpinnerService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.spinnerService.show();
    this.authService.getUserProfile().subscribe(user => {
      this.eventService.getAllEvents().subscribe(response => {
        this.spinnerService.hide();
        this.events = response.events.filter(
          e => e.college == user.college && e.status == "approved"
        );
        console.log(this.events);
      });
    });
  }
}
