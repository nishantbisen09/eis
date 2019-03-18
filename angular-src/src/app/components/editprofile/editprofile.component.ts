import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { AuthService } from "src/app/services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { ValidateService } from "./../../services/validate.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-editprofile",
  templateUrl: "./editprofile.component.html",
  styleUrls: ["./editprofile.component.css"]
})
export class EditprofileComponent implements OnInit {
  oldUser: any;
  id: Number;
  name: string = "";
  email: string = "";
  contact: string = "";
  college: string = "";
  image: File;
  imageName: string = "";
  imagePreview: string = "";
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private flashMessageService: FlashMessagesService
  ) {}

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.authService.getUserProfile().subscribe(editprofile => {
        this.oldUser = editprofile;
      });
    }
  }

  onImageSelected(event) {
    this.image = event.target.files[0];
    console.log(this.image);
    this.imageName = this.image.name;
    this.flashMessageService.show("Selected Image: " + this.image.name, {
      cssClass: "alert-warning",
      timeout: 3000
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.image);
  }

  editprofile() {
    if (!this.validateUpdateForm()) {
      this.flashMessage.show("Enter atleast one field", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }

    this.authService.getUserProfile().subscribe(old => {
      if (this.image != null) {
        this.authService.uploadImage(this.image).subscribe(response => {
          console.log(response);
        });
      }

      if (this.name == "") this.name = old.name;
      if (this.email == "") this.email = old.email;
      if (this.contact == "") this.contact = old.contact;
      console.log(this.contact);
      if (this.college == "") this.college = old.college;
      if (this.imageName == "") this.imageName = old.image;

      console.log(this.name);

      if (this.contact.length != 10) {
        this.flashMessage.show("Contact must be 10 digits", {
          cssClass: "alert-warning",
          timeout: 3000
        });
        return false;
      } else if (!this.validateService.validateEmail(this.email)) {
        this.flashMessage.show("Please use a valid email address!", {
          cssClass: "alert-danger",
          timeout: 3000
        });
        return false;
      }

      const user = {
        user_id: old.user_id,
        name: this.name,
        email: this.email,
        contact: this.contact,
        college: this.college,
        image: this.imageName
      };

      this.spinnerService.show();
      this.authService.updateUser(user).subscribe(data => {
        if (data.success) {
          this.spinnerService.hide();
          this.flashMessage.show(data.msg, {
            cssClass: "alert-success",
            timeout: 3000
          });
          this.router.navigate(["/profile"]);
        } else {
          this.spinnerService.hide();
          this.flashMessage.show(data.msg, {
            cssClass: "alert-danger",
            timeout: 3000
          });
          this.router.navigate(["/editprofile"]);
        }
      });
    });
  }

  validateUpdateForm() {
    if (
      this.name == "" &&
      this.email == "" &&
      this.contact == "" &&
      this.college == "" &&
      this.image == null
    ) {
      console.log("enter one field");

      return false;
    } else {
      return true;
    }
  }
}
