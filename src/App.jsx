import hotBg from './assets/hot.jpg'
import coldBg from './assets/cold.jpg'
import cloudBg from './assets/cloud.jpg'
import rainBg from './assets/rain.jpg'
import mistyBg from './assets/misty.jpg'
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

  //function to get the background image based on description
  const getBackgroundImage = () => {
    if (weather) {
      const weatherDescription = weather.description.toLowerCase();
  
      switch (weatherDescription) {

        case 'clear sky':
        case 'few clouds':

          return hotBg; 

        case 'scattered clouds':
        case 'broken clouds':
        case 'overcast clouds':
          return cloudBg;

        case 'mist':	
        case 'smoke':	
        case 'haze':	 
        case 'sand/dust whirls':	 
        case 'fog':	 
        case 'sand':	 
        case 'dust':	 
        case 'volcanic': 
        case 'squalls':	 
        case 'tornado':
          return mistyBg; 
        
        case 'light snow':	 	
	      case 'snow': 
        case 'heavy snow':	 
        case 'sleet':
        case 'light shower sleet':	 
        case 'shower sleet':	 
        case 'light rain and snow': 
        case 'rain and snow':	 
        case 'light shower snow':	 
        case 'shower snow': 
        case 'heavy shower snow':
          return coldBg; 
        
        case 'light rain':
        case 'moderate rain':
        case 'heavy intensity rain':
        case 'very heavy rain':
        case 'extreme rain': 
	      case 'freezing rain':	
        case 'light intensity shower rain':	
	      case 'shower rain':
        case 'heavy intensity shower rain': 
	      case 'ragged shower rain':
         return rainBg;
        
        default:
          return cloudBg; // Default to cold background if the description doesn't match any specific case
      }
    }
  }

  return (
     <div className='app' style={{backgroundImage: `url(${getBackgroundImage()})`}}>
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
