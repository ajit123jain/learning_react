import http from "../http-common";

class LoginService {
  create(data, config) {
    return http.post("/sign_in", data, config);
  }

  signOut(data, config){
    return http.delete("/admins/sign_out")
  }

}

export default new LoginService();