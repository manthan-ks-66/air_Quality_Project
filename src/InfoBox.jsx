import './InfoBox.css'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function InfoBox( { weatherInfo } ) {
    let [loading , setLoading] = useState(false);
    function capitalizeFirstLetter(string) {
        if (string.length === 0) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const weatherIcon = {
        'rain': "/rain.gif",
        'clouds': "/cloudy.gif", 
        'mist': '/foggy.gif',
        'snow': '/winter.gif',
        'storm': '/storm.gif',
        'hot': '/sun.gif',
    }

    useEffect(() => {
        if(weatherInfo) {
            setLoading(true);
            const timer = setTimeout(() => {
                setLoading(false);
            },1300);
            return () => clearTimeout(timer);
        }
    },[weatherInfo]);

    if(!weatherInfo) return null

    let newCity = capitalizeFirstLetter(weatherInfo.city);
      
    return (
         <div className='infoBox'>
         {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                <div className="upperInfo">
                    <div className="leftPanel">
                        <FontAwesomeIcon size='lg' icon={faArrowDown} />
                            <div className="minTemp">
                                <p>Min</p>
                                <p>{Math.floor(weatherInfo.min_temp)}&deg;C</p>
                            </div>
                    </div>
                    <p className='cityName'>{newCity} Climate</p>
                    <div className="rightPanel">
                        <FontAwesomeIcon size='lg' icon={faArrowUp} />
                        <div className="maxTemp">
                                <p>Max</p>
                                <p>{Math.floor(weatherInfo.max_temp)}&deg;C</p>
                            </div>
                    </div>
                </div>
                    <div className='weatherIcon'>
                    {weatherInfo.main === 'Clear' ? (
                        <img src={weatherIcon['clouds']} alt="Clouds" />
                    ) : weatherInfo.main === 'Rain' ? (
                        <img src={weatherIcon['rain']} alt="Rain" />
                    ) : weatherInfo.main === 'Mist' ? (
                        <img src={weatherIcon['mist']} alt="Mist" />
                    ) : weatherInfo.main === 'Snow' ? (
                        <img src={weatherIcon['snow']} alt="Snow" />
                    ) : weatherInfo.main === 'Thunderstorm' ? (
                        <img src={weatherIcon['storm']} alt="Storm" />
                    ) : weatherInfo.main === 'Clear' ? (
                        <img src={weatherIcon['clouds']} alt="cloudy" />
                    ) : (
                        <img src={weatherIcon['clouds']} alt="clouds" />
                    )}
                <h1>{Math.floor(weatherInfo.temp)}&deg;C</h1>
                </div>
                <div className="description">
                    <p>{capitalizeFirstLetter(weatherInfo.description)}</p>
                 </div>
                <div className="weatherInfoBox">
                    <p>Humidity: {weatherInfo.humidity}%</p>
                    <p>Feels Like: {Math.floor(weatherInfo.feelsLike)}&deg;C</p>
                    <p>Sunrise At: {weatherInfo.sunrise}</p>
                    <p>Sunset At: {weatherInfo.sunset}</p>
                </div>
                <div className="windInfo">
                    <div className="windSpeed">
                    <img src="/wind.gif" alt="" />
                    <p>Wind Speed: {weatherInfo.wind_speed} m/s</p>
                    </div>
                    <div className="windDegree">
                        <img src="/wind-power.gif" alt="error" />
                        <p>Wind Degree: {weatherInfo.wind_deg}&deg;</p>
                    </div>
                </div>
                </>
        )}
         </div>
        
    )
}
InfoBox.propTypes = {
    weatherInfo: PropTypes.shape({
        city: PropTypes.string.isRequired,
        temp: PropTypes.number.isRequired,
        humidity: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        sunrise: PropTypes.string.isRequired,
        sunset: PropTypes.string.isRequired,
        feelsLike: PropTypes.number.isRequired,
        min_temp: PropTypes.number.isRequired,
        max_temp: PropTypes.number.isRequired,
        main: PropTypes.string.isRequired,
        wind_speed: PropTypes.number.isRequired,
        wind_deg: PropTypes.number.isRequired,
    }).isRequired,
};