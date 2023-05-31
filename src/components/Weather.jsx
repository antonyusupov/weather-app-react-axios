import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import axios from 'axios';



const Weather = () => {
  const [returnedData, setReturnedData] = useState([]);
  const [searchedCity, setSearchedCity] = useState('53.1,-0.13');


  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {q: searchedCity},
      headers: {
        'X-RapidAPI-Key': YOUR_API_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      setReturnedData(response.data);
    } catch (error) {
      console.error(error);
    }

  }


  const ShownWeather =  ({returnedData}) => {

    const city = returnedData.location.region;
    const temp = returnedData.current.temp_c;
    const condition = returnedData.current.condition.text;
    const icon = returnedData.current.condition.icon;
    const country = returnedData.location.country;
    const windSpeed = returnedData.current.wind_kph;


    return (
      <>
      { !returnedData ? <p>No Data</p> :(
        <div className='shown-weather'>
        <img src={icon} alt='condition'/>
        <h2>{city} {country}</h2>
        <p>Tempreture: {temp} Celcius</p>
        <small>{condition}</small>
        <span>Wind Speed: {windSpeed} kmPh</span>
      </div>
      )}
      </>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = document.getElementById('search').value;
    setSearchedCity(searchValue);
  }



  useEffect(() =>{
    fetchData()
  },[searchedCity])


  return (
    <>
    <div className='container mt-2 weather-main_container'>
      <form onSubmit={handleSubmit}>
          <label htmlFor="search" className="block text-lg font-medium leading-6 text-gray-900">
          Search
          </label>
          <div className="mt-2 search-form">
          <input
              id="search"
              name="search"
              type="text"
              className="search-input"
          />
            <input type='submit' value='Search' className='search-button'/> 
          </div>
        </form>
        <div className='container'>
          <div className='container weather-display_container'>
            <ShownWeather returnedData={returnedData} />
          </div>
        </div>
    </div>
   </> 
  )
}

export default Weather;