import useSWR from "swr";
import Loader from "./components/Loader/Loader";
import { useState } from "react";
import Error from "./components/Error/Error";
import Header from "./components/Header";
import ContentLeft from "./components/ContentLeft";
import ContentRight from "./components/ContentRight";
import { debounce, icon } from "./utils/utils";

const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [city, setCity] = useState("New Delhi");
  const [url, setUrl] = useState(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      debounce(() => {
        setCity(e.target.value);
        setUrl(
          `https://api.openweathermap.org/data/2.5/forecast?q=${e.target.value}&appid=${API_KEY}`
        );
        setSearch("");
        setActive(false);
      }, 5000)();
    }
  };

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

  return (
    <>
      <Header
        search={search}
        handleSearch={handleSearch}
        setActive={setActive}
        active={active}
        geoLocation={geoLocation}
      />
      <main>
        <article className="container">
          <ContentLeft data={data} icon={icon} />
          <ContentRight data={data} data1={data1} icon={icon} />
        </article>
      </main>
    </>
  );
};

export default App;
