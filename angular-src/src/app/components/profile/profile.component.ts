import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any;

  constructor(
    private authService: AuthService,
    private spinnerService: Ng4LoadingSpinnerService,
    private flashMessageService: FlashMessagesService
  ) {}

  ngOnInit() {
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

  ngOnDestroy() {}
}
