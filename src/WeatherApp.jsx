import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from "react"

export default function WeatherApp() {
    let [weatherInfo, setWeatherInfo] = useState(null);

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