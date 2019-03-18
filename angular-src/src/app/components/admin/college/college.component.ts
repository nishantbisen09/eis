import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-college",
  templateUrl: "./college.component.html",
  styleUrls: ["./college.component.css"]
})
export class CollegeComponent implements OnInit {
  public colleges = [];
  constructor(
    private authService: AuthService,
    private spinnerService: Ng4LoadingSpinnerService,
    private flashMessageService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.loadAllColleges();
  }

  actionOnCollege(collegeName, action) {
    this.spinnerService.show();
    const task = {
      action: action,
      collegeName: collegeName
    };
    this.authService.updateCollegeStatus(task).subscribe(response => {
      if (response.success) {
        this.loadAllColleges();
        this.flashMessageService.show("College " + action, {
          cssClass: "alert-warning",
          timeout: 3000
        });
      } else {
        this.spinnerService.hide();
        this.flashMessageService.show("something went wrong " + action, {
          cssClass: "alert-warning",
          timeout: 3000
        });
      }
    });
  }
  back() {
    window.history.back();
  }

  loadAllColleges() {
    this.spinnerService.show();
    this.authService.getAllColleges().subscribe(colleges => {
      this.colleges = colleges.result.filter(
        c => c.collegeStatus == "unapproved"
      );
      this.spinnerService.hide();
    });
  }
}
