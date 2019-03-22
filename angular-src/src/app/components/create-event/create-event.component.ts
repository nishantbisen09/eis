import { Component, OnInit, OnDestroy } from "@angular/core";
import { EventService } from "src/app/services/event.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";

@Component({
  selector: "app-create-event",
  templateUrl: "./create-event.component.html",
  styleUrls: ["./create-event.component.css"]
})
export class CreateEventComponent implements OnInit, OnDestroy {
  AllColleges = [];
  title: String;
  description: String;
  tags: String;
  category: String;
  eventfee: String;
  duration: String;
  propdate: Date;
  college: String;
  location: String;
  image: File;
  imagePreview: string;
  user_id: any;
  event_id: Number;
  constructor(
    private eventService: EventService,
    private flashMessageService: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
    private SpinnerService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe(response => {
      this.user_id = response.user_id;
    });
    this.authService.getAllColleges().subscribe(colleges => {
      this.AllColleges = colleges.result.filter(
        c => c.collegeStatus == "approved"
      );
    });

    this.eventService.getAllEvents().subscribe(response => {
      this.event_id = response.events.length + 1;
    });
  }

  ngOnDestroy() {}

  createEvent() {
    if (!this.validateEventForm()) {
      this.flashMessageService.show("All fields are mandatory", {
        cssClass: "alert-warning",
        timeout: 5000
      });
      return false;
    }

    this.SpinnerService.show();

    const event = {
      event_id: this.event_id,
      user_id: this.user_id,
      title: this.title,
      description: this.description,
      tags: this.tags,
      category: this.category,
      eventfee: this.eventfee,
      duration: this.duration,
      propdate: this.propdate,
      college: this.college,
      location: this.location,
      image: this.image.name
    };

    this.eventService.createEvent(event).subscribe(data => {
      if (data.success) {
        this.eventService
          .uploadImage(this.image, this.event_id)
          .subscribe(data => {
            console.log(data);
          });
        this.flashMessageService.show(data.message, {
          cssClass: "alert-success",
          timeout: 5000
        });
        this.SpinnerService.hide();
        this.router.navigate(["/dashboard"]);
      } else {
        this.flashMessageService.show(data.message, {
          cssClass: "alert-danger",
          timeout: 5000
        });
      }
    });
  }

  onImageSelected(event) {
    this.image = event.target.files[0];
    this.flashMessageService.show("Selected Image: " + this.image.name, {
      cssClass: "alert-warning",
      timeout: 3000
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.image);
  }

  validateEventForm() {
    if (
      this.image == null ||
      this.title == null ||
      this.description == null ||
      this.location == null ||
      this.tags == null ||
      this.propdate == null ||
      this.category == null
    ) {
      return false;
    } else {
      return true;
    }
  }
}
