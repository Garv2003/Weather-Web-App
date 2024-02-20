import logo from "./assests/images/logo.png";
import logo1 from "./assests/images/weathericon/01d.png";
import logo3 from "./assests/images/weathericon/01n.png";
import logo4 from "./assests/images/weathericon/01n.png";
import logo5 from "./assests/images/weathericon/direction.png";
import logo6 from "./assests/images/openweather.png";

const APIText = {
  1: {
    level: "Good",
    message:
      "Air quality is considered satisfactory, and air pollution poses little or no risk",
  },
  2: {
    level: "Fair",
    message:
      "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
  },
  3: {
    level: "Moderate",
    message:
      "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
  },
  4: {
    level: "Poor",
    message:
      "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.",
  },
  5: {
    level: "Very Poor",
    message:
      "Health alert: The risk of health effects is increased for everyone.",
  },
};

const App = () => {
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
          <div className="search-view" data-search-view>
            <div className="search-wrapper">
              <input
                type="search"
                name="search"
                placeholder="Search city ..."
                autoComplete="off"
                className="search-field"
                // searching
                data-search-field
              />
              <span className="m-icon loading-icon">Search</span>
              <button
                className="icon-btn loading-icon has-state"
                aria-label="close search"
                data-search-toggler
              >
                <span className="m-icon">arrow_back</span>
              </button>
            </div>

            <div className="search-result" data-search-result>
              <ul className="view-list" data-search-list>
                <li className="view-item">
                  <span className="m-icon">location_on</span>
                  <div>
                    <p className="item-title">London</p>
                    <p className="label-2 item-subtitle">State of London, GB</p>
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
            >
              <span className="m-icon icon">Search</span>
            </button>

            <a
              href="#/current-location"
              className="btn-primary has-state"
              data-current-location-btn
              // disabled
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
                    25&deg;
                    <sup>c</sup>
                  </p>
                  <img
                    src={logo1}
                    alt="Overcast Clouds"
                    width="64"
                    height="64"
                    className="weather-icon"
                  />
                </div>

                <p className="body-3">Overcast Clouds</p>

                <ul className="meta-list">
                  <li className="meta-item">
                    <span className="m-icon">calendar_today</span>
                    <p className="title-3 meta-text">Thursday 16, Feb</p>
                  </li>
                  <li className="meta-item">
                    <span className="m-icon">location_on</span>
                    <p className="title-3 meta-text">London, GB</p>
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
                  <li className="card-item">
                    <div className="icon-wrapper">
                      <img
                        src={logo3}
                        alt="Overcast Clouds"
                        width="36"
                        height="36"
                        className="weather-icon"
                      />
                      <span className="span">
                        <p className="title-2">25</p>
                      </span>
                    </div>

                    <p className="label-1">17 Feb</p>
                    <p className="label-1">Friday</p>
                  </li>
                  <li className="card-item">
                    <div className="icon-wrapper">
                      <img
                        src={logo3}
                        alt="Overcast Clouds"
                        width="36"
                        height="36"
                        className="weather-icon"
                      />
                      <span className="span">
                        <p className="title-2">25</p>
                      </span>
                    </div>

                    <p className="label-1">17 Feb</p>
                    <p className="label-1">Friday</p>
                  </li>
                  <li className="card-item">
                    <div className="icon-wrapper">
                      <img
                        src={logo3}
                        alt="Overcast Clouds"
                        width="36"
                        height="36"
                        className="weather-icon"
                      />
                      <span className="span">
                        <p className="title-2">25</p>
                      </span>
                    </div>

                    <p className="label-1">17 Feb</p>
                    <p className="label-1">Friday</p>
                  </li>
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
                        <p className="title-1">23.3</p>
                        <p className="label-1">
                          PM <sub>2.5</sub>
                        </p>
                      </li>
                      <li className="card-item">
                        <p className="title-1">23.3</p>
                        <p className="label-1">
                          PM <sub>2.5</sub>
                        </p>
                      </li>
                      <li className="card-item">
                        <p className="title-1">23.3</p>
                        <p className="label-1">
                          PM <sub>2.5</sub>
                        </p>
                      </li>
                      <li className="card-item">
                        <p className="title-1">23.3</p>
                        <p className="label-1">
                          PM <sub>2.5</sub>
                        </p>
                      </li>
                      <li className="card-item">
                        <p className="title-1">23.3</p>
                        <p className="label-1">
                          PM <sub>2.5</sub>
                        </p>
                      </li>
                      <li className="card-item">
                        <p className="title-1">23.3</p>
                        <p className="label-1">
                          PM <sub>2.5</sub>
                        </p>
                      </li>
                    </ul>
                  </div>

                  <span className="badge aqi-1 label-1" title="aqi message">
                    Good
                  </span>
                </div>

                <div className="card card-sm highlight-card two">
                  <h3 className="title-3">Sunrise & Sunset</h3>
                  <div className="card-list">
                    <div className="card-item">
                      <span className="m-icon">clear_day</span>
                      <div>
                        <p className="label-1">Sunrise</p>
                        <p className="title-1">6:30 AM</p>
                      </div>
                    </div>
                    <div className="card-item">
                      <span className="m-icon">clear_night</span>
                      <div>
                        <p className="label-1">Sunset</p>
                        <p className="title-1">6:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card card-sm highlight-card">
                  <h3 className="title-3">Humidity</h3>
                  <div className="wrapper">
                    <span className="m-icon">humidity_percentage</span>
                    <p className="title-1">
                      35 <sub>%</sub>
                    </p>
                  </div>
                </div>
                <div className="card card-sm highlight-card">
                  <h3 className="title-3">Pressure</h3>
                  <div className="wrapper">
                    <span className="m-icon">airwave</span>
                    <p className="title-1">
                      1052 <sub>hPa</sub>
                    </p>
                  </div>
                </div>
                <div className="card card-sm highlight-card">
                  <h3 className="title-3">visibility</h3>
                  <div className="wrapper">
                    <span className="m-icon">visibility</span>
                    <p className="title-1">
                      10 <sub>km</sub>
                    </p>
                  </div>
                </div>
                <div className="card card-sm highlight-card">
                  <h3 className="title-3">Feel Like</h3>
                  <div className="wrapper">
                    <span className="m-icon">thermostat</span>
                    <p className="title-1">
                      25&deg <sub>c</sub>
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
                  <li className="slider-item">
                    <div className="card card-sm slider-card">
                      <p className="body-3">03 PM</p>

                      <img
                        src={logo4}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">25&deg;</p>
                    </div>
                  </li>
                  <li className="slider-item">
                    <div className="card card-sm slider-card">
                      <p className="body-3">03 PM</p>

                      <img
                        src={logo4}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">25&deg;</p>
                    </div>
                  </li>
                  <li className="slider-item">
                    <div className="card card-sm slider-card">
                      <p className="body-3">03 PM</p>

                      <img
                        src={logo4}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">25&deg;</p>
                    </div>
                  </li>
                  <li className="slider-item">
                    <div className="card card-sm slider-card">
                      <p className="body-3">03 PM</p>

                      <img
                        src={logo4}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">25&deg;</p>
                    </div>
                  </li>
                  <li className="slider-item">
                    <div className="card card-sm slider-card">
                      <p className="body-3">03 PM</p>

                      <img
                        src={logo4}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">25&deg;</p>
                    </div>
                  </li>
                </ul>

                <ul className="slider-list" data-wind>
                  <li className="slider-item">
                    <div className="card card-sm slider-card">
                      <p className="body-3">03 PM</p>
                      <img
                        src={logo5}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">12 km/h</p>
                    </div>
                  </li>
                  <li className="slider-item">
                    <div className="card card-sm slider-card">
                      <p className="body-3">03 PM</p>
                      <img
                        src={logo5}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">12 km/h</p>
                    </div>
                  </li>
                  <li className="slider-item">
                    <div className="card card-sm slider-card">
                      <p className="body-3">03 PM</p>
                      <img
                        src={logo5}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">12 km/h</p>
                    </div>
                  </li>
                  <li className="slider-item">
                    <div className="card card-sm slider-card">
                      <p className="body-3">03 PM</p>
                      <img
                        src={logo5}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">12 km/h</p>
                    </div>
                  </li>
                  <li className="slider-item">
                    <div className="card card-sm slider-card">
                      <p className="body-3">03 PM</p>
                      <img
                        src={logo5}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">12 km/h</p>
                    </div>
                  </li>
                  <li className="slider-item">
                    <div className="card card-sm slider-card">
                      <p className="body-3">03 PM</p>
                      <img
                        src={logo5}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">12 km/h</p>
                    </div>
                  </li>
                  <li className="slider-item">
                    <div className="card card-sm slider-card">
                      <p className="body-3">03 PM</p>
                      <img
                        src={logo5}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">12 km/h</p>
                    </div>
                  </li>
                  <li className="slider-item">
                    <div className="card card-sm slider-card">
                      <p className="body-3">03 PM</p>
                      <img
                        src={logo5}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">12 km/h</p>
                    </div>
                  </li>
                  <li className="slider-item">
                    <div
                      className="card card-sm slider-card"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <p className="body-3">03 PM</p>
                      <img
                        src={logo5}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                        className="weather-icon"
                        title=""
                      />
                      <p className="body-3">12 km/h</p>
                    </div>
                  </li>
                </ul>
              </div>
              <footer className="footer">
                <p className="body-3">Created by Garv Aggarwal</p>
                <p className="body-3">
                  Powered By{" "}
                  <a
                    href="https://openweathermap.org/"
                    title="Free OpenWeather API"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={logo6}
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
