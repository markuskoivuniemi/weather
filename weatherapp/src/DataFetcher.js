import React, { useState } from 'react';
import parseString from 'xml2js';

const DataFetcher = () => {

    const [xmlStr, setXml] = useState("lol");

    const GetWeatherForecast = async () => {
        const url = "http://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::harmonie::surface::point::multipointcoverage&place=oulunkylä&parameters=WeatherSymbol3,temperature,PrecipitationAmount,WindSpeedMS"
        const response = await fetch(url)
            .then(res => res.text())

        //console.log(response)
        
        const parseString = require('xml2js').parseString

        let jObj = {}
        parseString(response, function (err, result) {
            console.log(result)
            console.log("KIK")
            console.log(JSON.stringify(result))
            console.log("KOK")
            jObj = JSON.parse(JSON.stringify(result))
            console.log(jObj)
            console.log("KUK")
            console.log(jObj["wfs:FeatureCollection"]["wfs:member"][0]["omso:GridSeriesObservation"][0]["om:result"][0]["gmlcov:MultiPointCoverage"][0]["gml:rangeSet"][0]["gml:DataBlock"][0]["gml:doubleOrNilReasonTupleList"][0])
            
            console.log("Atta boooeeeee")
            const raw = jObj["wfs:FeatureCollection"]["wfs:member"][0]["omso:GridSeriesObservation"][0]["om:result"][0]["gmlcov:MultiPointCoverage"][0]["gml:rangeSet"][0]["gml:DataBlock"][0]["gml:doubleOrNilReasonTupleList"][0]
            const rawList = raw.split(/\r?\n/);
            console.log(rawList)

            var weather = rawList.map(function(item) {
                const row = item.trim()
                const columns = row.split(' ')
                
                return {
                  symbol: columns[0],
                  temperature: columns[1],
                  rainAmount: columns[2],
                  windSpeed: columns[3]
                }
              })

            weather.shift()
            weather.pop()
            
            console.log(weather)
        
        })

        setXml(response)
    }
    
    return(
        <div>
            <button onClick={() => GetWeatherForecast()}>
                kek
            </button>
            {xmlStr}
        </div>
    )
};

export default DataFetcher;