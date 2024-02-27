import logo from "../assests/images/logo.png";
import PropType from "prop-types";

const Header = ({
  search,
  handleSearch,
  active,
  setActive,
  data,
  geoLocation,
}) => {
  return (
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
                  <p className="label-2 item-subtitle">{data?.city?.country}</p>
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
  );
};

Header.propTypes = {
  search: PropType.string.isRequired,
  handleSearch: PropType.func.isRequired,
  active: PropType.bool.isRequired,
  setActive: PropType.func.isRequired,
  data: PropType.object.isRequired,
  geoLocation: PropType.func.isRequired,
};

export default Header;
