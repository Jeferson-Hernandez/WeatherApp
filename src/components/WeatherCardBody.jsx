/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import { IoIosWater } from "react-icons/io"
import { FaWind } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { WEATHERICONSDAY } from "../utils/WeatherIconsDay"
import { WEATHERICONSNIGHT } from "../utils/WeatherIconsNight"

export const WeatherCardBody = ({ city, condition, isDay, humidity, temp, windSpeed, date }) => {

  return (
    <>
      <div className="flex flex-row justify-between items-center text-white my-7">
        <div className="flex flex-row gap-3 items-center">
          <FaLocationDot className="size-7 md:size-8" />
          <h2 className="text-xl md:text-2xl font-semibold">{city}</h2>
        </div>
        <h4 className="relative text-md md:text-lg">
          {dayjs(date).format("DD MMMM YYYY")}
          <span className="absolute text-sm font-semibold top-6 right-0">{ isDay ? "Day" : "Night"}</span>
        </h4>
      </div>
      <div className="flex flex-row justify-evenly items-center gap-2 md:pt-4 md:gap-10 text-white">
        {
          isDay 
            ? WEATHERICONSDAY[condition][0]
            : WEATHERICONSNIGHT[condition][0]
        }
        <div className="flex flex-col items-end gap-2">
          <div className="flex flex-row items-start gap-2">
            <h3 className="text-5xl md:text-6xl font-bold">{temp}</h3>
            <span className="text-2xl md:text-3xl font-semibold pt-2">°C</span>
          </div>
          <h4 className="font-semibold text-md md:text-lg">{condition}</h4>
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between items-center text-white my-4 md:my-7">
          <div className="flex flex-row gap-3 items-center">
            <IoIosWater className="size-7 md:size-8" />
            <div className="flex flex-col">
              <h4 className="text-md md:text-lg font-semibold">Humidity</h4>
              <h6 className="text-sm">{humidity}%</h6>
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <div className="flex flex-row gap-3 items-center">
              <FaWind className="size-7 md:size-8" />
              <div className="flex flex-col">
                <h4 className="text-md md:text-lg font-semibold">Wind Speed</h4>
                <h6 className="text-sm">{windSpeed} Kph</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
