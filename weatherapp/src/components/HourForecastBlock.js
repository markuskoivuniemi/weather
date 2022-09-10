import './HourForecastBlock.css'
import React from 'react';
import {Symbols} from '../assets/'
import WindSpeed from '../assets/wind-speed.png'
import Droplet from '../assets/droplet-white.png'
import { PresentTemperature } from '../helpers/Functions';

const HourForecastBlock = ({data}) => {
    const iconIndex = `svg${parseInt(data.symbol)}`

    return(
        <div className="hour-container">
            <div>{data.date.getHours()}.00</div>
            <div>
                <img src={Symbols[iconIndex]} width='55' height='55'/>
            </div>
            <div>{PresentTemperature(data.temperature)}</div>
            <div>{Math.round(data.rainAmount * 10) / 10}<img src={Droplet} width='25px' height='25px'/></div>
            <div>{Math.round(data.windSpeed * 10) / 10}<img src={WindSpeed} width='25px' height='25px'/></div>
        </div>
)
}

export default HourForecastBlock;