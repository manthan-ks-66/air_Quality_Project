import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import AirInfoBox from "./AirInfoBox";
// import WeatherMap from "./WeatherMap";
import { useState } from "react"
import './WeatherApp.css'

export default function WeatherApp() {
    let [weatherInfo, setWeatherInfo] = useState(null);
    let [airInfo, setAirInfo] = useState(null);
    function updateAirInfo ( data ) {
        setAirInfo( data );
    }
    
    function updateWeatherInfo(data) {
        setWeatherInfo(data);
    }

    return (
        <>
            <div className="main">
                <SearchBox updateWeatherInfo={updateWeatherInfo} updateAirInfo={updateAirInfo} />
                <InfoBox  weatherInfo={weatherInfo} />
                <AirInfoBox weatherInfo={weatherInfo} airInfo={airInfo}/>
            </div>
        </>
    )
}