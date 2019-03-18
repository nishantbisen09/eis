import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { DashboardComponent } from "./components/dashboard/student/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/user/register.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FormsModule } from "@angular/forms";
import { ValidateService } from "./services/validate.service";
import { FlashMessagesModule } from "angular2-flash-messages";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { EventlistComponent } from "./components/eventlist/eventlist.component";
import { EventdetailComponent } from "./components/eventdetail/eventdetail.component";
import { EventService } from "./services/event.service";
import { ParticipatedEventsComponent } from "./components/participated-events/participated-events.component";
import { HostedEventsComponent } from "./components/hosted-events/hosted-events.component";
import { HistoryComponent } from "./components/history/history.component";
import { CreateEventComponent } from "./components/create-event/create-event.component";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { BackComponent } from "./components/back/back.component";
import { ParticipantdetailComponent } from "./components/participantdetail/participantdetail.component";
import { SdashboardComponent } from "./components/dashboard/sdashboard/sdashboard.component";
import { RegisterCollegeComponent } from "./components/register/register-college/register-college.component";
import { EventRequestComponent } from "./components/event-request/event-request.component";
import { AdmindashboardComponent } from "./components/admin/admindashboard/admindashboard.component";
import { AdminloginComponent } from "./components/admin/adminlogin/adminlogin.component";
import { AdminhostedeventsComponent } from "./components/admin/adminhostedevents/adminhostedevents.component";
import { CollegeComponent } from "./components/admin/college/college.component";
import { SubAdminComponent } from "./components/admin/sub-admin/sub-admin.component";
import { EditprofileComponent } from "./components/editprofile/editprofile.component";
import { ProfilecardComponent } from "./components/profilecard/profilecard.component";
import { MyCollegeEventsComponent } from './components/my-college-events/my-college-events.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    EventlistComponent,
    EventdetailComponent,
    ParticipatedEventsComponent,
    HostedEventsComponent,
    HistoryComponent,
    CreateEventComponent,
    BackComponent,
    ParticipantdetailComponent,
    SdashboardComponent,
    RegisterCollegeComponent,
    EventRequestComponent,
    AdmindashboardComponent,
    AdminloginComponent,
    AdminhostedeventsComponent,
    CollegeComponent,
    SubAdminComponent,
    EditprofileComponent,
    ProfilecardComponent,
    MyCollegeEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [ValidateService, AuthService, EventService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
