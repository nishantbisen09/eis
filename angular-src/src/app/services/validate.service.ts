import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ValidateService {
  constructor() {}

  validateRegister(user) {
    if (
      user.name == null ||
      user.email == null ||
      user.username == null ||
      user.password == null ||
      user.contact == null ||
      user.college == null ||
      user.type == null
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    return reg.test(email);
  }
}
