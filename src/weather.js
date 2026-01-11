import axios from "axios"

// https://api.open-meteo.com/v1/forecast?daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&hourly=temperature_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m&timeformat=unixtime



export function getWeather(lat, lon, timezone){
    return axios.get("https://api.open-meteo.com/v1/forecast?daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&hourly=temperature_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m&timeformat=unixtime&current_weather=true", {params: {
        latitude: lat,
        longitude: lon,
        timezone: timezone,
    }}).then(({data}) => {
        return data
        return {
            current: parseCurrentWeather(data),
            daily: parseDailyWeather(data),
            // hourly: parseHourlyWeather(data)
        }
    })
}

function parseCurrentWeather({ current_weather, daily}) {
    const{ 
        temperature: currentTemp,
        windspeed: windSpeed,
        weathercode: iconCode
    } = current_weather
    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLike],
        apparent_temperature_min: [minFeelsLike],
        precipitation_sum: [precip],
    } = daily

    return{
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: minTemp,
        highFeelsLike: Math.round(maxFeelsLike),
        lowFeelsLike: Math.round(minFeelsLike),
        windSpeed :Math.round(windSpeed),
        precip: Math.round(precip*100) / 100,
        iconCode,
    }
}

function parseDailyWeather({daily}) {
    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: daily.weather_code[index],
            maxTemp: Math.round(daily.temperature_2m_max[index])
        }
    })
}