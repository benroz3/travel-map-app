import { format } from "timeago.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { AiFillStar } from "react-icons/ai";
import { PinType } from "../../types/types";
import "./Map.scss";

const Map: React.FC<{ pins: PinType[]; currentUser: string }> = ({
  pins,
  currentUser,
}) => {
  return (
    <MapContainer
      center={[31.0461, 34.8516] as LatLngTuple}
      zoom={3}
      style={{ height: "90vh", width: "100%" }}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pins.map((pin) => (
        <Marker
          key={pin._id}
          position={[pin.latitude, pin.longitude]}
          icon={
            new Icon({
              iconUrl:
                pin.username === currentUser
                  ? "/assets/bluePin.png"
                  : "/assets/greenPin.webp",
              iconSize: [24, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32],
            })
          }
        >
          <Popup>
            <div
              className="card"
              style={{
                width: "250px",
                height: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <label>Place</label>
              <h4 className="place">{pin.title}</h4>
              <label>Review</label>
              <p className="desc">{pin.desc}</p>
              <label>Rating</label>
              <div className="stars">
                {Array(pin.rating)
                  .fill(null)
                  .map((_, index) => (
                    <AiFillStar key={index} className="star" />
                  ))}
              </div>
              <label>Information</label>
              <span className="username">
                Created by <b>{pin.username}</b>
              </span>
              <span className="date">{format(pin.createdAt)}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
