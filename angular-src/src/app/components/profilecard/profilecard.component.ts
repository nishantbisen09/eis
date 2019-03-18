import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profilecard",
  templateUrl: "./profilecard.component.html",
  styleUrls: ["./profilecard.component.css"]
})
export class ProfilecardComponent implements OnInit {
  public user;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.authService.getUserProfile().subscribe(response => {
        this.user = response;
      });
    }
  }
}
