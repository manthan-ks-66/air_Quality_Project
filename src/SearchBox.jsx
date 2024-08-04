import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './SearchBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

export default function SearchBox( {updateWeatherInfo} ) {
    let [error, setError] = useState(false);
    let [city, setCity] = useState("");
    const API_URL = "http://api.openweathermap.org/geo/1.0/direct";
    const API_KEY = "dfba77b3aa31e1beec9333e474be507a";
    const weather_API = "https://api.openweathermap.org/data/2.5/weather";

    //Sunrise time (converted to local time)
    function sunRiseTime(time) {
        const date = new Date(time * 1000);
        const formattedDate = format(date, 'PPPpp');
        return formattedDate;
    }

    //Sunset time (converted to local time)
    function sunSetTime(time) {
        const date = new Date(time * 1000);
        const formattedDate = format(date, 'PPPpp');
        return formattedDate;
    }

    //Handle search button
    function handleClick(event) {
        setCity(event.target.value);
        setError(false);
        setCity(event.target.value);
    } 

    //Get the weather data through latitude and longitude as a parameter
    async function getWeather(lat, lon) {
            let weatherResponse = await fetch(`${weather_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await weatherResponse.json();
            let weatherData = {
                city: city,
                temp: jsonResponse.main.temp,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                min_temp: jsonResponse.main.temp_min,
                max_temp: jsonResponse.main.temp_max,
                description: jsonResponse.weather[0].description,
                sunset: sunSetTime(jsonResponse.sys.sunset),
                sunrise: sunRiseTime(jsonResponse.sys.sunrise),
            }
        return weatherData;
    }

    async function getWeatherCoord() {
            try {
                let response = await fetch(`${API_URL}?q=${city},${"IND"}&limit=5&appid=${API_KEY}`);
                var jsonResponse = await response.json();
                let lat = jsonResponse[0].lat;
                let lon = jsonResponse[0].lon;
                await getWeather(lat, lon);
                updateWeatherInfo(await getWeather(lat, lon));
            }
            catch(error) {
                setError(true);
            }
    }

        async function handleSubmit(event) {
        try {
            event.preventDefault();
            setCity("");
            getWeatherCoord();
        } 
        catch (error) {
            setError(true);
        }
    }

    return (
        <>
        {error && <Stack sx={{ width: '100%' }}><Alert severity="error">City Not Found</Alert></Stack>}
        <div className='searchBox'>
            <div className='app-logo'>
                <FontAwesomeIcon icon={faCloud} />
                <h2>WEATHER APP</h2>
            </div>
            <div className='search'>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    
                    autoComplete="off"
                >
                <TextField value={city} onChange={handleClick} id="outlined-basic" label="City Name" variant="outlined" /> 
                </Box>
                <Button type="submit" onClick={handleSubmit} variant="contained">Search</Button>
            {error}
            </div>
        </div>
        </>
    )
}

SearchBox.propTypes = {
    updateWeatherInfo: PropTypes.func.isRequired,
  };
  