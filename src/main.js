import"./style.css"
import { getWeather } from "./weather";

getWeather(30.744681, 76.665696, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
    res => {
    console.log(res.data)
})