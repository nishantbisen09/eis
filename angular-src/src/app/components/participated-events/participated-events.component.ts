import { Component, OnInit } from "@angular/core";
import { EventService } from "src/app/services/event.service";
import { AuthService } from "src/app/services/auth.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";

@Component({
  selector: "app-participated-events",
  templateUrl: "./participated-events.component.html",
  styleUrls: ["./participated-events.component.css"]
})
export class ParticipatedEventsComponent implements OnInit {
  events: any = [];
  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.spinnerService.show();
    this.authService.getUserProfile().subscribe(response => {
      if (response) {
        this.eventService
          .getMyParticipationList(response.user_id)
          .subscribe(result => {
            this.events = result;
            this.spinnerService.hide();
          });
      }
    });
  }
}
