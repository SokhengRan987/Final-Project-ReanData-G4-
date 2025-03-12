import React, { useState } from "react";
import { motion } from "framer-motion";

function HelpAndSupport() {
  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // FAQ accordion state
  const [activeIndex, setActiveIndex] = useState(null);
  const [userQuestion, setUserQuestion] = useState("");

  // FAQ data
  const faqData = [
    {
      id: 1,
      question: "Why is my data not displaying correctly?",
      answer: (
        <ul className="text-bold list-disc pl-4 space-y-2 text-[18px]">
          <a className="block mb-2 text-[18px] font-medium">
            If your data is not displaying as expected, check for the following:
          </a>
          <li> Ensure your file is formatted correctly.</li>
          <li> Verify that column headers are properly labeled.</li>
          <li>
            {" "}
            Check if there are missing or incorrect values in your dataset.
          </li>
          <li> Refresh the page or try uploading the file again.</li>
        </ul>
      ),
    },
    {
      id: 2,
      question: "How do I handle outliers in my dataset?",
      answer: (
        <ul className="list-disc pl-4 space-y-2 text-[18px]">
          <a className="block mb-2 text-[18px] font-medium">
            Strategies for managing outliers in your dataset:
          </a>
          <li> Identify potential outliers using statistical methods.</li>
          <li> Decide whether to remove, transform, or keep the outliers.</li>
          <li> Use visualization techniques to understand their impact.</li>
          <li> Consider the context of your data before making changes.</li>
        </ul>
      ),
    },
    {
      id: 3,
      question: "Incorrect data representation?",
      answer: (
        <ul className="list-disc pl-4 space-y-2 text-[18px]">
          <a className="block mb-2 text-[18px] font-medium">
            Troubleshooting data representation issues:
          </a>
          <li> Check data import settings and file compatibility.</li>
          <li> Verify data type conversions.</li>
          <li> Ensure consistent formatting across your dataset.</li>
          <li> Use data validation tools to identify inconsistencies.</li>
        </ul>
      ),
    },
    {
      id: 4,
      question: "Graph not loading properly?",
      answer: (
        <ul className="list-disc pl-4 space-y-2 text-[18px]  ">
          <a className="block mb-2 text-[18px] font-medium ">
            Resolving graph loading issues:
          </a>
          <li> Clear browser cache and reload the page.</li>
          <li> Check internet connection stability.</li>
          <li> Verify browser compatibility.</li>
          <li> Ensure sufficient system resources are available.</li>
        </ul>
      ),
    },
  ];

  // Form handlers
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }
    console.log("Form submitted:", formData);
    alert("Thank you for your message!");
    setFormData({ name: "", email: "", message: "" });
  }

  // Toggle accordion
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Clear user question
  const clearUserQuestion = () => {
    setUserQuestion("");
  };

  // Submit user question
  const submitUserQuestion = (e) => {
    e.preventDefault();
    if (userQuestion.trim() === "") return;

    console.log("User question submitted:", userQuestion);
    alert("Thank you for your question! Our team will get back to you soon.");
    setUserQuestion("");
  };

  return (
    <div className="bg-white min-h-screen max-w-screen-xl mx-auto">
      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="container mx-auto my-8"
      >
        <h1 className="text-[50px] font-bold text-gray-800 text-center mb-16">
          Frequently Asked Questions
        </h1>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Left section with icon and input */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full md:w-2/3 flex flex-col items-center text-center"
          >
            {/* Question icon */}
            <div className="bg-[#3C55A5] w-24 h-24 rounded-full flex items-center justify-center text-white text-5xl mb-4 animate-pulse">
              ?
            </div>

            <h2 className="text-[32px] font-bold text-gray-800 mb-4">
              Any Questions?
            </h2>
            <p className="text-[#1E293B] mb-8 text-[24px]">
              You can ask anything you want to know
            </p>

            {/* Input section for user question */}
            <div className="w-full">
              <p className="text-left text-[#1E293B] mb-2 text-[20px]">
                Let me know
              </p>
              <form onSubmit={submitUserQuestion} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="Enter Here"
                    className="w-full py-3 px-4 border border-[#3C55A5] rounded-md focus:outline-none pr-10 text-[18px]"
                  />
                  {userQuestion && (
                    <button
                      type="button"
                      onClick={clearUserQuestion}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`bg-[#3C55A5] text-white font-medium py-3 px-10 mt-4 text-[18px]
                     rounded-full transition duration-300 flex flex-col items-center text-center ${
                       !userQuestion
                         ? " cursor-not-allowed"
                         : "hover:bg-green-600"
                     }`}
                  disabled={!userQuestion}
                >
                  Submit
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right section with accordion */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-full md:w-2/3 flex flex-col gap-3"
          >
            {faqData.map((item, index) => (
              <div
                key={item.id}
                className={`border border-gray-300 rounded-lg overflow-hidden duration-300 ${
                  activeIndex === index ? "shadow-md" : ""
                  ? 'border-[#3C55A5] shadow-md' 
      : 'border-gray-300'
                }`}
              >
                <button
                  className="w-full flex justify-between items-center p-4 bg-white text-left cursor-pointer font-medium text-gray-800 text-[20px]"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{item.question}</span>
                  <span
                    className={`text-sm transition-transform duration-300 ${
                      activeIndex === index ? "transform rotate-180" : ""
                    }`}
                  >
                   ▼
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    activeIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="p-4 bg-[#22b04a1a] border-t border-gray-200 text-gray-700">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto my-8"
      >
        <h1 className="text-[50px] font-bold text-gray-800 text-center mb-16">
          Contact Us
        </h1>

        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Left side with illustration */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <img
              src="./src/assets/cc.gif"
              alt="Support illustration"
              className="transform scale-x-[-1] rounded-lg "
            />
          </motion.div>

          {/* Right side with form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full md:w-1/2 bg-white p-6 rounded-lg"
          >
            <p className="text-gray-600 leading-relaxed mb-8 text-[22px]">
              We're here to help! Send us your query via the form below or send
              us an email at{" "}
              <a
                href="mailto:helpdesk@gstudio.com"
                className="text-[#3C55A5] hover:underline"
              >
                helpdesk@gstudio.com
              </a>{" "}
              for any issue you're facing.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  className="block text-[#3C55A5] text-[18px] mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full py-3 px-4 border border-[#3C55A5] rounded-md focus:outline-none text-[18px]"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-[#3C55A5] text-[18px] mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-3 px-4 border border-[#3C55A5] rounded-md focus:outline-none text-[18px]"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-[#3C55A5] text-[18px] mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="4"
                  className="w-full py-3 px-4 border border-[#3C55A5] rounded-md focus:outline-none resize-none text-[18px]"
                  required
                />
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`bg-[#3C55A5] text-white font-medium py-3 px-10 text-[18x]
                     rounded-full transition duration-300 ${
                       !formData.name || !formData.email || !formData.message
                         ? " cursor-not-allowed"
                         : "hover:bg-green-500"
                     }`}
                  disabled={
                    !formData.name || !formData.email || !formData.message
                  }
                >
                  Submit
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* CSS animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default HelpAndSupport;
