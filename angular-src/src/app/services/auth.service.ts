import { Injectable, isDevMode } from "@angular/core";
import { tokenNotExpired } from "angular2-jwt";
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profile } from "selenium-webdriver/firefox";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: string;
  user: any;
  hostname: string = "";
  name: string;

  constructor(private http: HttpClient) {}

  mode() {
    if (isDevMode()) {
      this.hostname = "http://localhost:3000/";
    }
  }

  registerUser(user) {
    this.mode();
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post<{
      success: boolean;
      msg: string;
      token: string;
      user: string;
      //http://localhost:3000/
    }>(this.hostname + "users/register", user, { headers: headers });
  }

  registerCollege(collegeData): Observable<any> {
    this.mode();
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post(this.hostname + "colleges/register", collegeData, {
      headers: headers
    });
  }

  //update college status
  updateCollegeStatus(task): Observable<any> {
    this.mode();
    return this.http.put(this.hostname + "colleges/updatecollege", task);
  }

  getAllColleges(): Observable<any> {
    this.mode();
    return this.http.get(this.hostname + "colleges/getcolleges");
  }

  authenticateUser(user): Observable<any> {
    this.mode();
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post(this.hostname + "users/authenticate", user, {
      headers: headers
    });
  }

  getUserProfile(): any {
    this.mode();
    this.loadToken();
    // let headers = new HttpHeaders();
    // headers.append("Authorization", this.authToken);
    // headers.append("Content-Type", "application/json");
    return this.http.get(this.hostname + "users/profile", {
      headers: new HttpHeaders({
        Authorization: this.authToken,
        "Content-Type": "application/json"
      })
    });
  }

  //update user
  updateUser(user): Observable<any> {
    this.mode();
    return this.http.put(this.hostname + "users/editprofile", user);
  }

  storeUserData(token, user) {
    this.authToken = token;
    this.user = user;
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  uploadImage(image) {
    this.mode();
    const fd = new FormData();
    fd.append("image", image, image.name);
    return this.http.post(this.hostname + "users/userimage", fd);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired("id_token");
  }
}
