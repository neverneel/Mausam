import axios from "axios"

// https://api.open-meteo.com/v1/forecast?daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&hourly=temperature_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m&timeformat=unixtime



export function getWeather(lat, lon, timezone){
    return axios.get("https://api.open-meteo.com/v1/forecast?daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&hourly=temperature_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m&timeformat=unixtime&current_weather=true", {params: {
        latitude: lat,
        longitude: lon,
        timezone: timezone,
    }})
}