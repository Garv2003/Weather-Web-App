import logo1 from "../assests/images/weathericon/01d.png";
import logo2 from "../assests/images/weathericon/01n.png";
import logo3 from "../assests/images/weathericon/02d.png";
import logo4 from "../assests/images/weathericon/02n.png";
import logo5 from "../assests/images/weathericon/03d.png";
import logo6 from "../assests/images/weathericon/03n.png";
import logo7 from "../assests/images/weathericon/04d.png";
import logo8 from "../assests/images/weathericon/04n.png";
import logo9 from "../assests/images/weathericon/09d.png";
import logo10 from "../assests/images/weathericon/09n.png";
import logo11 from "../assests/images/weathericon/10d.png";
import logo12 from "../assests/images/weathericon/10n.png";
import logo13 from "../assests/images/weathericon/11d.png";
import logo14 from "../assests/images/weathericon/11n.png";
import logo15 from "../assests/images/weathericon/13d.png";
import logo16 from "../assests/images/weathericon/13n.png";
import logo17 from "../assests/images/weathericon/50d.png";
import logo18 from "../assests/images/weathericon/50n.png";

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

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export { icon, debounce };
