import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Thermometer, Calendar, Droplets, Wind, Languages, Cloud, CloudRain, Sun } from 'lucide-react';
import BackgroundWrapper from "./BackgroundWrapper";

const translations = {
  english: {
    dashboard: "Farmer's Dashboard",
    location: "Current Location",
    weather: "Weather",
    soilMoisture: "Soil Moisture",
    temperature: "Temperature",
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    rainfall: "Rainfall Chance",
    forecast: "7-Day Forecast",
    switchToHindi: "हिंदी में बदलें",
    switchToEnglish: "Switch to English",
    today: "Today",
    farmer: "Farmer",
    locationNotFound: "Location access denied or not found, using default",
    soilMoistureLoading: "Loading soil moisture data...",
    soilMoistureError: "Failed to fetch soil moisture data",
  },
  hindi: {
    dashboard: "किसान डैशबोर्ड",
    location: "वर्तमान स्थान",
    weather: "मौसम",
    soilMoisture: "मिट्टी की नमी",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    windSpeed: "हवा की गति",
    rainfall: "वर्षा की संभावना",
    forecast: "7-दिन का पूर्वानुमान",
    switchToHindi: "हिंदी में बदलें",
    switchToEnglish: "Switch to English",
    today: "आज",
    farmer: "किसान",
    locationNotFound: "स्थान तक पहुंच अस्वीकृत या नहीं मिला, डिफ़ॉल्ट का उपयोग कर रहा है",
    soilMoistureLoading: "मिट्टी की नमी डेटा लोड हो रहा है...",
    soilMoistureError: "मिट्टी की नमी डेटा लाने में विफल",
  },
};

const weatherIcons = {
  Clear: <Sun className="w-6 h-6 text-yellow-500" />,
  Clouds: <Cloud className="w-6 h-6 text-gray-500" />,
  Rain: <CloudRain className="w-6 h-6 text-blue-500" />,
  Drizzle: <CloudRain className="w-6 h-6 text-blue-400" />,
  Thunderstorm: <CloudRain className="w-6 h-6 text-purple-500" />,
  Snow: <Cloud className="w-6 h-6 text-white" />,
  Mist: <Cloud className="w-6 h-6 text-gray-400" />,
  Fog: <Cloud className="w-6 h-6 text-gray-400" />,
  default: <Sun className="w-6 h-6 text-yellow-500" />,
};

