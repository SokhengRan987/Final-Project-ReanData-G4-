import React from "react";
import { motion } from "framer-motion";
import contactImage from "../assets/C.gif"; // Adjust path based on your structure

function HelpAndSupport() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

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

  return (
    <div className="bg-gray-50 min-h-screen w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto py-12 px-6 max-w-5xl"
      >
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
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
              src={contactImage}
              alt="Support illustration"
              className="transform scale-x-[-1] rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Right side with form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md"
          >
            <p className="text-gray-600 leading-relaxed mb-6">
              We're here to help! Send us your query via the form below or send
              us an email at{" "}
              <a
                href="mailto:helpdesk@gstudio.com"
                className="text-green-500 hover:underline"
              >
                helpdesk@gstudio.com
              </a>{" "}
              for any issue you're facing.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-green-500 text-sm mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full py-2 px-4 border border-green-400 rounded-md focus:outline-none"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-green-500 text-sm mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-2 px-4 border border-green-400 rounded-md focus:outline-none"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-green-500 text-sm mb-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="4"
                  className="w-full py-2 px-4 border border-green-400 rounded-md focus:outline-none resize-none"
                  required
                />
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`bg-green-500 text-white font-medium py-2 px-8 rounded-full transition duration-300 ${
                    !formData.name || !formData.email || !formData.message
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-600"
                  }`}
                  disabled={!formData.name || !formData.email || !formData.message}
                >
                  Submit
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default HelpAndSupport;
