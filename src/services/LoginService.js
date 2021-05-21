import http from "../http-common";

class LoginService {
  create(data, config) {
    return http.post("/users/sign_in", data, config);
  }

}

export default new LoginService();