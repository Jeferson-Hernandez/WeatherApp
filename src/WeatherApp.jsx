/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import axios from "axios"
import { useState, useEffect, useRef } from "react"
import toast, { Toaster } from "react-hot-toast";

import { IoIosSearch } from "react-icons/io";
import { WeatherCardBody } from "./components/WeatherCardBody";
import { WeatherCardFooter } from "./components/WeatherCardFooter";
import { WEATHERICONSDAY } from "./utils/WeatherIconsDay";
import { WEATHERICONSNIGHT } from "./utils/WeatherIconsNight";

export const WeatherApp = () => {
  const KEY = process.env.WEATHER_API

  const [weatherData, setWeatherData] = useState(null)
  const [searchCity, setSearchCity] = useState('')
  const [queryCity, setQueryCity] = useState('')

  const pageRendered = useRef(false)

  useEffect(() => {
    if (pageRendered.current) {
      axios.get(`forecast.json?key=${KEY}&q=${queryCity}&aqi=no&alerts=no`)
        .then(({ data }) => setWeatherData({
          city: data.location.name,
          condition: data.current.condition.text,
          isDay: data.current.is_day,
          humidity: data.current.humidity,
          temp: data.current.temp_c,
          windSpeed: data.current.wind_kph,
          date: data.location.localtime,
          forecast: data.forecast.forecastday[0],
        }))
        .catch(() => notify("City not found"))
    } else {
      pageRendered.current = true
    }
  }, [queryCity])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchCity) {
      notify("Please enter a city")
    } else {
      setQueryCity(searchCity)
      setSearchCity('')
    }
  }

  const bgCardColor = weatherData && weatherData.isDay
    ? [WEATHERICONSDAY[weatherData.condition][2], WEATHERICONSDAY[weatherData.condition][3]]
    : weatherData && !weatherData.isDay
      ? [WEATHERICONSNIGHT[weatherData.condition][2], WEATHERICONSNIGHT[weatherData.condition][3]]
      : ["bg-[#779ECB]", "bg-[#FFFFFF]"]

  return (
    <main className={`w-screen h-screen flex justify-center items-center ${bgCardColor[1]} transition-colors duration-500`}>
      <div className={`${bgCardColor[0]} w-[360px] px-8 py-[16px] rounded-lg sm:w-[400px] md:w-[530px] md:px-16 md:py-[32px] transition-colors duration-500`}>
        <div className="flex flex-row justify-between items-center max-w-72 md:max-w-96  m-auto">
          <form onSubmit={handleSubmit} className="w-full bg-white rounded-full mr-2">
            <input onChange={(e) => setSearchCity(e.target.value)} value={searchCity} className="py-3 px-6 outline-none" placeholder="Search City" />
          </form>
          <div onClick={handleSubmit} className="group hover:bg-gray-200 p-3 bg-white rounded-full transition-colors duration-300">
            <IoIosSearch className="group-hover:fill-gray-600 size-6 transition-colors duration-300" color="gray" />
          </div>
        </div>
        {
          weatherData &&
          (
            <>
              <WeatherCardBody
                city={weatherData.city}
                condition={weatherData.condition}
                isDay={weatherData.isDay}
                humidity={weatherData.humidity}
                temp={weatherData.temp}
                windSpeed={weatherData.windSpeed}
                date={weatherData.date}
              />
              <WeatherCardFooter forecast={weatherData.forecast} />
            </>
          )
        }
      </div>
      <Toaster />
    </main>
  )
}

const notify = (text) => toast.error(text, {
  duration: 3000,
  position: 'top-center',
  style: {
    color: 'white',
    backgroundColor: '#FF6961',
  },
  iconTheme: {
    primary: 'white',
    secondary: '#FF6961',
  }
})