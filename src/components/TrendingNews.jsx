import React, { useState } from 'react';

const TrendingNews = () => {
    const trendingNews = [
      {
        id: 1,
        title: "New Crop Yield Records",
        content:
          "Farmers across the country are reporting record-breaking crop yields this season.",
        image:
          "https://www.analyticsinsight.net/wp-content/uploads/2021/01/big-data-in-farming.jpg",
      },
      {
        id: 2,
        title: "Innovative Livestock Management",
        content:
          "A new livestock management system is revolutionizing the way farmers care for their animals.",
        image:
          "https://www.nedap-livestockmanagement.com/wp-content/uploads/2019/01/Nedap-CowControl-thumb.jpg",
      },
      {
        id: 3,
        title: "Market Price Surge",
        content:
          "The prices of agricultural commodities have seen a significant surge in the past month.",
        image:
          "https://www.analyticsinsight.net/wp-content/uploads/2022/06/Surge-in-Cryptocurrency-Market-Check-Out-Cryptocurrency-Prices-Today.jpg",
      },
      {
        id: 4,
        title: "Advancements in AgTech",
        content:
          "The latest advancements in agricultural technology are helping farmers improve productivity.",
        image:
          "https://eos.com/wp-content/uploads/2019/10/agriculture-technologies-evolution.jpg",
      },
      {
        id: 5,
        title: "Sustainable Farming Practices",
        content:
          "Farmers are adopting more sustainable practices to protect the environment.",
        image:
          "https://static.wixstatic.com/media/cbc1ea_9d53078c927f43c4bae3d4184a190408~mv2.png/v1/fill/w_640,h_374,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/cbc1ea_9d53078c927f43c4bae3d4184a190408~mv2.png",
      },
      {
        title: "Rising Demand for Organic Vegetables",
        image:
          "https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/content/wi/art/organic2-cae11ea6e4.jpg",
        description:
          "Consumers are increasingly seeking organic and locally grown vegetables, driving the demand for sustainable farming methods and healthier produce.",
      },
      {
        title: 'Record Crop Yield in Midwest Farms',
        image: 'https://www.analyticsinsight.net/wp-content/uploads/2021/01/big-data-in-farming.jpg',
        description:
          'Farmers in the Midwest have reported a record-breaking crop yield this season, attributing it to favorable weather conditions and advanced agricultural practices.',
      },
      {
        title: 'Livestock Management Innovations on the Rise',
        image: 'https://www.nedap-livestockmanagement.com/wp-content/uploads/2019/01/Nedap-CowControl-thumb.jpg',
        description:
          'Livestock farmers are adopting cutting-edge management techniques, leading to improved animal health and productivity. Experts predict increased profitability in the industry.',
      },
      {
        title: 'Advancements in Sustainable Agriculture',
        image: 'https://eos.com/wp-content/uploads/2019/10/agriculture-technologies-evolution.jpg',
        description:
          'The agriculture sector continues to embrace sustainable practices, aiming to reduce environmental impact and ensure food security for future generations.',
      },
      {
        title: 'New Technologies Revolutionizing Farming',
        image: 'https://eos.com/wp-content/uploads/2019/10/agriculture-technologies-evolution.jpg',
        description:
          'From drones for precision agriculture to AI-powered crop monitoring, new technologies are transforming the farming landscape, enhancing efficiency and productivity.',
      },
    ];
    // Pagination logic (remains unchanged)
    const newsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = trendingNews.slice(indexOfFirstNews, indexOfLastNews);
    const totalPages = Math.ceil(trendingNews.length / newsPerPage);

    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    

  return (
    <div>
      {/* Trending Market News */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Trending Market News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Display the current news items */}
          {currentNews.map((newsItem) => (
            <div key={newsItem.id} className="bg-white rounded-md shadow-md overflow-hidden">
              <img src={newsItem.image} alt={newsItem.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{newsItem.title}</h3>
                <p className="text-sm text-gray-600">{newsItem.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Display page navigation buttons */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 mr-2 bg-gray-200 text-gray-600 rounded-md"
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingNews;
