import { Component, OnInit } from "@angular/core";

import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";

import { FlashMessagesService } from "angular2-flash-messages";
import { EventService } from "src/app/services/event.service";

@Component({
  selector: "app-adminhostedevents",
  templateUrl: "./adminhostedevents.component.html",
  styleUrls: ["./adminhostedevents.component.css"]
})
export class AdminhostedeventsComponent implements OnInit {
  public events = [];

  constructor(
    private eventService: EventService,
    private spinnerService: Ng4LoadingSpinnerService,
    private flashMessageService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.getHostedEvents();
  }

  back() {
    window.history.back();
  }

  onDeleteEvent(event_id) {
    this.spinnerService.show();
    this.eventService.deleteEvent(event_id).subscribe(response => {
      if (response.success) {
        this.getHostedEvents();
        this.spinnerService.hide();
        this.flashMessageService.show(response.msg, {
          cssClass: "alert-success",
          timeout: 5000
        });
      }
    });
  }

  getHostedEvents() {
    this.spinnerService.show();
    this.eventService.getAllEvents().subscribe(response => {
      if (response) {
        this.spinnerService.hide();
      }
      this.events = response.events;
    });
  }
}
