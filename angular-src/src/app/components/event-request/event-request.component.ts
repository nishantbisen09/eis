import { Component, OnInit } from "@angular/core";
import { EventService } from "src/app/services/event.service";
import { AuthService } from "src/app/services/auth.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-event-request",
  templateUrl: "./event-request.component.html",
  styleUrls: ["./event-request.component.css"]
})
export class EventRequestComponent implements OnInit {
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

  actionOnEvent(event_id, action) {
    console.log(event_id);

    this.spinnerService.show();
    const task = {
      action: action,
      event_id: event_id
    };
    this.eventService.updateEvent(task).subscribe(response => {
      console.log(response);

      if (response.success) {
        this.getEvents();
        this.flashMessageService.show("Event " + action, {
          cssClass: "alert-warning",
          timeout: 3000
        });
      }
    });
  }

  getEvents() {
    this.spinnerService.show();
    this.authService.getUserProfile().subscribe(user => {
      this.eventService.getAllEvents().subscribe(response => {
        this.spinnerService.hide();
        this.events = response.events.filter(e => e.college == user.college);
        console.log(this.events);
      });
    });
  }
}
