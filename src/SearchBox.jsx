import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './SearchBox.css'
import { Button } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';


export default function SearchBox( {updateWeatherInfo, updateAirInfo, updateAirData} ) {
    let [error, setError] = useState(false);
    let [city, setCity] = useState("");
    const API_URL = "http://api.openweathermap.org/geo/1.0/direct"; 
    const AIR_API_URL = "http://api.airvisual.com/v2/nearest_city";
    const API_KEY = "dfba77b3aa31e1beec9333e474be507a";
    const weather_API = "https://api.openweathermap.org/data/2.5/weather";
    const AIR_API_KEY = "9423b326-3ad4-4f25-8a67-63f4c9ba97c6";
    const airDataApi = "http://api.openweathermap.org/data/2.5/air_pollution";

    
    //Sunrise time (converted to local time)
    function sunRiseTime(time) {
        const date = new Date(time * 1000);
        const formattedDate = format(date, 'hh:mm a');
        return formattedDate;
    }

    //Sunset time (converted to local time)
    function sunSetTime(time) {
        const date = new Date(time * 1000);
        const formattedDate = format(date, 'hh:mm a');
        return formattedDate;
    }

    //Handle search button
    function handleClick(event) {
        event.preventDefault();
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
                main: jsonResponse.weather[0].main,
                temp: jsonResponse.main.temp,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                min_temp: jsonResponse.main.temp_min,
                max_temp: jsonResponse.main.temp_max,
                description: jsonResponse.weather[0].description,
                sunset: sunSetTime(jsonResponse.sys.sunset),
                sunrise: sunRiseTime(jsonResponse.sys.sunrise),
                wind_speed: jsonResponse.wind.speed,
                wind_deg: jsonResponse.wind.deg,
            }
        return weatherData;
    }

    //Get the air quality data through latitude and longitude as a parameter
    async function getAQI(lat, lon) { 
        let airResponse = await fetch(`${AIR_API_URL}?lat=${lat}&lon=${lon}&key=${AIR_API_KEY}`);
        let jsonAirResponse = await airResponse.json();
        let airAQI = {
            aqi: jsonAirResponse.data.current.pollution.aqius,
        }
        return airAQI;
    }

    async function getAirData(lat, lon) {
        const airResponse = await fetch(`${airDataApi}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const jsonResponse = await airResponse.json();
        let airData = {
            co: jsonResponse.list[0].components.co,
            no2: jsonResponse.list[0].components.no2,
            o3: jsonResponse.list[0].components.o3,
            so2: jsonResponse.list[0].components.so2,
            pm2_5: jsonResponse.list[0].components.pm2_5,
            pm10: jsonResponse.list[0].components.pm10,
        }
        return airData;
    }

    async function getWeatherCoord() {
            try {
                let response = await fetch(`${API_URL}?q=${city},${"IND"}&limit=5&appid=${API_KEY}`);
                var jsonResponse = await response.json();
                let lat = jsonResponse[0].lat;
                let lon = jsonResponse[0].lon;
                const weatherData = await getWeather(lat, lon);
                const AQI = await getAQI(lat, lon);
                updateWeatherInfo(weatherData);
                updateAirInfo(AQI);
                updateAirData(await getAirData(lat, lon));
            }
            catch(error) {
                setError(true);
            }
    }

//Handles the search button 
        async function handleSubmit(event) {
        event.preventDefault();
        try {
            setCity("");
            await getWeatherCoord();
        } 
        catch (error) {
            setError(true);
            console.log(error);
        }
    }

    return (
        <>
        {error && <Stack  sx={{ width: '65vw' }}><Alert sx={{ display: 'flex', justifyContent: 'center', borderRadius: '20px', marginBottom: '10px' }} severity="error">Sorry, City Not Found</Alert></Stack>}
        <div className='searchBox'>
            <div className='search'>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    
                    autoComplete="off"
                >
                <TextField onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} value={city} onChange={handleClick} id="outlined-basic" label="City Name" variant="outlined" /> 
                </Box>
                <Button className='searchButton' type="submit" onClick={handleSubmit} variant="contained">Search</Button>
            {error}
            </div>
        </div>
        </>
    )
}

SearchBox.propTypes = {
    updateWeatherInfo: PropTypes.func.isRequired,
    updateAirInfo: PropTypes.func.isRequired,
    updateAirData: PropTypes.func.isRequired,
};
  