import { Component, OnInit } from "@angular/core";
import { EventService } from "../../services/event.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-eventlist",
  templateUrl: "./eventlist.component.html",
  styleUrls: ["./eventlist.component.css"]
})
export class EventlistComponent implements OnInit {
  public events = [];
  public user = "";
  public selectedcategory = [];
  constructor(
    private _eventService: EventService,
    private spinnerService: Ng4LoadingSpinnerService,
    private http: HttpClient,
    private authService: AuthService
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
    this._eventService.getAllEvents().subscribe(response => {
      if (response) {
        this.events = response.events.filter(e => e.status == "approved");
        this.spinnerService.hide();
        console.log(this.events);
      }
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
}
