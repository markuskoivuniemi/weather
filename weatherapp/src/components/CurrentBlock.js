import './CurrentBlock.css'
import  React, { useState , useEffect } from 'react'
import { PresentTemperature } from '../helpers/Functions';

export const CurrentBlock = ({data, date}) => {
    const weekday = ["Sunnuntai","Maanantai","Tiistai","Keskiviikko","Torstai","Perjantai","Lauantai"];
    var [date,setDate] = useState(new Date());

    let day = weekday[date.getDay()];
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }   
    });

    return(
        <div className="current-container">
            <div className="clock">{('0'+date.getHours()).slice(-2)}<br />{('0'+date.getMinutes()).slice(-2)}</div>
            <div className="date">{day}<br />{('0'+date.getDate()).slice(-2) + '.' + ('0'+(date.getMonth()+1)).slice(-2) + '.'}</div>
            <div className="temperature">{PresentTemperature(data.temperature)}</div>
        </div>
    );
}

export default CurrentBlock