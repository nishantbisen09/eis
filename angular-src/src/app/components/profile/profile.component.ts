import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
    private spinnerService: Ng4LoadingSpinnerService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserDetails();
    this.refreshData();
  }

  getUserDetails() {
    this.spinnerService.show();
    this.authService.getUserProfile().subscribe(
      profile => {
        this.user = profile;
        this.spinnerService.hide();
      },
      err => {
        this.spinnerService.hide();
        this.flashMessageService.show("Failed to load profile", {
          cssClass: "alert-danger",
          timeout: 5000
        });
        console.log(err);
      }
    );
  }

  refreshData() {
    setTimeout(() => {
      this.getUserDetails();
    }, 3000);
  }
}
