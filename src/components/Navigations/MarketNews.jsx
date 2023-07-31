import React from "react";
import Header from "../Header";
import PostedNewsImage from "../Navigations/Assets/poster news.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function MarketNews() {
  const latestNews = [
    {
      id: 1,
      title: "The Future of Vertical Farming in Agriculture",
      image: "https://via.placeholder.com/300",
      category: "Agriculture",
      postedMinutesAgo: "30 minutes ago",
      paragraph:
        "Vertical farming has emerged as a potential solution to the challenges faced by traditional agriculture. By growing crops in stacked layers or vertically inclined surfaces, it allows for efficient use of space and resources. This technology-driven approach is seen as a promising way to increase food production and minimize environmental impact. With advancements in hydroponics, aeroponics, and automation, vertical farming is shaping the future of agriculture.",
    },
    {
      id: 2,
      title: "The Impact of Technology on Modern Farming",
      image: "https://via.placeholder.com/300",
      category: "Technology",
      postedMinutesAgo: "1 hour ago",
      paragraph:
        "The integration of technology in modern farming practices has revolutionized the agriculture industry. From precision farming and IoT-based sensors to drone technology and AI-driven analytics, farmers now have access to valuable data and insights. These technological advancements enable better crop management, resource optimization, and enhanced productivity. Embracing these digital tools not only empowers farmers but also contributes to sustainable agriculture and food security.",
    },
    {
      id: 3,
      title: "The Impact of Technology on Modern Farming",
      image: "https://via.placeholder.com/300",
      category: "Technology",
      postedMinutesAgo: "1 hour ago",
      paragraph:
        "The integration of technology in modern farming practices has revolutionized the agriculture industry. From precision farming and IoT-based sensors to drone technology and AI-driven analytics, farmers now have access to valuable data and insights. These technological advancements enable better crop management, resource optimization, and enhanced productivity. Embracing these digital tools not only empowers farmers but also contributes to sustainable agriculture and food security.",
    },
    {
      id: 4,
      title: "The Impact of Technology on Modern Farming",
      image: "https://via.placeholder.com/300",
      category: "Technology",
      postedMinutesAgo: "1 hour ago",
      paragraph:
        "The integration of technology in modern farming practices has revolutionized the agriculture industry. From precision farming and IoT-based sensors to drone technology and AI-driven analytics, farmers now have access to valuable data and insights. These technological advancements enable better crop management, resource optimization, and enhanced productivity. Embracing these digital tools not only empowers farmers but also contributes to sustainable agriculture and food security.",
    },
    // Add more news items here
  ];

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-8">
        <div className="text-center bg-gray-200 px-7 py-7 mx-4 my-4 rounded-2xl">
          <h1 className="text-3xl font-bold mb-4">Welcome to AgricConnect</h1>
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
      <div className="flex items-start ml-6 mt-12">
        <img
          src={PostedNewsImage}
          alt="Posted News"
          className="w-100 h-70 md:w-1/2 md:h-96 rounded-xl mr-4"
        />
        <div className="ml-10 w-1/2">
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
          <p className="text-sm mb-4 items-center">
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
        <h1 className="text-2xl font-bold">Latest News</h1>
        <h6 className="text-sm font-semibold flex items-center">
          See All <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </h6>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-6">
        {latestNews.map((news) => (
          <div
            key={news.id}
            className="bg-gray-200 p-4 rounded-xl flex flex-col"
          >
            <img
              src={news.image}
              alt="Posted News"
              className="w-32 h-32 md:w-40 md:h-40 rounded-xl mb-4"
            />
            <div className="flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2">{news.title}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <p>{news.category}</p>
                <span className="mx-2">•</span>
                <p>{news.postedMinutesAgo}</p>
              </div>
              <p className="text-sm text-gray-800 mt-2">
                {news.paragraph.length > 200
                  ? `${news.paragraph.substring(0, 200)}...`
                  : news.paragraph}
              </p>
              <div className="flex justify-between mt-4">
                <p className="text-sm font-semibold">
                  {news.category} • {news.postedMinutesAgo}
                </p>
                <button className="text-sm text-blue-600">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
