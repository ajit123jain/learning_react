import http from "../http-common";

class LoginService {
  create(data, config) {
    return http.post("/users/sign_in", data, config);
  }

  signOut(data, config){
    return http.delete("/users/sign_out")
  }

}

export default new LoginService();