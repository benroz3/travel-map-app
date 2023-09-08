import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.scss";

const Login: React.FC<{
  setShowLoginForm: (value: boolean) => void;
  setCurrentUser: (value: string) => void;
  storage: Storage;
}> = ({ setShowLoginForm, setCurrentUser, storage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (username === "" || password === "") {
      toast("Missing information!");
      return;
    }

    const currentUser = {
      username,
      password,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        currentUser
      );
      storage.setItem("currentUser", res.data.username);
      setCurrentUser(res.data.username);
      setShowLoginForm(false);
    } catch (error) {
      console.log(error);
      toast("Something went wrong! Please try again later.");
    }
  };

  return (
    <form className="register">
      <div className="container">
        <div className="title">Login</div>
        <input
          type="text"
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="submitButton" onClick={submitHandler}>
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
