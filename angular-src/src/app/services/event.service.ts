import { Injectable, isDevMode } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EventService {
  private url: string = "./assets/data/events.json";
  hostname: string = "";
  constructor(private http: HttpClient) {}
  mode() {
    if (isDevMode()) {
      this.hostname = "http://localhost:3000/";
    }
  }

  //http://localhost:3000/
  createEvent(event): Observable<any> {
    this.mode();
    return this.http.post(this.hostname + "events/postevent", event);
  }

  uploadImage(image, id) {
    this.mode();
    const fd = new FormData();
    fd.append("image", image, image.name);
    return this.http.post(this.hostname + "events/uploadimage/" + id, fd);
  }

  getAllEvents(): Observable<any> {
    this.mode();
    return this.http.get(this.hostname + "events/eventlist");
  }

  reaction(task): Observable<any> {
    this.mode();
    return this.http.post(this.hostname + "events/reaction", task);
  }

  addparticipant(participant): Observable<any> {
    this.mode();
    return this.http.post(
      this.hostname + "participants/participate",
      participant
    );
  }

  //delete event by admin
  deleteEvent(event_id): Observable<any> {
    this.mode();
    return this.http.delete(this.hostname + "events/eventdelete/" + event_id);
  }

  getEventParticipants(event_id): Observable<any> {
    this.mode();
    return this.http.get(this.hostname + "participants/list/" + event_id);
  }

  getMyParticipationList(user_id): Observable<any> {
    this.mode();
    return this.http.get(this.hostname + "participants/mylist/" + user_id);
  }

  updateEvent(event_id): Observable<any> {
    this.mode();
    return this.http.put(this.hostname + "events/eventupdate", event_id);
  }
}
