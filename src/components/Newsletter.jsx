import React, { useState } from "react";

const Newsletter = ({ height = "300px" }) => {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add your logic here to handle the newsletter subscription,
    // such as sending the email to your server or integrating with an email service.
    alert(`Subscribed with email: ${email}`);
    setEmail("");
    alert(`Thanks for subscribing with us`);
  };

  return (
    <div
      className="w-full py-8 rounded-lg bg-gradient-to-r from-green-700 to-pink-400 mt-6"
      style={{ height }}
    >
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-md mb-6 mx-auto text-white w-full">
          Stay informed and connected with the latest news and insights in
          agriculture. Join our newsletter and be part of the AgricConnect
          community!
        </p>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            className="flex-grow px-4 py-2 bg-white border border-transparent rounded-l-md focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-700 text-white font-semibold rounded-r-md hover:bg-gray-700 focus:outline-none"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
