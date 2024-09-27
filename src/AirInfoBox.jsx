import PropTypes from 'prop-types';
import './AirInfoBox.css';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
// MUI Table
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Function to create data for the table rows
function createAirData(name, value) {
  return { name, value };
}

export default function AirInfoBox({ airInfo, weatherInfo, airData }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (airInfo && weatherInfo && airData) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1300); // Simulating a loading state
      return () => clearTimeout(timer);
    }
  }, [airInfo, weatherInfo, airData]);

  if (!airInfo || !weatherInfo || !airData) {
    return null; // Prevent rendering if any of the props are missing
  }

  const rows = [
    createAirData('Carbon Monoxide', airData.co),
    createAirData('Nitrogen Dioxide', airData.no2),
    createAirData('Ozone', airData.o3),
    createAirData('Sulphur Dioxide', airData.so2),
    createAirData('Particulate Matter 2.5', airData.pm2_5),
    createAirData('Particulate Matter 10', airData.pm10),
  ];

  function capitalizeFirstLetter(string) {
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
            {weatherInfo.city && (
              <p>{capitalizeFirstLetter(weatherInfo.city)} Air Quality</p>
            )}
          </div>
          <div className="gifIcon">
            {airInfo.aqi >= 1 && airInfo.aqi <= 50 && (
              <img src="/happy.gif" alt="Good Air Quality" />
            )}
            {airInfo.aqi >= 51 && airInfo.aqi <= 100 && (
              <img src="/good.gif" alt="Moderate Air Quality" />
            )}
            {airInfo.aqi >= 101 && airInfo.aqi <= 150 && (
              <img src="/bored.gif" alt="Moderate Air Quality" />
            )}
            {airInfo.aqi >= 151 && airInfo.aqi <= 200 && (
              <img src="/sad.gif" alt="Unhealthy Air Quality" />
            )}
            <div className="desc">
              {airInfo.aqi >= 1 && airInfo.aqi <= 50 && <p>Very Good</p>}
              {airInfo.aqi >= 51 && airInfo.aqi <= 100 && <p>Good</p>}
              {airInfo.aqi >= 101 && airInfo.aqi <= 150 && <p>Moderate</p>}
              {airInfo.aqi >= 151 && airInfo.aqi <= 200 && <p>Unhealthy</p>}
            </div>
          </div>
          <div className="airInfo">
            <h1>AQI: {airInfo.aqi}</h1>
          </div>
          <div className="airData">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="Air Quality Data">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Particles</StyledTableCell>
                    <StyledTableCell align="center">Value (µg/m³)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </div>
  );
}

AirInfoBox.propTypes = {
  airInfo: PropTypes.shape({
    aqi: PropTypes.number.isRequired,
  }).isRequired,
  weatherInfo: PropTypes.shape({
    city: PropTypes.string.isRequired,
  }).isRequired,
  airData: PropTypes.shape({
    co: PropTypes.number.isRequired,
    no2: PropTypes.number.isRequired,
    o3: PropTypes.number.isRequired,
    so2: PropTypes.number.isRequired,
    pm2_5: PropTypes.number.isRequired,
    pm10: PropTypes.number.isRequired,
  }).isRequired,
};
