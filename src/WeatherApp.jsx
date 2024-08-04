import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from "react"

export default function WeatherApp() {
    let [weatherInfo, setWeatherInfo] = useState({
        city: "",
        temp: "",
        humidity: "",
        feelsLike: "",
        min_temp: "",
        max_temp: "",
        description: "",
        sunrise: "",
    });

    function updateWeatherInfo(data) {
        setWeatherInfo(data);
    }

    return (
        <>
            <SearchBox updateWeatherInfo={updateWeatherInfo} />
            <InfoBox weatherInfo={weatherInfo} />
        </>
    )
}