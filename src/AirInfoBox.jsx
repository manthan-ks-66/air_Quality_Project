import PropTypes from 'prop-types';
import './AirInfoBox.css';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function AirInfoBox({ airInfo, weatherInfo }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (airInfo && weatherInfo) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1300);
      return () => clearTimeout(timer);
    }
  }, [airInfo, weatherInfo]); // Add weatherInfo to dependencies

  if (!airInfo || !weatherInfo) return null;

  function capitalizeFirstLetter(string) {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="airInfoBox">
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div className="airInfoCity">
            {weatherInfo && weatherInfo.city && (
              <p>{capitalizeFirstLetter(weatherInfo.city)} Air Quality</p>
            )}
          </div>
        <div className="gifIcon">
          {airInfo.aqi >=1 && airInfo.aqi <= 50 && (
            <img src="/happy.gif" alt="error" />
          )}
          {airInfo.aqi >= 51 && airInfo.aqi <= 100 && (
            <img src="/good.gif" alt="error" />
          )}
          <div className="desc">
            {airInfo.aqi >= 1 && airInfo.aqi <= 50 && (
              <p>Very Good</p>
            )}
            {airInfo.aqi >= 51 && airInfo.aqi <= 100 && (
              <p>Good</p>
            )}
            {airInfo.aqi >= 101 && airInfo.aqi <= 150 && (
              <p>Mderate</p>
            )}
            {airInfo.aqi >= 151 && airInfo.aqi <= 200 && (
              <p>Unhealthy</p>
            )}
          </div>
        </div>
          <div className="airInfo">
            {airInfo ? (
              <>
                <h1>AQI: {airInfo.aqi}</h1>
              </>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
  
}

AirInfoBox.propTypes = {
  airInfo: PropTypes.object,
  weatherInfo: PropTypes.object,
};
