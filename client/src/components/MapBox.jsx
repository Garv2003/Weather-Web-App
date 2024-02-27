import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";

const MapBox = ({ data }) => {
  return (
    <MapContainer
      center={[data?.city?.coord?.lat, data?.city?.coord?.lon]}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "300px",
        width: "100%",
        borderRadius: "20px",
        padding: "20px",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[data?.city?.coord?.lat, data?.city?.coord?.lon]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

MapContainer.propTypes = {
  data: PropTypes.object,
};

export default MapBox;
