import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/Navbar";
import Map from "./components/map/Map";
import CreatePinForm from "./components/createPinForm/CreatePinForm";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { PinType } from "./types/types";
import "./App.scss";

const App = () => {
  const storage = window.localStorage;

  const [showAddForm, setShowAddForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [pins, setPins] = useState<PinType[]>([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/pins`
        );
        setPins(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPins();

    setCurrentUser(localStorage.getItem("currentUser") || "");
  }, []);

  return (
    <div className="app">
      <Navbar
        currentUser={currentUser}
        showAddForm={showAddForm}
        showRegisterForm={showRegisterForm}
        showLoginForm={showLoginForm}
        setShowAddForm={setShowAddForm}
        setShowRegisterForm={setShowRegisterForm}
        setShowLoginForm={setShowLoginForm}
        setCurrentUser={setCurrentUser}
      />
      {!showAddForm && !showLoginForm && !showRegisterForm && (
        <Map pins={pins} currentUser={currentUser} />
      )}
      {showAddForm && (
        <CreatePinForm
          pins={pins}
          setPins={setPins}
          setShowAddForm={setShowAddForm}
        />
      )}
      {showRegisterForm && (
        <Register setShowRegisterForm={setShowRegisterForm} />
      )}
      {showLoginForm && (
        <Login
          setShowLoginForm={setShowLoginForm}
          setCurrentUser={setCurrentUser}
          storage={storage}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
