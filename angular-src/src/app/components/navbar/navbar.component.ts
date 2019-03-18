import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {}

  onLogoutClick() {
    this.spinnerService.show();
    this.authService.logout();
    this.flashMessageService.show("You are logged out", {
      cssClass: "alert-success",
      timeout: 3000
    });
    this.router.navigate(["/login"]);
    this.spinnerService.hide();
    return false;
  }
}
