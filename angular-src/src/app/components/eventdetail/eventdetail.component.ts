import { Component, OnInit } from "@angular/core";
import { EventService } from "../../services/event.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { AuthService } from "src/app/services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-eventdetail",
  templateUrl: "./eventdetail.component.html",
  styleUrls: ["./eventdetail.component.css"]
})
export class EventdetailComponent implements OnInit {
  public event: any;
  public events: any = [];
  public id;
  public flag = 0;
  private participant: Object;
  public MyparticipatedEvents: any = [];
  public show = false;

  constructor(
    private _eventService: EventService,
    private _activatedRoute: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private authService: AuthService,
    private eventService: EventService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe(response => {
      if (response.type == "subadmin") this.show = true;
    });
    this.spinnerService.show();
    this._activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this._eventService.getAllEvents().subscribe(response => {
        this.event = response.events.find(e => e.event_id == this.id);
        this.spinnerService.hide();
      });
    });
  }

  attendEvent() {
    this.spinnerService.show();

    //chech if the user is logged in
    if (!this.authService.loggedIn()) {
      this.spinnerService.hide();
      this.flashMessageService.show("Please login to continue...", {
        cssClass: "alert-warning",
        timeout: 5000
      });
      this.spinnerService.hide();
      this.router.navigate(["/login"]);
      return false;
    }

    //get profile details to add to participant collection
    this.authService.getUserProfile().subscribe(response => {
      if (response) {
        this.participant = {
          name: response.name,
          college: response.college,
          event_id: this.event.event_id,
          contact: response.contact,
          user_id: response.user_id,
          event_title: this.event.title,
          event_propdate: this.event.propdate
        };

        //check if the user has already participated
        this.eventService
          .getMyParticipationList(response.user_id)
          .subscribe(newResponse => {
            this.MyparticipatedEvents = newResponse;
            this.addParticipant();
          });
      }
    });
  }

  addParticipant() {
    this.MyparticipatedEvents.forEach(element => {
      if (element.event_id == this.id) {
        this.flag = 1;
      }
    });
    if (this.flag == 1) {
      console.log(true);
      this.spinnerService.hide();
      this.flashMessageService.show(
        "You have already participated in this event",
        {
          cssClass: "alert-danger",
          timeout: 5000
        }
      );
      return false;
    } else {
      console.log(false);
      if (this.participant) {
        this.eventService
          .addparticipant(this.participant)
          .subscribe(response => {
            if (response.success) {
              this.spinnerService.hide();
              this.flashMessageService.show(response.message, {
                cssClass: "alert-success",
                timeout: 5000
              });
              this.router.navigate(["/dashboard"]);
            } else {
              this.spinnerService.hide();
              this.flashMessageService.show(response.message, {
                cssClass: "alert-danger",
                timeout: 5000
              });
            }
          });
      }
    }
  }
}
