import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import helpAndSupport from "../img/cc.gif"


function HelpAndSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactStatus, setContactStatus] = useState(null);
  const [questionSubmitting, setQuestionSubmitting] = useState(false);
  const [questionStatus, setQuestionStatus] = useState(null);

  const [activeIndex, setActiveIndex] = useState(null);
  const [userQuestion, setUserQuestion] = useState("");

  const faqData = [
    {
      id: 1,
      question: "Why is my data not displaying correctly?",
      answer: (
        <ul className="list-disc pl-4 space-y-2 text-base md:text-lg">
          <li className="block mb-2 font-medium">
            If your data is not displaying as expected, check for the following:
          </li>
          <li>Ensure your file is formatted correctly.</li>
          <li>Verify that column headers are properly labeled.</li>
          <li>Check if there are missing or incorrect values in your dataset.</li>
          <li>Refresh the page or try uploading the file again.</li>
        </ul>
      ),
    },
    {
      id: 2,
      question: "How do I handle outliers in my dataset?",
      answer: (
        <ul className="list-disc pl-4 space-y-2 text-base md:text-lg">
          <li className="block mb-2 font-medium">
            Strategies for managing outliers in your dataset:
          </li>
          <li>Identify potential outliers using statistical methods.</li>
          <li>Decide whether to remove, transform, or keep the outliers.</li>
          <li>Use visualization techniques to understand their impact.</li>
          <li>Consider the context of your data before making changes.</li>
        </ul>
      ),
    },
    {
      id: 3,
      question: "Incorrect data representation?",
      answer: (
        <ul className="list-disc pl-4 space-y-2 text-base md:text-lg">
          <li className="block mb-2 font-medium">
            Troubleshooting data representation issues:
          </li>
          <li>Check data import settings and file compatibility.</li>
          <li>Verify data type conversions.</li>
          <li>Ensure consistent formatting across your dataset.</li>
          <li>Use data validation tools to identify inconsistencies.</li>
        </ul>
      ),
    },
    {
      id: 4,
      question: "Graph not loading properly?",
      answer: (
        <ul className="list-disc pl-4 space-y-2 text-base md:text-lg">
          <li className="block mb-2 font-medium">
            Resolving graph loading issues:
          </li>
          <li>Clear browser cache and reload the page.</li>
          <li>Check internet connection stability.</li>
          <li>Verify browser compatibility.</li>
          <li>Ensure sufficient system resources are available.</li>
        </ul>
      ),
    },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setContactSubmitting(true);
    setContactStatus(null);

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setContactStatus({ success: false, message: "Please enter a valid email." });
      setContactSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "reandata.istad@gmail.com",
      };

      await emailjs.send(
        "service_npgxki8",
        "template_3bx95if",
        templateParams,
        "3b1ms6vHDzEn2xtoG"
      );

      setContactStatus({ success: true, message: "Thank you for your message! We'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setContactStatus({ success: false, message: "Failed to send message. Please try again later." });
    } finally {
      setContactSubmitting(false);
    }
  }

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const clearUserQuestion = () => {
    setUserQuestion("");
  };

  const submitUserQuestion = async (e) => {
    e.preventDefault();
    if (userQuestion.trim() === "") return;

    setQuestionSubmitting(true);
    setQuestionStatus(null);

    try {
      const templateParams = {
        question: userQuestion,
        to_email: "reandata.istad@gmail.com",
      };

      await emailjs.send(
        "service_npgxki8",
        "template_3bx95if",
        templateParams,
        "3b1ms6vHDzEn2xtoG"
      );

      setQuestionStatus({ success: true, message: "Thank you for your question! Our team will get back to you soon." });
      setUserQuestion("");
    } catch (error) {
      console.error("Error sending question:", error);
      setQuestionStatus({ success: false, message: "Failed to send question. Please try again later." });
    } finally {
      setQuestionSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center mb-10 md:mb-16">
          Frequently Asked Questions
        </h1>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left section */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full md:w-2/3 flex flex-col items-center text-center"
          >
            <div className="bg-[#3C55A5] w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center text-white text-3xl md:text-5xl mb-4 animate-pulse">
              ?
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Any Questions?
            </h2>
            <p className="text-gray-700 mb-6 text-base sm:text-lg md:text-xl">
              You can ask anything you want to know
            </p>

            <div className="w-full">
              <p className="text-left text-gray-700 mb-2 text-sm sm:text-base md:text-lg">
                Let me know
              </p>

              {questionStatus && (
                <div
                  className={`mb-4 p-3 rounded-md ${
                    questionStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {questionStatus.message}
                </div>
              )}

              <form onSubmit={submitUserQuestion} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="Enter Here"
                    className="w-full py-2 sm:py-3 px-4 border border-[#3C55A5] rounded-md focus:outline-none text-sm sm:text-base md:text-lg"
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
                  className={`bg-[#2040a7] text-white font-medium py-2 sm:py-3 px-6 sm:px-10 mt-4 text-sm sm:text-base md:text-lg rounded-full transition duration-300 ${
                    !userQuestion || questionSubmitting ? "cursor-not-allowed opacity-75" : "hover:bg-[#3c5ac0]"
                  }`}
                  disabled={!userQuestion || questionSubmitting}
                >
                  {questionSubmitting ? "Sending..." : "Submit"}
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
                className={`border rounded-lg overflow-hidden duration-300 ${
                  activeIndex === index ? "border-[#3C55A5] shadow-md" : "border-gray-300"
                }`}
              >
                <button
                  className="w-full flex justify-between items-center p-4 bg-white text-left cursor-pointer font-medium text-gray-800 text-base sm:text-lg md:text-xl"
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
        className="mt-12 md:mt-16"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center mb-10 md:mb-16">
          Contact Us
        </h1>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left side with illustration */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <img
              src = {helpAndSupport}
              alt="Support illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md transform scale-x-[-1] rounded-lg"
            />
          </motion.div>

          {/* Right side with form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full md:w-1/2"
          >
            <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base md:text-lg">
              We're here to help! Send us your query via the form below or email us at{" "}
              <a href="mailto:reandata.istad@gmail.com" className="text-[#3C55A5] hover:underline">
                reandata.istad@gmail.com
              </a>{" "}
              for any issue you're facing.
            </p>

            {contactStatus && (
              <div
                className={`mb-4 p-3 rounded-md ${
                  contactStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {contactStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-[#3C55A5] text-sm sm:text-base md:text-lg mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full py-2 sm:py-3 px-4 border border-[#3C55A5] rounded-md focus:outline-none text-sm sm:text-base"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#3C55A5] text-sm sm:text-base md:text-lg mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-2 sm:py-3 px-4 border border-[#3C55A5] rounded-md focus:outline-none text-sm sm:text-base"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#3C55A5] text-sm sm:text-base md:text-lg mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="4"
                  className="w-full py-2 sm:py-3 px-4 border border-[#3C55A5] rounded-md focus:outline-none resize-none text-sm sm:text-base"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`bg-[#2040a7] text-white font-medium py-2 sm:py-3 px-6 sm:px-10 text-sm sm:text-base md:text-lg rounded-full transition duration-300 ${
                  !formData.name || !formData.email || !formData.message || contactSubmitting
                  ?"cursor-not-allowed opacity-75" : "hover:bg-[#3c5ac0]"
                }`}
                disabled={!formData.name || !formData.email || !formData.message || contactSubmitting}
              >
                {contactSubmitting ? "Sending..." : "Submit"}
              </motion.button>
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