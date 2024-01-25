import React from 'react'
import { FaArrowDown, FaArrowUp, FaWind  } from "react-icons/fa"
import { IoSpeedometerOutline } from "react-icons/io5"
import { TiWeatherSnow } from "react-icons/ti"
import { WiHumidity } from "react-icons/wi"
import './Descriptions.css'


const Descriptions = ({weather, units}) => {
const tempUnit = units === 'metric' ? '°C' : '°F'
const windUnit = units === 'metric' ? 'm/s' : 'm/h'

   const card = [
    {
        id: 1,
        icon: <FaArrowDown />,
        title: "min",
        data: weather.temp_min.toFixed(),
        unit: tempUnit,
    },

    {
        id: 2,
        icon: <FaArrowUp />,
        title: "max",
        data: weather.temp_max.toFixed(),
        unit: tempUnit,
    },

    {
        id: 3,
        icon: <TiWeatherSnow />,
        title: "feels like",
        data: weather.feels_like.toFixed(),
        unit: tempUnit,
    },

    {
        id: 4,
        icon: <IoSpeedometerOutline />,
        title: "pressure",
        data: weather.pressure,
        unit: 'hPa',
    },

    {
        id: 5,
        icon: <WiHumidity />,
        title: "humidity",
        data: weather.humidity,
        unit: '%',
    },

    {
        id: 6,
        icon: <FaWind />,
        title: "wind speed",
        data: weather.speed.toFixed(),
        unit: windUnit,
    },
]
  
  return (
    <div className='section section__descriptions'>
        {card.map(({id, icon, title, data, unit}) => (
            <div key={id} className='card'>
                <div className='description__card-icon'> 
                    {icon}                    
                    <small>{title}</small>
                </div>
                <h2>{data} {unit}</h2>
            </div>
        ))}   
    </div>
  )
}

export default Descriptions