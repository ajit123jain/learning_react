
class LocalStorage 
{
  addToken(token) {
    localStorage.setItem("token", token);
  }

  addUser(user){
    localStorage.setItem("user", JSON.stringify(user))
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new LocalStorage();