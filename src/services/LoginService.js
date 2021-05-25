import http from "../http-common";

class LoginService {
  create(data, config) {
    return http.post("/users/sign_in", data, config);
  }

  signOut(data, config){
    let access_token = window.localStorage.getItem("token");
    return http.delete("/users/sign_out?access_token="+access_token)
  }

}

export default new LoginService();