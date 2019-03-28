import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/user/register.component";
import { DashboardComponent } from "./components/dashboard/student/dashboard.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";
import { EventlistComponent } from "./components/eventlist/eventlist.component";
import { EventdetailComponent } from "./components/eventdetail/eventdetail.component";
import { ParticipatedEventsComponent } from "./components/participated-events/participated-events.component";
import { HostedEventsComponent } from "./components/hosted-events/hosted-events.component";
import { HistoryComponent } from "./components/history/history.component";
import { CreateEventComponent } from "./components/create-event/create-event.component";
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
import { MyCollegeEventsComponent } from "./components/my-college-events/my-college-events.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  {
    path: "participatedevents",
    component: ParticipatedEventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "hostedevents",
    component: HostedEventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "hostedevents/:id",
    component: ParticipantdetailComponent,
    canActivate: [AuthGuard]
  },
  { path: "history", component: HistoryComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "eventlist", component: EventlistComponent },
  {
    path: "postevent",
    component: CreateEventComponent,
    canActivate: [AuthGuard]
  },
  { path: "eventlist/:id", component: EventdetailComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  { path: "register_college", component: RegisterCollegeComponent, canActivate: [AuthGuard] },
  { path: "event_request", component: EventRequestComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "admindashboard", component: AdmindashboardComponent, canActivate: [AuthGuard] },
  { path: "adminhostedevents", component: AdminhostedeventsComponent , canActivate: [AuthGuard]},
  { path: "adminlogin", component: AdminloginComponent },
  { path: "college", component: CollegeComponent, canActivate: [AuthGuard] },
  { path: "sub-admin", component: SubAdminComponent, canActivate: [AuthGuard] },
  { path: "editprofile", component: EditprofileComponent, canActivate: [AuthGuard] },
  { path: "my-college-events", component: MyCollegeEventsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
