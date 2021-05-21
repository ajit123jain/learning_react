import http from "../http-common";

class LoginService {
  create(data) {
    return http.post("/users/sign_in", data);
  }

}

export default new LoginService();