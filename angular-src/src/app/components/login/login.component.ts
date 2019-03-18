import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: String = "";
  password: String = "";
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {}

  login() {
    if (!this.validateLogin()) {
      this.flashMessageService.show("One or more field is empty!", {
        cssClass: "alert-warning",
        timeout: 5000
      });
      return false;
    }
    const user = {
      username: this.username,
      password: this.password
    };
    this.spinnerService.show();
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.spinnerService.hide();
        this.authService.storeUserData(data.token, data.user);
        this.flashMessageService.show("You are now logged in!", {
          cssClass: "alert-success",
          timeout: 5000
        });
        this.router.navigate(["dashboard"]);
      } else {
        this.spinnerService.hide();
        this.flashMessageService.show(data.msg, {
          cssClass: "alert-danger",
          timeout: 5000
        });
        this.router.navigate(["login"]);
      }
    });
  }

  validateLogin() {
    if (this.username == null || this.password == null) {
      return false;
    } else {
      return true;
    }
  }
}
