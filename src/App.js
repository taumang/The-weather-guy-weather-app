import { useState } from 'react';
import './App.css';

const api ={
  key:"77278187e14ff4191735bfb0e76d7643",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  //Setting the states for the app
  const [query,setQuery] = useState('');
  const [weather,setWeather]=useState({});

  // Search bar the area, and the output will show the current temp of that area
  const search = e =>{
    if(e.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setWeather(result);
        setQuery('');
      });
    }
  }

  //The data fetched from the API when user makes request, when pressing enter after text input.
  const dateBuilder = (d)=>{
    let months =[
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    //getting the data requested by the user.
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    // layout of the output of the data requested.
    return `${day} ${date} ${month} ${year}`;
  }
  return (
    //This condition is to check for whether the area searched for is warm or cold.
    <div 
    className={(typeof weather.main !='undefined')?((weather.main.temp > 15)? 'App warm':'App'):'App'}>
    
    <main>
      {/* Div for the search bar of the application */}
      <div className="search-box">
        <input type="text" 
               className="search-bar"
               placeholder="Enter name of city/town"
               onChange={e => setQuery(e.target.value)}
               value={query}
               onKeyPress={search}
               />
               

      </div>

      <div>
        {/* This condition is checking for whether the data requested by the user has been processed, and if so then, the layout below should show */}
        {(typeof weather.main !="undefined")?(
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>

              <div className="date">
                {dateBuilder(new Date())}
              </div>

            </div>


            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>

              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ):('')}

      </div>
    </main>


    </div>
  );
}

export default App;
