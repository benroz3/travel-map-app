import { FaMapMarkerAlt } from "react-icons/fa";
import "./Navbar.scss";

const Navbar: React.FC<{
  currentUser: string;
  showAddForm: boolean;
  showRegisterForm: boolean;
  showLoginForm: boolean;
  setShowAddForm: (value: boolean) => void;
  setShowRegisterForm: (value: boolean) => void;
  setShowLoginForm: (value: boolean) => void;
  setCurrentUser: (value: string) => void;
}> = ({
  currentUser,
  showAddForm,
  showRegisterForm,
  showLoginForm,
  setShowAddForm,
  setShowRegisterForm,
  setShowLoginForm,
  setCurrentUser,
}) => {
  return (
    <div className="nav">
      <div className="logo">
        <FaMapMarkerAlt className="icon" />
        {currentUser && "Hello " + currentUser + "!"}
      </div>
      <div className="buttons">
        {showAddForm ? (
          <button
            className="add"
            onClick={() => {
              setShowLoginForm(false);
              setShowRegisterForm(false);
              setShowAddForm(false);
            }}
          >
            Back
          </button>
        ) : (
          <button
            className="add"
            onClick={() => {
              setShowLoginForm(false);
              setShowRegisterForm(false);
              setShowAddForm(true);
            }}
          >
            Add Pin
          </button>
        )}
        {localStorage.getItem("currentUser") ? (
          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem("currentUser");
              setCurrentUser("");
            }}
          >
            Logout
          </button>
        ) : (
          <>
            {showLoginForm ? (
              <button
                className="login"
                onClick={() => {
                  setShowRegisterForm(false);
                  setShowAddForm(false);
                  setShowLoginForm(false);
                }}
              >
                Back
              </button>
            ) : (
              <button
                className="login"
                onClick={() => {
                  setShowRegisterForm(false);
                  setShowAddForm(false);
                  setShowLoginForm(true);
                }}
              >
                Login
              </button>
            )}
            {showRegisterForm ? (
              <button
                className="register"
                onClick={() => {
                  setShowLoginForm(false);
                  setShowAddForm(false);
                  setShowRegisterForm(false);
                }}
              >
                Back
              </button>
            ) : (
              <button
                className="register"
                onClick={() => {
                  setShowLoginForm(false);
                  setShowAddForm(false);
                  setShowRegisterForm(true);
                }}
              >
                Register
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
