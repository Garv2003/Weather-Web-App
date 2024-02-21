import logo from "./assests/images/logo.png";
import logo1 from "./assests/images/weathericon/01d.png";
import logo2 from "./assests/images/weathericon/01n.png";
import logo3 from "./assests/images/weathericon/02d.png";
import logo4 from "./assests/images/weathericon/02n.png";
import logo5 from "./assests/images/weathericon/03d.png";
import logo6 from "./assests/images/weathericon/03n.png";
import logo7 from "./assests/images/weathericon/04d.png";
import logo8 from "./assests/images/weathericon/04n.png";
import logo9 from "./assests/images/weathericon/09d.png";
import logo10 from "./assests/images/weathericon/09n.png";
import logo11 from "./assests/images/weathericon/10d.png";
import logo12 from "./assests/images/weathericon/10n.png";
import logo13 from "./assests/images/weathericon/11d.png";
import logo14 from "./assests/images/weathericon/11n.png";
import logo15 from "./assests/images/weathericon/13d.png";
import logo16 from "./assests/images/weathericon/13n.png";
import logo17 from "./assests/images/weathericon/50d.png";
import logo18 from "./assests/images/weathericon/50n.png";
import logo19 from "./assests/images/weathericon/direction.png";
import logo20 from "./assests/images/openweather.png";
import useSWR from "swr";
import Loader from "./components/Loader/Loader";
import { useState } from "react";
import Error from "./components/Error/Error";

const icon = {
  "01d": logo1,
  "01n": logo2,
  "02d": logo3,
  "02n": logo4,
  "03d": logo5,
  "03n": logo6,
  "04d": logo7,
  "04n": logo8,
  "09d": logo9,
  "09n": logo10,
  "10d": logo11,
  "10n": logo12,
  "11d": logo13,
  "11n": logo14,
  "13d": logo15,
  "13n": logo16,
  "50d": logo17,
  "50n": logo18,
};

