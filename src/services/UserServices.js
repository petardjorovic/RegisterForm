import axios from "axios";

class UserServices {
  static register = (user) =>
    axios.post("endpoint", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
}

export default UserServices;
