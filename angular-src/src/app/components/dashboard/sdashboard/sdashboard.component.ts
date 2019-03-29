import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";

@Component({
  selector: "app-sdashboard",
  templateUrl: "./sdashboard.component.html",
  styleUrls: ["./sdashboard.component.css"]
})
export class SdashboardComponent implements OnInit {
  public message = true;
  college;
  registered = false;
  constructor(
    private authService: AuthService,
    private spinner: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.authService.getUserProfile().subscribe(response => {
      this.authService.getAllColleges().subscribe(colleges => {
        this.college = colleges.result.find(c => c.user_id == response.user_id);
        //console.log(this.college);

        if (this.college && this.college.collegeStatus == "unapproved") {
          this.message = false;
          this.registered = true;
        }
        if (this.college.collegeStatus == "approved") {
          this.message = false;
          this.registered = false;
        }
      });
      this.spinner.hide();
    });
  }
}
