import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
   student = true;
   subadmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.authService.getUserProfile().subscribe(response => {
        if (response.type == "subadmin") {
          this.student = false;
          this.subadmin = true;
        }
        console.log("student:", this.student);
        console.log("sub:", this.subadmin);
      });
    }
  }
}