const Dashboard = () => {
  const [language, setLanguage] = useState("hindi");
  const [location, setLocation] = useState({ state: "", district: "", lat: null, lon: null });
  const [weather, setWeather] = useState({
    temp: 28,
    humidity: 65,
    windSpeed: 12,
    rainfall: 30,
  });
  const [forecast, setForecast] = useState([]);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [soilMoistureLoading, setSoilMoistureLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);
  const t = translations[language];

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
      );
      const data = await response.json();
      const district = data.address.state_district;
      const state = data.address.state;

      if (!district || !state) {
        return { district: "Pune", state: "Maharashtra", isDefault: true };
      }

      return { district, state, isDefault: false };
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      return { district: "Pune", state: "Maharashtra", isDefault: true };
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    setWeatherLoading(true);
    try {
      const apiKey = "54ff8428069ef5ce24a90ed753222063";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Weather API call failed");
      }

      const data = await response.json();
      setWeather({
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        rainfall: data.clouds.all,
        condition: data.weather[0].main,
      });

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      if (!forecastResponse.ok) {
        throw new Error("Forecast API call failed");
      }

      const forecastData = await forecastResponse.json();
      const dailyForecasts = processForecastData(forecastData.list);
      setForecast(dailyForecasts);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather({
        temp: Math.floor(Math.random() * 10) + 25,
        humidity: Math.floor(Math.random() * 30) + 50,
        windSpeed: Math.floor(Math.random() * 15) + 5,
        rainfall: Math.floor(Math.random() * 50),
        condition: "Clear",
      });
      const mockForecast = generateMockForecast();
      setForecast(mockForecast);
    } finally {
      setWeatherLoading(false);
    }
  };

  const processForecastData = (forecastList) => {
    const dailyData = [];
    const processedDates = new Set();

    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toISOString().split("T")[0];

      if (!processedDates.has(dateStr)) {
        processedDates.add(dateStr);
        dailyData.push({
          date: date,
          day: date.toLocaleDateString(language === "english" ? "en-US" : "hi-IN", { weekday: "short" }),
          temp: Math.round(item.main.temp),
          condition: item.weather[0].main,
        });
      }
    });

    return dailyData.slice(0, 7);
  };

  const generateMockForecast = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const conditions = ["Clear", "Clouds", "Rain", "Drizzle"];
    const today = new Date();

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i + 1);
      return {
        date: date,
        day: days[date.getDay()],
        temp: Math.floor(Math.random() * 10) + 25,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
      };
    });
  };

  const fetchSoilMoisture = async (lat, lon) => {
    setSoilMoistureLoading(true);
    try {
      // Simulated API call to a server-side endpoint that queries GEE
      const response = await fetch(`http://127.0.0.1:5000/moisture` , {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          lat : lat,
          lon : lon
        })
      });
      if (!response.ok) {
        throw new Error("Failed to fetch soil moisture data");
      }
      const data = await response.json();
      setSoilMoisture(data.moisture); // Assuming the API returns { moisture: <value> }
    } catch (error) {
      console.error("Error fetching soil moisture data:", error);
      setSoilMoisture(null);
    } finally {
      setSoilMoistureLoading(false);
    }
  };

  const fetchLocationAndData = async () => {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      console.log(latitude);
      console.log(longitude);

      await fetchWeatherData(latitude, longitude);
      await fetchSoilMoisture(latitude, longitude);

      const { district, state, isDefault } = await reverseGeocode(latitude, longitude);
      setLocation({ state, district, lat: latitude, lon: longitude });
      setLocationError(isDefault);
    } catch (error) {
      console.error("Error fetching location:", error);
      setLocationError(true);
      setLocation({ state: "Maharashtra", district: "Pune", lat: 18.5204, lon: 73.8567 });
      await fetchWeatherData(18.5204, 73.8567);
      await fetchSoilMoisture(18.5204, 73.8567);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchLocationAndData();
      setLoading(false);
    };

    loadData();
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "hindi" : "english");
  };

  const getWeatherIcon = (condition) => {
    return weatherIcons[condition] || weatherIcons.default;
  };

  const cardHover = {
    hover: { scale: 1.03, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)" },
  };

  return (
    <BackgroundWrapper darkMode={true}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-2">
              {t.dashboard}
            </h1>
            <p className="text-green-700 dark:text-green-400">{t.farmer}</p>
          </div>
          <button
            onClick={toggleLanguage}
            className="mt-4 md:mt-0 bg-white/80 dark:bg-green-950/0 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/80 transition-all py-2 px-4 rounded"
          >
            <Languages className="inline-block mr-2 h-4 w-4" />
            {language === "english" ? t.switchToHindi : t.switchToEnglish}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            variants={cardHover}
            whileHover="hover"
            className="p-6 bg-white/70 dark:bg-green-950/90 border border-green-200 dark:border-green-800 rounded shadow transition-all"
          >
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
              <h2 className="text-xl font-semibold text-green-800 dark:text-green-300">
                {t.location}
              </h2>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <motion.div
                  className="h-8 w-8 border-4 border-t-green-500 border-r-green-500 border-b-green-300 border-l-green-300 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : (
              <div className="text-green-800 dark:text-green-200">
                <p className="font-medium">
                  {locationError
                    ? t.locationNotFound
                    : `${location.district}, ${location.state}`}
                </p>
                <button
                  onClick={fetchLocationAndData}
                  className="mt-2 text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
                >
                  Refresh Location
                </button>
              </div>
            )}
          </motion.div>

          <motion.div
            variants={cardHover}
            whileHover="hover"
            className="p-6 bg-white/70 dark:bg-green-950/90 border border-green-200 dark:border-green-800 rounded shadow transition-all"
          >
            <div className="flex items-center mb-4">
              <Thermometer className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
              <h2 className="text-xl font-semibold text-green-800 dark:text-green-300">
                {t.weather}
              </h2>
            </div>
            {weatherLoading ? (
              <div className="flex justify-center items-center py-8">
                <motion.div
                  className="h-8 w-8 border-4 border-t-green-500 border-r-green-500 border-b-green-300 border-l-green-300 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-bold text-green-800 dark:text-green-300">
                    {weather.temp}°C
                  </div>
                  <div className="text-5xl">{getWeatherIcon(weather.condition)}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-green-700 dark:text-green-400">{t.humidity}</p>
                    <div className="flex items-center">
                      <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="font-medium">{weather.humidity}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-green-700 dark:text-green-400">{t.windSpeed}</p>
                    <div className="flex items-center">
                      <Wind className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="font-medium">{weather.windSpeed} km/h</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-green-700 dark:text-green-400">{t.rainfall}</p>
                    <div className="flex items-center">
                      <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="font-medium">{weather.rainfall}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-green-700 dark:text-green-400">{t.today}</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="font-medium">
                        {new Date().toLocaleDateString(
                          language === "english" ? "en-US" : "hi-IN",
                          { day: "numeric", month: "short" }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          <motion.div
            variants={cardHover}
            whileHover="hover"
            className="p-6 bg-white/70 dark:bg-green-950/90 border border-green-200 dark:border-green-800 rounded shadow transition-all"
          >
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
              <h2 className="text-xl font-semibold text-green-800 dark:text-green-300">
                {t.forecast}
              </h2>
            </div>
            {weatherLoading ? (
              <div className="flex justify-center items-center py-8">
                <motion.div
                  className="h-8 w-8 border-4 border-t-green-500 border-r-green-500 border-b-green-300 border-l-green-300 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : (
              <div className="flex justify-between overflow-x-auto pb-2">
                {forecast.map((day, index) => (
                  <div key={index} className="flex flex-col items-center min-w-[40px]">
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      {day.day}
                    </span>
                    <span className="text-xl my-1">{getWeatherIcon(day.condition)}</span>
                    <span className="text-sm font-medium text-green-800 dark:text-green-300">
                      {day.temp}°
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          variants={cardHover}
          whileHover="hover"
          className="mb-6 p-6 bg-white/70 dark:bg-green-950/90 border border-green-200 dark:border-green-800 rounded shadow transition-all"
        >
          <div className="flex items-center mb-4">
            <Droplets className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-300">
              {t.soilMoisture}
            </h2>
          </div>
          {soilMoistureLoading ? (
            <div className="flex justify-center items-center py-8">
              <motion.div
                className="h-8 w-8 border-4 border-t-green-500 border-r-green-500 border-b-green-300 border-l-green-300 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="ml-2 text-green-700 dark:text-green-400">{t.soilMoistureLoading}</span>
            </div>
          ) : soilMoisture !== null ? (
            <div className="text-green-800 dark:text-green-200">
              <p className="text-2xl font-bold">{soilMoisture}%</p>
              <p className="mt-2">
                {soilMoisture < 20
                  ? language === "english"
                    ? "Soil is dry. Consider irrigating soon."
                    : "मिट्टी सूखी है। जल्द ही सिंचाई पर विचार करें।"
                  : soilMoisture < 40
                  ? language === "english"
                    ? "Soil moisture is moderate. Monitor closely."
                    : "मिट्टी की नमी मध्यम है। नज़दीकी से निगरानी करें।"
                  : language === "english"
                  ? "Soil moisture is optimal. No immediate action needed."
                  : "मिट्टी की नमी इष्टतम है। तत्काल कार्रवाई की आवश्यकता नहीं है।"}
              </p>
            </div>
          ) : (
            <div className="py-8 text-center text-green-700 dark:text-green-400">
              {t.soilMoistureError}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={cardHover}
          whileHover="hover"
          className="p-6 bg-white/70 dark:bg-green-950/90 border border-green-200 dark:border-green-800 rounded shadow transition-all"
        >
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-300">
              {language === "english" ? "Seasonal Crop Recommendation" : "मौसमी फसल अनुशंसा"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-100/80 dark:bg-green-900/50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                {language === "english" ? "Current Season" : "वर्तमान मौसम"}
              </h3>
              <p className="text-green-700 dark:text-green-400 mb-2">
                {language === "english" ? "Monsoon (June - September)" : "मानसून (जून - सितंबर)"}
              </p>
              <ul className="list-disc list-inside text-green-700 dark:text-green-400">
                <li>{language === "english" ? "Rice" : "चावल"}</li>
                <li>{language === "english" ? "Soybean" : "सोयाबीन"}</li>
                <li>{language === "english" ? "Cotton" : "कपास"}</li>
                <li>{language === "english" ? "Maize" : "मक्का"}</li>
              </ul>
            </div>
            <div className="bg-yellow-100/80 dark:bg-yellow-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                {language === "english" ? "Upcoming Season" : "आगामी मौसम"}
              </h3>
              <p className="text-green-700 dark:text-green-400 mb-2">
                {language === "english" ? "Winter (October - January)" : "सर्दी (अक्टूबर - जनवरी)"}
              </p>
              <ul className="list-disc list-inside text-green-700 dark:text-green-400">
                <li>{language === "english" ? "Wheat" : "गेहूं"}</li>
                <li>{language === "english" ? "Mustard" : "सरसों"}</li>
                <li>{language === "english" ? "Potato" : "आलू"}</li>
                <li>{language === "english" ? "Peas" : "मटर"}</li>
              </ul>
            </div>
            <div className="bg-blue-100/80 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                {language === "english" ? "Market Demand" : "बाजार मांग"}
              </h3>
              <p className="text-green-700 dark:text-green-400 mb-2">
                {language === "english" ? "High Demand Crops" : "उच्च मांग वाली फसलें"}
              </p>
              <ul className="list-disc list-inside text-green-700 dark:text-green-400">
                <li>{language === "english" ? "Organic Vegetables" : "जैविक सब्जियां"}</li>
                <li>{language === "english" ? "Pulses" : "दालें"}</li>
                <li>{language === "english" ? "Oilseeds" : "तिलहन"}</li>
                <li>{language === "english" ? "Medicinal Herbs" : "औषधीय जड़ी-बूटियां"}</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gradient-to-r from-green-100/80 to-blue-100/80 dark:from-green-900/50 dark:to-blue-900/30 rounded-lg">
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
              {language === "english" ? "Personalized Recommendation" : "व्यक्तिगत अनुशंसा"}
            </h3>
            <p className="text-green-700 dark:text-green-400">
              {language === "english"
                ? `Based on your location (${location.district}, ${location.state}) and current weather conditions, we recommend focusing on ${
                    location.state === "Maharashtra" ? "Rice, Cotton, and Soybean" : "Coffee, Rice, and Ragi"
                  } cultivation for optimal yields and market returns.`
                : `आपके स्थान (${location.district}, ${location.state}) और वर्तमान मौसम की स्थिति के आधार पर, हम इष्टतम उपज और बाजार रिटर्न के लिए ${
                    location.state === "Maharashtra" ? "चावल, कपास और सोयाबीन" : "कॉफी, चावल और रागी"
                  } की खेती पर ध्यान केंद्रित करने की सलाह देते हैं।`}
            </p>
          </div>
        </motion.div>
      </div>
    </BackgroundWrapper>
  );
};

export default Dashboard;