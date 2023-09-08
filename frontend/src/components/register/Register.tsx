import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Register.scss";

const Register: React.FC<{ setShowRegisterForm: (value: boolean) => void }> = ({
  setShowRegisterForm,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (username === "" || password === "" || email === "") {
      toast("Missing information!");
      return;
    }

    const currentUser = {
      username,
      email,
      password,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/register`,
        currentUser
      );
      setShowRegisterForm(false);
    } catch (error) {
      console.log(error);
      toast("Something went wrong! Please try again later.");
    }
  };

  return (
    <form className="register">
      <div className="container">
        <div className="title">Register</div>
        <input
          type="text"
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="submitButton" onClick={submitHandler}>
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
