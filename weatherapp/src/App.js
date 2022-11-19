import './App.css';
import { Parser } from 'xml2js';
import React, { useState, useEffect } from 'react';
import HourForecastBlock from './components/HourForecastBlock';
import CurrentBlock from './components/CurrentBlock'
import Dropdown from './components/Dropdown';

function addHours(numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}

function msToNextHour() {
  return 3600000 - new Date().getTime() % 3600000;
}

function App() {

  const options = ["Oulunkylä","Kilo","Kasiniemi","Lukonmäki"]

  const [location, setLocation] = useState("Oulunkylä");
  const [forecastData, setForecastData] = useState(null);

  let dataRefreshIntervalId;

  useEffect(() => {
    if (!forecastData) {
      GetForecast();
    }
  }, [location]);

  const GetForecast = async () => {
    console.log("Fetching forecast data" + new Date())

    const url = `https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::harmonie::surface::point::multipointcoverage&place=${location.toLowerCase()}&parameters=WeatherSymbol3,temperature,PrecipitationAmount,WindSpeedMS`
    const response = await fetch(url)
        .then(res => res.text())
        .catch(function() {
          console.log("error");
      })

    let jObj = {}
    let parser = new Parser()
    parser.parseString(response, function (err, result) {
        jObj = JSON.parse(JSON.stringify(result))
    })

    const raw = jObj["wfs:FeatureCollection"]["wfs:member"][0]["omso:GridSeriesObservation"][0]["om:result"][0]["gmlcov:MultiPointCoverage"][0]["gml:rangeSet"][0]["gml:DataBlock"][0]["gml:doubleOrNilReasonTupleList"][0]
    const rawList = raw.split(/\r?\n/);

    let weatherForecast = []
    let hours = 0
    
    rawList.forEach((item) => { 
        const row = item.trim()

        if (row.length === 0) {
          return
        }

        const columns = row.split(' ')
      
        weatherForecast.push({
          date: addHours(hours),
          symbol: columns[0],
          temperature: columns[1],
          rainAmount: columns[2],
          windSpeed: columns[3]
        })
      
        hours++

      })

    //console.log(weatherForecast)
    setForecastData(weatherForecast)

    if(dataRefreshIntervalId) {
      clearInterval(dataRefreshIntervalId)
      dataRefreshIntervalId = null
    }
    
    if (!dataRefreshIntervalId) {
      dataRefreshIntervalId = setInterval(()=>GetForecast(), msToNextHour());
    }
  }

  return (
    <div className="App">
      <div className="nav-bar">
        <Dropdown data = {options} item = {location} setLocation={setLocation} setForecastData={setForecastData} />
      </div>
      <div className="main-container">
        <div className="weather-container">
          {forecastData && forecastData.map( (hour) => <HourForecastBlock data = {hour} /> )}
        </div>
        {forecastData && <CurrentBlock data = {forecastData[0]} />}
      </div>
    </div>
  );
}

export default App;
