import React from "react";
import Header from "../Header";
import Newsletter from "../Newsletter";
import Footer from "../Footer";
import { motion } from "framer-motion"; // Import framer-motion

const HelpAndFaqs = () => {
  const faqs = [
    {
      question: "How do I change my address?",
      answer:
        "To change your address, go to your account settings and navigate to the 'Address' section. From there, you can update your shipping and billing addresses as needed.",
    },
    {
      question: "How do I add my product?",
      answer:
        "To add a product, log in to your account and go to the 'Seller Dashboard.' Click on 'Add Product' and fill in the required information such as product name, description, price, and images.",
    },
    {
      question: "How do I charge for my product?",
      answer:
        "You can set the price for your product when adding or editing it in the 'Seller Dashboard.' Customers will be able to see the price and make a purchase using their preferred payment method.",
    },
    {
      question: "How do I sign out?",
      answer:
        "To sign out, click on your profile icon at the top right corner of the page. You will find the 'Sign Out' option in the dropdown menu. Click on it to log out of your account.",
    },
    {
      question: "How do I upload my profile picture?",
      answer:
        "To upload your profile picture, go to your account settings and navigate to the 'Profile' section. Click on the 'Edit Profile' button and choose the image you want to use as your profile picture.",
    },
    {
      question: "How do I edit my profile?",
      answer:
        "To edit your profile, go to your account settings and navigate to the 'Profile' section. Click on the 'Edit Profile' button and update your information as needed.",
    },
    {
      question: "How do I post a blog?",
      answer:
        "To post a blog, go to the 'Blog' section of the website. Click the 'Create New Blog' button and fill in the title, content, and relevant tags. Once you're done, click on 'Publish' to make your blog post live.",
    },
    {
      question: "How do I see my seller address?",
      answer:
        "To view your seller address, go to your account settings and navigate to the 'Seller Information' section. Your address will be displayed there.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "If you've forgotten your password, click on the 'Forgot Password' link on the login page. You will receive an email with instructions on how to reset your password.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "For any inquiries or issues, you can contact our customer support team through the 'Contact Us' page on the website. Alternatively, you can email us at support@example.com or call our toll-free hotline at 1-800-123-4567.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes, you can cancel your order if it has not been shipped yet. To cancel your order, go to your account dashboard and navigate to the 'Orders' section. Find the order you wish to cancel and click on the 'Cancel Order' button.",
    },
    {
      question: "How do I leave a product review?",
      answer:
        "To leave a product review, go to the product page of the item you want to review. Scroll down to the reviews section and click on the 'Write a Review' button. You can rate the product and leave your feedback.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods, including credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. You can choose your preferred payment method during checkout.",
    },
    {
      question: "How to chat through notifications?",
      answer:
        "To chat through notifications, follow these steps: Go to you profile you see notification, inside you see your messages click on it and you will see you type section", // You can add the detailed steps here
    },
    // Add more FAQs as needed
  ];

  return (
    <div>
      <Header />
      <div className="container ml-5 mr-5 items-center justify-center align-middle mt-3">
        <div className="bg-slate-100 py-4 px-4 rounded-xl mb-4">
          <h2 className="text-4xl font-bold mb-4 text-blue-800">
            Help & Frequently Asked Questions
          </h2>
          <p>
            Stuck on something? We're here to help with all your questions and
            answer in one place
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.1,
                boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
                zIndex: 1,
              }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-md shadow-md mb-4"
            >
              <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
              <p>{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HelpAndFaqs;
