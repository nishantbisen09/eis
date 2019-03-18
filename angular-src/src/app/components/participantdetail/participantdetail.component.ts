import { Component, OnInit } from "@angular/core";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "src/app/services/event.service";

@Component({
  selector: "app-participantdetail",
  templateUrl: "./participantdetail.component.html",
  styleUrls: ["./participantdetail.component.css"]
})
export class ParticipantdetailComponent implements OnInit {
  public participants = [];
  public event_id;
  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.spinnerService.show();
    this.activatedRoute.params.subscribe(params => {
      this.event_id = params.id;
      this.eventService
        .getEventParticipants(this.event_id)
        .subscribe(response => {
          this.participants = response;
          this.spinnerService.hide();
        });
    });
  }
  back() {
    window.history.back();
  }
}
