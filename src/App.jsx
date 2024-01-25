import hotBg from './assets/hot.jpg'
import coldBg from './assets/cold.jpg'
import cloudBg from './assets/cloud.jpg'
import rainBg from './assets/rain.jpg'
import Description from './components/Descriptions'
import { useEffect, useState } from 'react'
import getFormattedWeatherData from './weatherService'

function App() {
  const [city, setCity]  = useState('Paris')
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState('metric')


  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units)
      setWeather(data)
    }
    fetchWeatherData()
  },[city, units])
  
  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  }

  return (
     <div className='app' style={{backgroundImage: `url(${coldBg})`}}>
        <div className='overlay'>
          {
            weather && (
              <div className='container'>
              <div className='section section__inputs'>
                <input type="text" 
                 name='city' 
                 onChange={(e) => setCity(e.target.value)}
                 placeholder='City / Location...' />

                <button onClick={handleUnitsClick}
                 className='btn'>°F
                </button>

              </div>
  
              <div className='section section__temperature'>
                <div className='icon'>
                  <h3>{weather.name}, {weather.country}</h3>
                  <img src={weather.iconURL} alt="weather icon" />
                  <h3>{weather.description}</h3>
                </div>
                
                <div className="temperature">
                    <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`}</h1>
                </div>
  
              </div>
               {/* bottom description */}
               <Description weather={weather} units={units}/>
            </div>
            )
          }
         
        </div>
     </div>
  )
}

export default App
