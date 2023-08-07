import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";
import PostedNewsImage from "../Navigations/Assets/poster news.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faSun,
  faCloud as faCloudRegular,
  faCloud,
  faCloudSun,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";
import Chart from "chart.js/auto";
import Newsletter from "../Newsletter";
import Footer from "../Footer";
import axios from "axios";
import LearningCenterImage from "../Navigations/Assets/learn image.jpg";

const weatherIcons = {
  Clear: faSun,
  Clouds: faCloud,
  sunny: faCloudSun,
  Drizzle: faCloudShowersHeavy,
  Rain: faCloudShowersHeavy,
  Thunderstorm: faCloudShowersHeavy,
  Snow: faCloudShowersHeavy,
  Mist: faCloudRegular,
  Smoke: faCloudRegular,
  Haze: faCloudRegular,
  Dust: faCloudRegular,
  Fog: faCloudRegular,
  Sand: faCloudRegular,
  Ash: faCloudRegular,
  Squall: faCloudRegular,
  Tornado: faCloudRegular,
};
const CITY_NAME = "Ado, NG"; // Replace with your desired city name
const API_KEY = "0069c7215595a16172415930eed74afa";

export default function MarketNews() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Store the Chart instance
  const latestNews = [
    {
      id: 1,
      title: "The Future of Vertical Farming in Agriculture",
      image: "https://via.placeholder.com/300",
      category: "Agriculture",
      postedMinutesAgo: "30 minutes ago",
      readMinute: "4mins read",
      paragraph:
        "Vertical farming has emerged as a potential solution to the challenges faced by traditional agriculture. By growing crops in stacked layers or vertically inclined surfaces, it allows for efficient use of space and resources. This technology-driven approach is seen as a promising way to increase food production and minimize environmental impact. With advancements in hydroponics, aeroponics, and automation, vertical farming is shaping the future of agriculture.",
    },
    {
      id: 2,
      title: "The Impact of Technology on Modern Farming",
      image: "https://via.placeholder.com/300",
      category: "Technology",
      postedMinutesAgo: "1 hour ago",
      readMinute: "10mins read",
      paragraph:
        "The integration of technology in modern farming practices has revolutionized the agriculture industry. From precision farming and IoT-based sensors to drone technology and AI-driven analytics, farmers now have access to valuable data and insights. These technological advancements enable better crop management, resource optimization, and enhanced productivity. Embracing these digital tools not only empowers farmers but also contributes to sustainable agriculture and food security.",
    },
    {
      id: 3,
      title: "The Impact of Technology on Modern Farming",
      image: "https://via.placeholder.com/300",
      category: "Technology",
      postedMinutesAgo: "1 hour ago",
      readMinute: "15mins read",
      paragraph:
        "The integration of technology in modern farming practices has revolutionized the agriculture industry. From precision farming and IoT-based sensors to drone technology and AI-driven analytics, farmers now have access to valuable data and insights. These technological advancements enable better crop management, resource optimization, and enhanced productivity. Embracing these digital tools not only empowers farmers but also contributes to sustainable agriculture and food security.",
    },
    {
      id: 4,
      title: "The Impact of Technology on Modern Farming",
      image: "https://via.placeholder.com/300",
      category: "Technology",
      postedMinutesAgo: "1 hour ago",
      readMinute: "25mins read",
      paragraph:
        "The integration of technology in modern farming practices has revolutionized the agriculture industry. From precision farming and IoT-based sensors to drone technology and AI-driven analytics, farmers now have access to valuable data and insights. These technological advancements enable better crop management, resource optimization, and enhanced productivity. Embracing these digital tools not only empowers farmers but also contributes to sustainable agriculture and food security.",
    },
    // Add more news items here
  ];
  // Bar Chart Data

  useEffect(() => {
    // Destroy the previous Chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const chartData = {
      labels: [
        "Birds",
        "Grains",
        "Tubers",
        "Chemical",
        "Feeds",
        "Livestock",
        "Crop",
        "Vegetables",
      ],
      datasets: [
        {
          label: "Agriculture Products",
          data: [12, 19, 3, 5, 2, 3, 8, 10],
          backgroundColor: "rgba(0, 95, 66, 1)",
        },
      ],
    };

    const chartOptions = {
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    };
    const ctx = chartRef.current.getContext("2d");
    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });

    // Store the new Chart instance in the ref
    chartInstanceRef.current = newChartInstance;
  }, []);

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherData(null);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-8">
        <div className="text-center bg-gray-200 px-7 py-7 mx-4 my-4 rounded-2xl">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to AgricConnect MarketNews
          </h1>
          <p className="text-xl mb-8">
            Craft Narratives{" "}
            <span role="img" aria-label="Writing">
              ✍️
            </span>{" "}
            that ignite <span className="text-red-500">inspiration</span>{" "}
            <span role="img" aria-label="Bulb">
              💡
            </span>
            , <span className="text-red-500">knowledge</span>{" "}
            <span role="img" aria-label="Book">
              📚
            </span>
            , and <span className="text-red-500">agriculture</span>{" "}
            <span role="img" aria-label="Plant">
              🌱
            </span>{" "}
            for a sustainable future.
          </p>
          <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-full hover:bg-green-600">
            Be a Blogger
          </button>
          <p className="mt-4 text-gray-600 text-sm">
            Share your agricultural stories with the world!
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start ml-6 mt-12">
        <img
          src={PostedNewsImage}
          alt="Posted News"
          className="w-full h-70 md:w-1/2 md:h-96 rounded-xl mr-4"
        />
        <div className="ml-0 md:ml-10 mt-4 md:mt-0 md:w-1/2">
          {/* Name and minutes posted */}
          <p className="text-sm text-gray-500 mb-2">
            Posted by John Doe | 15 minutes ago
          </p>
          {/* Header */}
          <h2 className="text-4xl font-bold mb-2">
            Regenerative Agriculture and its Impact on Soil Health and
            Biodiversity
          </h2>
          {/* Blog content */}
          <p className="text-sm mb-4 text-justify md:mr-5">
            Regenerative agriculture is a holistic farming approach that goes
            beyond sustainable practices to actively restore and enhance the
            health of the land and surrounding ecosystems. This innovative
            farming method focuses on regenerating the soil, fostering
            biodiversity, and increasing the overall resilience of agricultural
            systems. By implementing regenerative practices, farmers aim to
            rebuild soil organic matter, improve soil structure, and enhance
            soil fertility. This, in turn, leads to increased water retention,
            reduced erosion, and greater nutrient availability for crops,
            resulting in higher yields and more sustainable agricultural
            productivity. One of the key principles of regenerative agriculture
            is minimizing soil disturbance, such as tillage, which helps to
            preserve the soil's natural structure and minimize the release of
            carbon dioxide into the ...
          </p>
          {/* Category and minutes posted */}
          <p className="text-sm text-gray-500">
            Category: Regenerative Agriculture • read 5 minutes ago
          </p>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="flex justify-between items-center mb-4 mt-16">
        <h1 className="text-2xl font-bold ml-6">Latest News</h1>
        <button className="text-sm font-semibold flex items-center mr-5">
          See All <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-6 mb-8 ">
        {latestNews.map((news) => (
          <div
            key={news.id}
            className="bg-white  p-4 rounded-xl flex flex-col shadow-xl"
          >
            <img
              src={news.image}
              alt="Posted News"
              className="w-72 items-center h-40 md:w-72 md:h-40 rounded-xl mb-4"
            />
            <div className="flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2">{news.title}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <p>{news.category}</p>
                <span className="mx-2">•</span>
                <p>{news.postedMinutesAgo}</p>
              </div>
              <p className="text-sm items-center text-justify text-gray-800 mt-2">
                {news.paragraph.length > 200
                  ? `${news.paragraph.substring(0, 200)}...`
                  : news.paragraph}
              </p>
              <div className="flex justify-between mt-4">
                <p className="text-sm font-semibold">
                  {news.category} • {news.readMinute}
                </p>
              </div>
              <button className="text-sm bg-green-600 rounded-xl text-white py-3 px-3 mt-6">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-5 mr-5">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-2xl ">
          <h2 className="text-2xl font-bold mb-4">Enquired Agric Products</h2>
          <div>
            <canvas ref={chartRef} />
          </div>
        </div>
        {/* Weather Report */}
        <div>
          <div className="bg-white p-4 rounded-xl shadow-2xl h-1/2 mb-6">
            <div className="flex items-center mb-1 justify-between">
              <h4 className="text-xl font-bold mr-2 text-gray-500">
                Weather Today
              </h4>
              <div className="flex items-center mb-1">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-blue-700"
                />
                <p className="ml-2">{CITY_NAME}</p>
              </div>
            </div>
            {weatherData ? (
              <div>
                <h3 className="text-xl font-bold mb-1 text-green-700">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <>
                  <div className=" flex items-center mb-1 justify-between">
                    <div className="flex items-center mb-2">
                      {/* Illustration of the day weather */}
                      {/* Add the appropriate icon from Font Awesome */}
                      {weatherIcons[weatherData.weather[0].main] && (
                        <FontAwesomeIcon
                          icon={weatherIcons[weatherData.weather[0].main]}
                          className="text-6xl mr-2 text-blue-700"
                        />
                      )}
                      <p className="text-2xl font-bold text-green-700">
                        {weatherData.weather[0].main}
                      </p>
                    </div>
                    <div className="text-blue-800">
                      <p className="text-lg ">
                        Temperature: {weatherData.main.temp.toFixed(1)} °C
                      </p>
                      <p>Humidity: {weatherData.main.humidity}%</p>
                      <p>Wind: {weatherData.wind.speed} m/s</p>
                    </div>
                  </div>
                </>
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
          <div
            className=" bg-white p-4 rounded-xl shadow-2xl h-1/3 relative"
            style={{
              background: "linear-gradient(45deg, #4CAF50, #2196F3)",
            }}
          >
            <h4 className="text-2xl font-bold mb-4 items-center text-white">Learning Center</h4>
            <button className=" flex  bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
              Learn More
            </button>
            {/* You can add other content here */}
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}
