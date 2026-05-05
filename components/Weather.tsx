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
      <div className="inline-flex w-full flex-col gap-[6px] py-[14px] px-[18px] bg-[rgba(248,250,244,0.72)] border border-[rgba(255,255,255,0.36)] backdrop-blur-[14px] rounded-[16px] shadow-[0_8px_20px_rgba(8,57,72,0.06)] mb-2 text-[0.88rem] dark:bg-[rgba(30,35,40,0.72)] dark:border-[rgba(255,255,255,0.08)] sm:w-auto">
        <div className="flex items-center gap-2">
          <span className="text-[1.5rem]">🌤️</span>
          <span className="text-[1.4rem] font-extrabold text-[color:var(--ocean-dark)] dark:text-heading-dark">--°F</span>
        </div>
        <div className="text-[color:var(--muted)] text-[0.8rem]">📍 Fairfax, VA</div>
      </div>
    );
  }

  return (
    <div className="inline-flex w-full flex-col gap-[6px] py-[14px] px-[18px] bg-[rgba(248,250,244,0.72)] border border-[rgba(255,255,255,0.36)] backdrop-blur-[14px] rounded-[16px] shadow-[0_8px_20px_rgba(8,57,72,0.06)] mb-2 text-[0.88rem] dark:bg-[rgba(30,35,40,0.72)] dark:border-[rgba(255,255,255,0.08)] sm:w-auto">
      <div className="flex items-center gap-2">
        <span className="text-[1.5rem]">{condition.icon}</span>
        <span className="text-[1.4rem] font-extrabold text-[color:var(--ocean-dark)] dark:text-heading-dark">{current.temp}°F</span>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[color:var(--muted)] text-[0.82rem]">
        <span>{condition.label}</span>
        <span>💧 {current.humidity}%</span>
        <span>💨 {current.windSpeed} mph</span>
      </div>
      <div className="text-[color:var(--muted)] text-[0.8rem]">📍 Fairfax, VA</div>
      <div className="grid grid-cols-4 gap-1 mt-[10px] pt-[10px] border-t border-[rgba(8,57,72,0.08)] dark:border-[rgba(255,255,255,0.08)] sm:flex sm:gap-[2px]">
        {forecast.map((day, i) => {
          const dayCondition = weatherCodes[day.weatherCode] || { icon: "🌤️", label: "Clear" };
          return (
            <div
              key={day.date}
              className={`flex flex-col items-center gap-1 py-1 px-[6px] rounded-[10px] min-w-[42px]${i === 0 ? " bg-[rgba(30,107,72,0.08)] dark:bg-[rgba(255,255,255,0.06)]" : ""}`}
            >
              <span className="text-[0.7rem] font-semibold text-[color:var(--muted)] uppercase tracking-[0.02em]">{i === 0 ? "Today" : day.dayName}</span>
              <span className="text-[1rem] leading-none">{dayCondition.icon}</span>
              <span className="text-[0.72rem] text-[color:var(--muted)]">
                <strong className="text-[color:var(--text)] font-bold dark:text-heading-dark">{day.high}°</strong> <span>{day.low}°</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
