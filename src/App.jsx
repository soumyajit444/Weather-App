import { useState } from "react";

const api = {
  key: import.meta.env.VITE_API_KEY,
  base: import.meta.env.VITE_BASE_URL,
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [iconUrl, setIconUrl] = useState(
    "http://openweathermap.org/img/wn/02d@4x.png"
  ); // Default cloud icon

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setIconUrl(getWeatherIcon(result.weather[0].icon)); // Update icon with fetched data
      });
  };

  const clearSearch = () => {
    setSearch("");
    setWeather({});
    setIconUrl("http://openweathermap.org/img/wn/02d@4x.png"); // Reset to default icon
  };

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 flex flex-col items-center justify-center">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col justify-between">
        <header className="text-center mb-6">
          {/* Weather Icon */}
          <img
            src={iconUrl}
            alt="Weather Icon"
            className="mx-auto mb-4 w-120 h-120"
          />

          {/* Weather Information */}
          <div className="text-center">
            {/* If weather data is available, display the details */}
            {typeof weather.main !== "undefined" ? (
              <div>
                {/* Location */}
                <p className="text-2xl font-semibold text-gray-900 mb-2">
                  {weather.name}
                </p>

                {/* Temperature Celsius */}
                <p className="text-5xl font-bold text-gray-900 mb-2">
                  {weather.main.temp}°C
                </p>

                {/* Condition (Sunny ) */}
                <p className="text-lg text-gray-800 mb-1">
                  {weather.weather[0].main}
                </p>
                <p className="text-sm text-gray-600">
                  ({weather.weather[0].description})
                </p>
              </div>
            ) : (
              <p className="font-roboto text-2xl text-center text-gray-900">
                Please enter a city to get weather information.
              </p>
            )}
          </div>
        </header>

        {/* Search Box - Input + Button + Clear */}
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          <button
            onClick={searchPressed}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Search
          </button>
          <button
            onClick={clearSearch}
            className="bg-amber-500 text-black px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Clear
          </button>
        </div>
      </div>
      <h1 className="text-6xl font-light text-white mt-10">Weather App</h1>
    </div>
  );
}

export default App;
