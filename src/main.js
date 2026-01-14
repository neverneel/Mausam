import"./style.css"
import { getWeather } from "./weather";
import { ICON_MAP } from "./iconMap";

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

function setValue(selector, value, {parent = document} = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(iconCode){
    return `icons/${ICON_MAP.get(iconCode)}.svg`
}

const currentIcon = document.querySelector("[data-current-icon]")
function renderCurrentWeather(current) {
    currentIcon.src = getIconUrl(current.iconCode)
    setValue("current-temp", current.currentTemp)
    setValue("current-high", current.highTemp)
    setValue("current-low", current.lowTemp)
    setValue("current-fl-high", current.highFeelsLike)
    setValue("current-fl-low", current.lowFeelsLike)
    setValue("current-wind", current.windSpeed)
    setValue("current-precip", current.precip)
}

// function renderCurrentWeather(current){
//     document.querySelector("[data-current-temp]").textContent = current.currentTemp
// }


const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {weekday: "short"})
const dailySection = document.querySelector("[data-day-section]")
const dayCardTemplate = document.getElementById("day-card-template")
function renderDailyWeather(daily) {
    dailySection.innerHTML = ""
    daily.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true)
        setValue("temp", day.maxTemp, {parent: element})
        setValue("date", DAY_FORMATTER.format(day.timestamp), {parent: element})
        element.querySelector("[data.icon]").src = getIconUrl(day.iconCode)
        dailySection.append(element)
    })
}



const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {hour: "shortnumeric"})
const hourlySection = document.querySelector("[data-hour-section]")
const hourRowTemplate = document.getElementById("hour-row-template")
function renderHourlyWeather(daily) {
    hourlySection.innerHTMl = ""
    hourly.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true)
        setValue("temp", hour.temp, {parent: element})
        setValue("fl-temp", hour.feelsLikeTemp, {parent: element})
        setValue("wind", hour.windSpeed, {parent: element})
        setValue("precip", hour.precip, {parent: element})
        setValue("day", DAY_FORMATTER.format(hour.timestamp), {parent: element})
        setValue("time", HOUR_FORMATTER.format(hour.timestamp), {parent: element})
        element.querySelector("[data.icon]").src = getIconUrl(day.iconCode)
        hourlySection.append(element)
})
}