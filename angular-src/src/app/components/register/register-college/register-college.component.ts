import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-register-college",
  templateUrl: "./register-college.component.html",
  styleUrls: ["./register-college.component.css"]
})
export class RegisterCollegeComponent implements OnInit {
  collegeName: string;
  collegeEmail: string;
  collegeAddress: string;
  collegeContact: string;
  collegeCity: string;
  collegeRNumber: string;

  constructor(
    private authService: AuthService,
    private spinnerService: Ng4LoadingSpinnerService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {}

  //college registration
  onCollegeRegister() {
    this.spinnerService.show();
    this.authService.getUserProfile().subscribe(user => {
      const college = {
        collegeName: this.collegeName,
        collegeEmail: this.collegeEmail,
        collegeAddress: this.collegeAddress,
        collegeContact: this.collegeContact,
        collegeCity: this.collegeCity,
        collegeRNumber: this.collegeRNumber,
        user_id: user.user_id
      };
      this.authService.registerCollege(college).subscribe(response => {
        if (response.message) {
          this.spinnerService.hide();
          this.flashMessageService.show(
            "Your request for registration has been submitted <br> We will notify you on your Dashboard",
            {
              cssClass: "alert-success",
              timeout: 10000
            }
          );
          this.router.navigate(["sub_admin_dashboard"]);
        }
      });
    });
  }
}
