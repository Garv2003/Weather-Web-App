import { FaLocationDot } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { icon } from "../utils/utils";
import useSWR from "swr";
import axios from "axios";

const Cards = ({
  city,
  RemoveCity,
}: {
  city: string;
  RemoveCity: (city: string) => void;
}) => {
  const fetcher = async (url: string) => {
    const res = await axios.get(url);
    if (!res) {
      throw Error("Something went wrong");
    }
    return res.data;
  };

  const { data, error, isLoading } = useSWR(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`,
    fetcher
  );

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Something went wrong
      </div>
    );

  return (
    <div className="SubContainer">
      <div className="search-box">
        <p>
          <FaLocationDot size={30} />
          <span>{data?.name}</span>
        </p>
        <RxCross2
          size={30}
          style={{ cursor: "pointer" }}
          onClick={() => {
            RemoveCity(city);
          }}
        />
      </div>
      <div className="weather-box fadeIn">
        <img src={icon[data?.weather[0]?.icon]} alt="weather" />
        <p className="temperature">
          {Math.round(data?.main.temp - 273.15)}&deg;<sup>c</sup>
          &deg;<sup>c</sup>
        </p>
        <p className="description">{data?.weather[0].description}</p>
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
            <span>{data?.main.humidity}%</span>
          </div>
        </div>

        <div className="humidity">
          <span className="m-icon">visibility</span>
          <div className="text">
            <span>
              {(data?.visibility / 1000).toLocaleString(undefined, {
                maximumFractionDigits: 1,
              })}
              <sub>km</sub>
            </span>
          </div>
        </div>
        <div className="pressure">
          <span className="m-icon">airwave</span>
          <div className="text">
            <span>
              {" "}
              {(data?.main.pressure / 1000).toLocaleString(undefined, {
                maximumFractionDigits: 1,
              })}
              <sub>hPa</sub>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
