"use client";

import { useEffect, useState } from "react";

// Fairfax, VA coordinates
const LAT = 38.8462;
const LON = -77.3064;

const weatherCodes: Record<number, { icon: string; label: string }> = {
  0: { icon: "☀️", label: "Clear" },
  1: { icon: "🌤️", label: "Mostly Clear" },
  2: { icon: "⛅", label: "Partly Cloudy" },
  3: { icon: "☁️", label: "Overcast" },
  45: { icon: "🌫️", label: "Foggy" },
  48: { icon: "🌫️", label: "Icy Fog" },
  51: { icon: "🌦️", label: "Light Drizzle" },
  53: { icon: "🌦️", label: "Drizzle" },
  55: { icon: "🌧️", label: "Heavy Drizzle" },
  61: { icon: "🌧️", label: "Light Rain" },
  63: { icon: "🌧️", label: "Rain" },
  65: { icon: "🌧️", label: "Heavy Rain" },
  71: { icon: "🌨️", label: "Light Snow" },
  73: { icon: "🌨️", label: "Snow" },
  75: { icon: "❄️", label: "Heavy Snow" },
  80: { icon: "🌦️", label: "Rain Showers" },
  81: { icon: "🌧️", label: "Rain Showers" },
  82: { icon: "⛈️", label: "Heavy Showers" },
  95: { icon: "⛈️", label: "Thunderstorm" },
  96: { icon: "⛈️", label: "Thunderstorm w/ Hail" },
  99: { icon: "⛈️", label: "Severe Thunderstorm" },
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CurrentWeather {
  temp: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
}

interface DayForecast {
  date: string;
  dayName: string;
  high: number;
  low: number;
  weatherCode: number;
}

export default function Weather() {
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<DayForecast[]>([]);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FNew_York`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCurrent({
          temp: Math.round(data.current.temperature_2m),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code,
        });
        setForecast(
          data.daily.time.map((date: string, i: number) => ({
            date,
            dayName: DAY_NAMES[new Date(date + "T12:00:00").getDay()],
            high: Math.round(data.daily.temperature_2m_max[i]),
            low: Math.round(data.daily.temperature_2m_min[i]),
            weatherCode: data.daily.weather_code[i],
          }))
        );
      })
      .catch(() => {});
  }, []);

  const condition = weatherCodes[current?.weatherCode ?? 0] || { icon: "🌤️", label: "Clear" };

  if (!current) {
    return (
      <div className="weather-widget">
        <div className="weather-main">
          <span className="weather-icon">🌤️</span>
          <span className="weather-temp">--°F</span>
        </div>
        <div className="weather-location">📍 Fairfax, VA</div>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <div className="weather-main">
        <span className="weather-icon">{condition.icon}</span>
        <span className="weather-temp">{current.temp}°F</span>
      </div>
      <div className="weather-details">
        <span>{condition.label}</span>
        <span>💧 {current.humidity}%</span>
        <span>💨 {current.windSpeed} mph</span>
      </div>
      <div className="weather-location">📍 Fairfax, VA</div>
      <div className="weather-forecast">
        {forecast.map((day, i) => {
          const dayCondition = weatherCodes[day.weatherCode] || { icon: "🌤️", label: "Clear" };
          return (
            <div key={day.date} className={`weather-forecast-day${i === 0 ? " weather-forecast-day--today" : ""}`}>
              <span className="weather-forecast-label">{i === 0 ? "Today" : day.dayName}</span>
              <span className="weather-forecast-icon">{dayCondition.icon}</span>
              <span className="weather-forecast-temps">
                <strong>{day.high}°</strong> <span>{day.low}°</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
