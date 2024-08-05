import './InfoBox.css'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';

export default function InfoBox( { weatherInfo } ) {
    let [loading , setLoading] = useState(false);
    function capitalizeFirstLetter(string) {
        if (string.length === 0) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                    <h3>{newCity}</h3>
                    <div className="rightPanel">
                        <FontAwesomeIcon size='lg' icon={faArrowUp} />
                        <div className="maxTemp">
                                <p>Max</p>
                                <p>{Math.floor(weatherInfo.max_temp)}&deg;C</p>
                            </div>
                    </div>
                </div>
                <div className='weatherIcon'>
                {weatherInfo.temp > 15 && (
                    <FontAwesomeIcon size='2x' icon={faCloud} />
                )}
                {weatherInfo.temp > 30 && weatherInfo.humidity < 50 && (
                    <FontAwesomeIcon size='2x' icon={faCloudSun} />
                )}
                {weatherInfo.temp < 15 && (
                    <FontAwesomeIcon size='2x' icon={faSnowflake} />
                )}
                <h1>{Math.floor(weatherInfo.temp)}&deg;C</h1>
                </div>
                <div className="weatherInfoBox">
                    <p>{capitalizeFirstLetter(weatherInfo.description)}</p>
                    <p>Humidity: {weatherInfo.humidity}%</p>
                    <p>Feels Like: {weatherInfo.feelsLike}&deg;C</p>
                    <p>Sunrise: {weatherInfo.sunrise}</p>
                    <p>Sunset: {weatherInfo.sunset}</p>
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
        max_temp: PropTypes.number.isRequired
    }).isRequired,
};