/* eslint-disable react/prop-types */
import useEmblaCarousel from "embla-carousel-react"
import { WEATHERICONSDAY } from "../utils/WeatherIconsDay";
import { WEATHERICONSNIGHT } from "../utils/WeatherIconsNight";

export const WeatherCardFooter = ({ forecast }) => {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className="embla overflow-hidden pt-5 select-none" ref={emblaRef}>
      <div className="embla__container flex flex-row gap-4 md:gap-6">
        {
          forecast.hour.map((hour) => (
            <div key={hour.time_epoch} className="embla__slide flex flex-col justify-center items-center bg-white/15 gap-2 rounded-lg text-white min-w-20 md:min-w-24 px-5 py-3 ">
              <p className="text-md">{hour.time.substring(11)}</p>
              {
                hour.is_day
                  ? WEATHERICONSDAY[hour.condition.text.trim()][1]
                  : WEATHERICONSNIGHT[hour.condition.text.trim()][1]
              }
              <h3 className="text-sm font-semibold">{hour.temp_c}°C</h3>
            </div>
          ))
        }
      </div>
    </div>
  )
}
