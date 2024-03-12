import Loader from "../../components/Loader/Loader";
import Error from "../../components/NotFound/NotFound";
import { icon } from "../../utils/utils";
import Footer from "../../components/Footer";
import { CgProfile } from "react-icons/cg";
import MapBox from "../../components/MapBox";
import Cards from "../../components/Cards";
import logo from "../../assests/images/logo-2.png";
import "./Profile.css";
import useWeather from "../../Hooks/useWeather";
import { formatShortDate, formatDate } from "../../utils/utils";
import { Link } from "@tanstack/react-router";
import { Data } from "../../utils/utils";
import { atom } from "jotai";

export const countAtom = atom(10);

const Profile = () => {
  const { data, isLoading, error, setUrl, geoLocation, isLoading1 } =
    useWeather();

  if (isLoading || isLoading1) return <Loader />;

  if (error) return <Error setUrl={setUrl} city={"New Delhi"} />;

  console.log(countAtom);

  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
          <div className="header-actions">
            <div
              className="btn-primary has-state disabled"
              data-current-location-btn
              style={{ cursor: "pointer" }}
              onClick={geoLocation}
            >
              <span className="m-icon">my_location</span>
              <span className="span">Current Location</span>
            </div>
            <div className="header-actions">
              <div
                className="btn-primary has-state disabled"
                data-current-location-btn
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
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
                  <p
                    className="heading"
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                  >
                    Garv
                  </p>
                  <CgProfile size={100} style={{ marginLeft: "auto" }} />
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
                    .filter((_: any, index: number) => index % 8 === 0)
                    .map((item: Data["list"][0]) => {
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
                <Cards />
                <Cards />
                <Cards />
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
