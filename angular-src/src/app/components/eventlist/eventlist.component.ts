import { Component, OnInit } from "@angular/core";
import { EventService } from "../../services/event.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-eventlist",
  templateUrl: "./eventlist.component.html",
  styleUrls: ["./eventlist.component.css"]
})
export class EventlistComponent implements OnInit {
  public events = [];
  public user = "";
  public selectedcategory = [];
  public prefEvents = [];
  public selectedcity = [];
  constructor(
    private _eventService: EventService,
    private spinnerService: Ng4LoadingSpinnerService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.spinnerService.show();
      this.authService.getUserProfile().subscribe(response => {
        this.user = response;
        this.spinnerService.hide();
      });
    }

    this.spinnerService.show();
    this.getEvents();
  }

  getEvents() {
    this._eventService.getAllEvents().subscribe(response => {
      if (response) {
        this.events = response.events.filter(e => e.status == "approved");
        this.spinnerService.hide();
        console.log(this.events);
      }
    });
  }

  onReaction(action, event_id) {
    const task = {
      action: action,
      event_id: event_id
    };
    this._eventService.reaction(task).subscribe(response => {
      console.log(response);
      this.getEvents();
    });
  }

  onFilter(value) {
    if (value.target.checked) {
      this.selectedcategory.push(value.target.value);
    } else {
      this.selectedcategory = this.selectedcategory.filter(
        c => c != value.target.value
      );
    }
    console.log(this.selectedcategory);
  }
  onFilterCity(value) {
    if (value.target.checked) {
      this.selectedcity.push(value.target.value);
    } else {
      this.selectedcity = this.selectedcity.filter(
        c => c != value.target.value
      );
    }
    console.log(this.selectedcity);
  }
  onCategorySubmit() {
    this.spinnerService.show();
    this._eventService.getAllEvents().subscribe(response => {
      if (response) {
        this.events = [];
        response.events.filter(e => {
          this.selectedcategory.forEach(event => {
            if (e.category == event && e.status == "approved") {
              this.events.push(e);
            }
          });
        });
        console.log(this.selectedcategory);
        console.log(this.events);

        this.spinnerService.hide();
      }
    });
  }
  onCitySubmit() {
    this.spinnerService.show();
    this._eventService.getAllEvents().subscribe(response => {
      if (response) {
        this.events = [];
        response.events.filter(c => {
          this.selectedcity.forEach(event => {
            if (c.location == event && c.status == "approved") {
              this.events.push(c);
            }
          });
        });
        this.spinnerService.hide();
      }
    });
  }

  onPreferences() {
    this.spinnerService.show();
    this.events = [];
    this.authService.getUserProfile().subscribe(response => {
      this.user = response;
      this.prefEvents = response.interest;
      this._eventService.getAllEvents().subscribe(resp => {
        if (resp) {
          resp.events.filter(e => {
            if (e.tags.includes(this.prefEvents) && e.status == "approved") {
              this.events.push(e);
            }
          });
          this.spinnerService.hide();
        }
      });
    });
    console.log(this.events);
  }
}
