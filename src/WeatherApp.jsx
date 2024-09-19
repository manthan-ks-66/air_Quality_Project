import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import AirInfoBox from "./AirInfoBox";
import { useState } from "react"
import TitleBox from "./TitleBox";
import './WeatherApp.css'

export default function WeatherApp() {
    let [weatherInfo, setWeatherInfo] = useState(null);
    let [airInfo, setAirInfo] = useState(null);
    let [airData , setAirData] = useState(null);

    function updateAirData ( data ) {
        setAirData( data );
    }

    function updateAirInfo ( data ) {
        setAirInfo( data );
    }
    
    function updateWeatherInfo(data) {
        setWeatherInfo(data);
    }

    return (
        <>
            <div className="main">
                <TitleBox />
                <SearchBox updateAirData={updateAirData} updateWeatherInfo={updateWeatherInfo} updateAirInfo={updateAirInfo} />
                <InfoBox  weatherInfo={weatherInfo} />
                <AirInfoBox airData={airData} weatherInfo={weatherInfo} airInfo={airInfo}/>
            </div>
        </>
    )
}