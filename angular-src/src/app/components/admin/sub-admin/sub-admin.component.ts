import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from "@angular/core";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: "app-sub-admin",
  templateUrl: "./sub-admin.component.html",
  styleUrls: ["./sub-admin.component.css"]
})
export class SubAdminComponent implements OnInit {
  public users = [];
  constructor(
    private authService: AuthService,
    private spinnerService: Ng4LoadingSpinnerService,
    private flashMessageService: FlashMessagesService
    ) {
  }

  back() {
    window.history.back();
  }

  ngOnInit() {
    this.loadAllUsers();
  }
  actionOnUser(userid, action) {
    this.spinnerService.show();
    const task = {
      action: action,
      user_id: userid
    };
    this.authService.updateUserStatus(task).subscribe(response => {
      if (response.success) {
        this.loadAllUsers();
        this.spinnerService.hide();
        this.flashMessageService.show("User " + action, {
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
  
  loadAllUsers(){
  this.authService.getSubAdmins().subscribe(response=>{
    this.users = response.filter(u=> u.status == "unapproved");
  });
}

}
