const API_KEY =
 '9e8486949c5a1eaeb43896c23c8831c7'

 const makeIconURL = (iconId) =>`https://openweathermap.org/img/wn/${iconId}@2x.png`


 const getFormattedWeatherData = async(city, units = 'metric') => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    const data = await fetch(url)  //fetching API data........
    .then((response) => response.json())
    .then((data)=>data) 

    const {
        weather,
        main: {temp, feels_like, temp_min, temp_max, pressure, humidity},
        wind: {speed},
        sys: {country},
        name,
    } = data;

    const {description, icon, main} = weather[0];

    return { 
        name, 
        country,
        description, 
        iconURL: makeIconURL(icon),
        temp, 
        feels_like, 
        temp_max, 
        temp_min, 
        pressure,
        humidity, 
        speed, 
        main    
    }

 }

 export default getFormattedWeatherData