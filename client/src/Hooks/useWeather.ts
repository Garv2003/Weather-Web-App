import { useState, useMemo, useRef } from "react";
import { debounce } from "../utils/utils";
import { getRouteApi } from "@tanstack/react-router";
import useSWR from "swr";

const API_KEY = import.meta.env.VITE_API_KEY;

const route = getRouteApi("/city/$name");


export default function useWeather() {
    const { name } = route.useParams();
    const [city, setCity] = useState(name || "New Delhi");
    const debouncedSetCity = useRef<ReturnType<typeof debounce> | null>(null);
    const getUrl = useMemo(() => {
        return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
    }, [city]);

    const [url, setUrl] = useState(getUrl);
    const [search, setSearch] = useState("");
    const [active, setActive] = useState(false);

    const fetcher = async (url: string) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw Error("Something went wrong");
        }
        return res.json();
    };

    const { data, error, isLoading } = useSWR(url, fetcher);

    const { data: data1, isLoading: isLoading1 } = useSWR(
        data
            ? `http://api.openweathermap.org/data/2.5/air_pollution?lat=${data?.city?.coord?.lat}&lon=${data?.city?.coord?.lon}&appid=${API_KEY}`
            : null,
        fetcher
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (e.target.value.length > 0) {
            debouncedSetCity.current = debounce(() => {
                setCity(e.target.value);
                setUrl(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${e.target.value}&appid=${API_KEY}`
                );
                setSearch("");
                setActive(false);
            }, 5000);

            debouncedSetCity.current();
        }
    };

    function geoLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUrl(
                        `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
                    );
                },
                () => {
                    alert(
                        "You have denied access to your location. You will be redirected to the default location."
                    );
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }


    return { data, error, isLoading, data1, isLoading1, city, setCity, debouncedSetCity, setUrl, search, setSearch, active, setActive, handleSearch, geoLocation };
}