import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PinType } from "../../types/types";
import "./CreatePinForm.scss";

const CreatePinForm: React.FC<{
  pins: PinType[];
  setPins: (arr: PinType[]) => void;
  setShowAddForm: (value: boolean) => void;
}> = ({ setShowAddForm, pins, setPins }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(0);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!localStorage.getItem("currentUser")) {
      toast("You need to log in!");
      return;
    }
    if (
      title === "" ||
      desc === "" ||
      rating === 0 ||
      !latitude ||
      !longitude
    ) {
      toast("Missing information!");
      return;
    }

    const newPin = {
      username: localStorage.getItem("currentUser"),
      title,
      desc,
      rating,
      latitude,
      longitude,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/pins`,
        newPin
      );
      setPins([...pins, res.data]);
      setShowAddForm(false);
    } catch (error) {
      console.log(error);
      toast("Something went wrong! Please try again later.");
    }
  };

  return (
    <form className="form">
      <div className="container">
        <div className="title">Create a Pin</div>
        <label>Place</label>
        <input
          placeholder="Enter place name"
          onChange={(event) => setTitle(event.target.value)}
        />
        <label>Review</label>
        <textarea
          placeholder="Enter a description"
          onChange={(event) => setDesc(event.target.value)}
        />
        <label>Rating</label>
        <select onChange={(event) => setRating(parseInt(event.target.value))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div className="coords">
          <input
            placeholder="x axis"
            onChange={(event) => setLatitude(parseFloat(event.target.value))}
          />
          <input
            placeholder="y axis"
            onChange={(event) => setLongitude(parseFloat(event.target.value))}
          />
        </div>
        <button className="submitButton" type="submit" onClick={handleSubmit}>
          ADD
        </button>
      </div>
    </form>
  );
};

export default CreatePinForm;
