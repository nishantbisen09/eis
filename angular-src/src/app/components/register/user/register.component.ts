import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../../services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  formType: any;
  name: string;
  email: string;
  username: string;
  password: string;
  contact: string;
  college: string;
  type: string = "student";
  interest: string;
  supdoc: File;
  imagePreview: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.formType = params.type;
    });
  }

  onImageSelected(event) {
    this.supdoc = event.target.files[0];
    this.flashMessage.show("Selected Image: " + this.supdoc.name, {
      cssClass: "alert-warning",
      timeout: 3000
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.supdoc);
  }

  OnUserRegister() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      contact: this.contact,
      college: this.college,
      type: this.type,
      interest: this.interest,
      document:
        "https://eisimageupload.s3.ap-southeast-1.amazonaws.com/" +
        this.supdoc.name
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show("Please fill all fields", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    } else if (this.contact.length != 10) {
      this.flashMessage.show("Contact must be 10 digits", {
        cssClass: "alert-warning",
        timeout: 3000
      });
      return false;
    } else if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Please use a valid email", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }

    this.spinnerService.show();
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        //upload document
        this.authService.docUpload(this.supdoc).subscribe(resp => {
          console.log(resp);
        });
        //upload document
        this.spinnerService.hide();
        this.flashMessage.show("You are now registered, Login to continue", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(["/login"]);
      } else {
        this.spinnerService.hide();
        this.flashMessage.show("Something went wrong", {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.router.navigate(["/register"]);
      }
    });
  }
}
