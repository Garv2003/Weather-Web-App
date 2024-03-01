import useSWR from "swr";
import Loader from "../components/Loader/Loader";
import { useState } from "react";
import Error from "../components/Error/Error";
import { icon } from "../utils/utils";
import Footer from "../components/Footer";
import { CgProfile } from "react-icons/cg";
import MapBox from "../components/MapBox";
import logo from "../assests/images/logo-2.png";
import { FaLocationDot } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

import "./Profile.css";

const API_KEY = import.meta.env.VITE_API_KEY;

const Profile = () => {
  const [city, setCity] = useState("New Delhi");
  const [url, setUrl] = useState(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
  );

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  };

  const { data, error, isLoading } = useSWR(
    url,
    fetcher,
    { revalidateOnFocus: false },
    { revalidateOnReconnect: false },
    { revalidateOnMount: false }
  );

  const { data: data1, isLoading: isLoading1 } = useSWR(
    data
      ? `http://api.openweathermap.org/data/2.5/air_pollution?lat=${data?.city?.coord?.lat}&lon=${data?.city?.coord?.lon}&appid=${API_KEY}`
      : null,
    fetcher,
    { revalidateOnFocus: false },
    { revalidateOnReconnect: false },
    { revalidateOnMount: false }
  );

  if (isLoading || isLoading1) return <Loader />;

  if (error)
    return <Error setUrl={setUrl} city={"New Delhi"} API_KEY={API_KEY} />;

  function geoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUrl(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
        );
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function formatDate(data) {
    let date = new Date(data);
    let options = { weekday: "long", day: "numeric", month: "short" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  function formatShortDate(data) {
    let date = new Date(data);
    let options = { day: "numeric", month: "short" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <a href="#" className="logo">
            <img
              src={logo}
              alt="logo"
              className="logo-img"
              style={{
                width: "150px",
                height: "58px",
              }}
            />
          </a>
          <div className="header-actions">
            <div
              className="btn-primary has-state disabled"
              data-current-location-btn
              onClick={geoLocation}
            >
              <span className="m-icon">my_location</span>
              <span className="span">Current Location</span>
            </div>
            <div className="header-actions">
              <div
                className="btn-primary has-state disabled"
                data-current-location-btn
                onClick={geoLocation}
              >
                <span className="m-icon">person</span>
                <span className="span">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <article className="container">
          <div className="content-left">
            <section
              className="section current-weather"
              aria-label="current weather"
              data-current-weather
            >
              <div className="card card-lg current-weather-card">
                <h2 className="title-2 card-title">Profile</h2>
                <div className="weapper">
                  <p className="heading">Garv</p>
                  <CgProfile size={100} className="weather-icon" />
                </div>
                <p className="body-3">Garv Aggarwal</p>
                <ul className="meta-list">
                  <li className="meta-item">
                    <span className="m-icon">calendar_today</span>
                    <p className="title-3 meta-text">
                      {formatDate(data?.list[0]?.dt_txt)}
                    </p>
                  </li>
                  <li className="meta-item">
                    <span className="m-icon">location_on</span>
                    <p className="title-3 meta-text">
                      {data?.city?.name}, {data?.city?.country}
                    </p>
                  </li>
                </ul>
              </div>
            </section>

            <section
              className="section forecast"
              aria-label="forecast"
              data-5-day-forecast
            >
              <h2 className="title-2" id="forecast-label">
                5 Days Forecast of your location
              </h2>
              <div className="card card-lg forecast-card">
                <ul>
                  {data?.list
                    .filter((item, index) => index % 8 === 0)
                    .map((item) => {
                      return (
                        <li key={item.dt} className="card-item">
                          <div className="icon-wrapper">
                            <img
                              src={icon[item?.weather[0]?.icon]}
                              alt={item?.weather[0]?.description}
                              width="36"
                              height="36"
                              className="weather-icon"
                            />
                            <span className="span">
                              <p className="title-2">
                                {Math.round(item?.main?.temp - 273.15)}&deg;
                                <sup>c</sup>
                              </p>
                            </span>
                          </div>
                          <p className="label-1">
                            {formatShortDate(item?.dt_txt)}
                          </p>
                          <p className="label-1">
                            {new Date(item?.dt_txt)?.toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                              }
                            )}
                          </p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </section>
          </div>
          <div className="content-right">
            <section
              className="section highlights"
              aria-labelledby="highlights-label"
              data-highlights
            >
              <h2 className="title-2" id="highlights-label">
                Favorite Places
              </h2>
              <div className="favorites">
                <div className="SubContainer">
                  <div className="search-box">
                    <p>
                      <FaLocationDot size={20} />
                      <span>New Delhi</span>
                    </p>
                    <RxCross2 size={20} style={{ cursor: "pointer" }} />
                  </div>
                  <div className="weather-box fadeIn">
                    <img src={logo} alt="logo" />
                    <p className="temperature">
                      27&deg;<sup>c</sup>
                    </p>
                    <p className="description">Light Rain</p>
                  </div>

                  <div className="weather-details fadeIn">
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
                <div className="SubContainer">
                  <div className="search-box">
                    <p>
                      <FaLocationDot size={20} />
                      <span>New Delhi</span>
                    </p>
                    <RxCross2 size={20} style={{ cursor: "pointer" }} />
                  </div>
                  <div className="weather-box fadeIn">
                    <img src={logo} alt="logo" />
                    <p className="temperature">
                      27&deg;<sup>c</sup>
                    </p>
                    <p className="description">Light Rain</p>
                  </div>

                  <div className="weather-details fadeIn">
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
                <div className="SubContainer">
                  <div className="search-box">
                    <p>
                      <FaLocationDot size={20} />
                      <span>New Delhi</span>
                    </p>
                    <RxCross2 size={20} style={{ cursor: "pointer" }} />
                  </div>
                  <div className="weather-box fadeIn">
                    <img src={logo} alt="logo" />
                    <p className="temperature">
                      27&deg;<sup>c</sup>
                    </p>
                    <p className="description">Light Rain</p>
                  </div>

                  <div className="weather-details fadeIn">
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
              </div>
            </section>
            <MapBox data={data} />
            <section
              className="section hourly-forecast"
              aria-label="hourly forecast"
              data-hourly-forecast
            >
              <Footer />
            </section>
          </div>
        </article>
      </main>
    </>
  );
};

export default Profile;
