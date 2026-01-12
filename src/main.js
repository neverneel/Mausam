import"./style.css"
import { getWeather } from "./weather";

getWeather(30.744681, 76.665696, Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderWeather).catch(e => {
    console.error(e)
    alert("Error getting weather")
})

function renderWeather({current}){
    renderCurrentWeather(current)
    // renderDailyWeather(daily)
    // renderHouryWeather(hourly)
    document.body.classList.remove("blurred")
}

// function setValue(selector, value, {parent = document} = {}) {
//     parent.querySelector(`[data-${selector}]`).textContent = value
// }

// function renderCurrentWeather(current) {
//     setValue("current-temp", current.currentTemp)
// }

function renderCurrentWeather(current){
    document.querySelector("[data-current-temp]").textContent = current.currentTemp
}