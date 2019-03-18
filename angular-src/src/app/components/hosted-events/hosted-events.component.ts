import { Component, OnInit } from "@angular/core";
import { EventService } from "src/app/services/event.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-hosted-events",
  templateUrl: "./hosted-events.component.html",
  styleUrls: ["./hosted-events.component.css"]
})
export class HostedEventsComponent implements OnInit {
  events: any = [];
  private user_id: number;
  constructor(
    private eventService: EventService,
    private spinnerService: Ng4LoadingSpinnerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.spinnerService.show();
    this.authService.getUserProfile().subscribe(response => {
      this.user_id = response.user_id;
      this.eventService.getAllEvents().subscribe(response => {
        this.events = response.events.filter(e => e.user_id == this.user_id);
        this.spinnerService.hide();
      });
    });
  }
}
