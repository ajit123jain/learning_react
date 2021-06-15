import http from "../http-common";

class LoginService {
  create(data, config) {
    return http.post("/sign_in", data, config);
  }

  signOut(data, config){
    if (data["subdomain"] === "admin")
      return http.delete("/admins/sign_out")
    else 
      return http.delete("/users/sign_out")
  }

}

export default new LoginService();