const App = () => {
  const [city, setCity] = useState("New Delhi");
  const [url, setUrl] = useState(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=12e8caf17a9f2ac2f2a43f5774fa5918`
  );
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);

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
      ? `http://api.openweathermap.org/data/2.5/air_pollution?lat=${data?.city?.coord?.lat}&lon=${data?.city?.coord?.lon}&appid=12e8caf17a9f2ac2f2a43f5774fa5918`
      : null,
    fetcher,
    { revalidateOnFocus: false },
    { revalidateOnReconnect: false },
    { revalidateOnMount: false }
  );

  if (isLoading || isLoading1) return <Loader />;

  if (error) return <Error setCity={setCity} />;

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

  function QualitativeName(index) {
    switch (index) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Good";
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      debounce(() => {
        setCity(e.target.value);
        setUrl(
          `https://api.openweathermap.org/data/2.5/forecast?q=${e.target.value}&appid=12e8caf17a9f2ac2f2a43f5774fa5918`
        );
        setSearch("");
        setActive(false);
      }, 5000)();
    }
  };

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  function geoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUrl(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=12e8caf17a9f2ac2f2a43f5774fa5918`
        );
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
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
          {/* active */}
          <div
            className={`search-view ${active ? "active" : ""}`}
            data-search-view
          >
            <div className="search-wrapper">
              <span className="m-icon loading-icon">Search</span>
              <input
                type="search"
                name="search"
                placeholder="Search city ..."
                autoComplete="off"
                className={
                  search.length > 0 ? "search-field searching" : "search-field"
                }
                data-search-field
                value={search}
                onChange={handleSearch}
              />
              <button
                className="icon-btn loading-icon has-state"
                aria-label="close search"
                data-search-toggler
                onClick={() => setActive(!active)}
              >
                <span className="m-icon">arrow_back</span>
              </button>
            </div>

            <div className="search-result" data-search-result>
              <ul className="view-list" data-search-list>
                <li className="view-item">
                  <span className="m-icon">location_on</span>
                  <div>
                    <p className="item-title">{data?.city?.name}</p>
                    <p className="label-2 item-subtitle">
                      {/* State of London, */}
                      {data?.city?.country}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="item-link has-state"
                    data-search-toggler
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-actions">
            <button
              className="icon-btn has-state"
              aria-label="open search"
              data-search-toggler
              onClick={() => {
                console.log("clicked");
                setActive(!active);
              }}
            >
              <span className="m-icon icon">Search</span>
            </button>

            <a
              href="#/current-location"
              className="btn-primary has-state disabled"
              data-current-location-btn
              // disabled
              onClick={geoLocation}
            >
              <span className="m-icon">my_location</span>
              <span className="span">Current Location</span>
            </a>
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
                <h2 className="title-2 card-title">Now</h2>
                <div className="weapper">
                  <p className="heading">
                    {Math.round(data?.list[0]?.main?.temp - 273.15)}&deg;
                    <sup>c</sup>
                  </p>
                  <img
                    src={icon[data?.list[0]?.weather[0]?.icon]}
                    alt={data?.list[0]?.weather[0]?.description}
                    width="64"
                    height="64"
                    className="weather-icon"
                  />
                </div>
                <p className="body-3">
                  {data?.list[0]?.weather[0]?.description}
                </p>
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
                5 Days Forecast
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
                Todays Highlights
              </h2>
              <div className="highlight-list">
                <div className="card card-sm highlight-card one">
                  <h3 className="title-3">Air Quality Index</h3>
                  <div className="wrapper">
                    <span className="m-icon">air</span>
                    <ul className="card-list">
                      <li className="card-item">
                        <p className="label-1">CO</p>
                        <p className="title-1">
                          {parseInt(data1?.list[0]?.components?.co)}
                        </p>
                      </li>
                      <li className="card-item">
                        <p className="label-1">NH3</p>
                        <p className="title-1">
                          {parseInt(data1?.list[0]?.components?.nh3)}
                        </p>
                      </li>
                      <li className="card-item">
                        <p className="label-1">NO</p>
                        <p className="title-1">
                          {parseInt(data1?.list[0]?.components?.no)}
                        </p>
                      </li>

                      <li className="card-item">
                        <p className="label-1">NO2</p>
                        <p className="title-1">
                          {parseInt(data1?.list[0]?.components?.no2)}
                        </p>
                      </li>

                      <li className="card-item">
                        <p className="label-1">O3</p>
                        <p className="title-1">
                          {parseInt(data1?.list[0]?.components?.o3)}
                        </p>
                      </li>

                      <li className="card-item">
                        <p className="label-1">SO2</p>
                        <p className="title-1">
                          {parseInt(data1?.list[0]?.components?.so2)}
                        </p>
                      </li>

                      <li className="card-item">
                        <p className="label-1">PM2.5</p>
                        <p className="title-1">
                          {parseInt(data1?.list[0]?.components?.pm2_5)}
                        </p>
                      </li>

                      <li className="card-item">
                        <p className="label-1">PM10</p>
                        <p className="title-1">
                          {parseInt(data1?.list[0]?.components?.pm10)}
                        </p>
                      </li>
                    </ul>
                  </div>

                  <span className="badge aqi-1 label-1" title="aqi message">
                    {QualitativeName(data1?.list[0]?.main?.aqi)}
                  </span>
                </div>

                <div className="card card-sm highlight-card two">
                  <h3 className="title-3">Sunrise & Sunset</h3>
                  <div className="card-list">
                    <div className="card-item">
                      <span className="m-icon">clear_day</span>
                      <div>
                        <p className="label-1">Sunrise</p>
                        <p className="title-1">
                          {new Date(
                            data?.city?.sunrise * 1000
                          ).toLocaleTimeString({
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="card-item">
                      <span className="m-icon">clear_night</span>
                      <div>
                        <p className="label-1">Sunset</p>
                        <p className="title-1">
                          {new Date(
                            data?.city?.sunset * 1000
                          ).toLocaleTimeString({
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card card-sm highlight-card">
                  <h3 className="title-3">Humidity</h3>
                  <div className="wrapper">
                    <span className="m-icon">humidity_percentage</span>
                    <p className="title-1">
                      {data?.list[0]?.main?.humidity}
                      <sub>%</sub>
                    </p>
                  </div>
                </div>
                <div className="card card-sm highlight-card">
                  <h3 className="title-3">Pressure</h3>
                  <div className="wrapper">
                    <span className="m-icon">airwave</span>
                    <p className="title-1">
                      {data?.list[0]?.main?.pressure}
                      <sub>hPa</sub>
                    </p>
                  </div>
                </div>
                <div className="card card-sm highlight-card">
                  <h3 className="title-3">visibility</h3>
                  <div className="wrapper">
                    <span className="m-icon">visibility</span>
                    <p className="title-1">
                      {data?.list[0]?.visibility}
                      <sub>km</sub>
                    </p>
                  </div>
                </div>
                <div className="card card-sm highlight-card">
                  <h3 className="title-3">Feel Like</h3>
                  <div className="wrapper">
                    <span className="m-icon">thermostat</span>
                    <p className="title-1">
                      {Math.round(data?.list[0]?.main?.feels_like - 273.15)}
                      &deg; <sub>c</sub>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="section hourly-forecast"
              aria-label="hourly forecast"
              data-hourly-forecast
            >
              <h2 className="title-2">Today at</h2>
              <div className="slider-container">
                <ul className="slider-list" data-temp>
                  {data?.list?.map((item) => {
                    return (
                      <li key={item.dt} className="slider-item">
                        <div className="card card-sm slider-card">
                          <p className="body-3">
                            {new Date(item?.dt_txt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                          <img
                            src={icon[item?.weather[0]?.icon]}
                            alt=""
                            width="48"
                            height="48"
                            loading="lazy"
                            className="weather-icon"
                            title=""
                          />
                          <p className="body-3">
                            {Math.round(item?.main?.temp - 273.15)}&deg;
                            <sup>c</sup>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <ul className="slider-list" data-wind>
                  {data?.list?.map((item) => {
                    return (
                      <li key={item.dt} className="slider-item">
                        <div className="card card-sm slider-card">
                          <p className="body-3">
                            {new Date(item?.dt_txt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                          <img
                            src={logo19}
                            alt=""
                            width="48"
                            height="48"
                            loading="lazy"
                            className="weather-icon"
                            title=""
                          />
                          <p className="body-3">{item?.wind?.speed} m/s</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <footer className="footer">
                <p className="body-3">
                  Created by{" "}
                  <a
                    href="https://www.linkedin.com/in/garvaggarwal05/"
                    title="Created by Garv Aggarwal"
                  >
                    Garv Aggarwal
                  </a>
                </p>
                <p className="body-3">
                  Powered By{" "}
                  <a
                    href="https://openweathermap.org/"
                    title="Free OpenWeather API"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={logo20}
                      height="30"
                      width="150"
                      alt="OpenWeather"
                      loading="lazy"
                    />
                  </a>
                </p>
              </footer>
            </section>
          </div>
        </article>
      </main>
    </>
  );
};

export default App;
