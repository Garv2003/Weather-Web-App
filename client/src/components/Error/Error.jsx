import "./Error.css";
import PropTypes from "prop-types";

const Error = ({ setUrl, city, API_KEY }) => {
  return (
    <section className="error-content" data-error-content>
      <h2 className="heading">404</h2>
      <p className="body-1">Page not found!</p>
      <a
        href="#"
        className="btn-primary"
        onClick={() =>
          setUrl(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
          )
        }
        data-error-btn
      >
        <span className="span">Go Home</span>
      </a>
    </section>
  );
};

Error.propTypes = {
  setUrl: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  API_KEY: PropTypes.string.isRequired,
};

export default Error;
