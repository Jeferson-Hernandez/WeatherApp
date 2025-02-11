import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios'
import { WeatherApp } from './WeatherApp'

axios.defaults.baseURL = 'https://api.weatherapi.com/v1'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherApp />
  </StrictMode>,
)
