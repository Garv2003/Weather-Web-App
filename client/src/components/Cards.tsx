import { FaLocationDot } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import logo from "../assests/images/logo-2.png";

const Cards = () => {
  return (
    <div className="SubContainer">
      <div className="search-box">
        <p>
          <FaLocationDot size={30} />
          <span>New Delhi</span>
        </p>
        <RxCross2 size={30} style={{ cursor: "pointer" }} />
      </div>
      <div className="weather-box fadeIn">
        <img src={logo} alt="logo" />
        <p className="temperature">
          27&deg;<sup>c</sup>
        </p>
        <p className="description">Light Rain</p>
      </div>

      <div
        className="weather-details fadeIn"
        style={{
          gap: "8px",
        }}
      >
        <div className="humidity">
          <span className="m-icon">humidity_percentage</span>
          <div className="text">
            <span>80%</span>
          </div>
        </div>

        <div className="humidity">
          <span className="m-icon">visibility</span>
          <div className="text">
            <span>
              10<sub>km</sub>
            </span>
          </div>
        </div>
        <div className="pressure">
          <span className="m-icon">airwave</span>
          <div className="text">
            <span>
              {" "}
              5<sub>hPa</sub>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
