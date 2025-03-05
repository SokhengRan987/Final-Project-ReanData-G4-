import { useState } from "react";
import { useEffect } from "react";
import { Button } from "flowbite-react";
import "./App.css";
import About from "./pages/About";
import Navbar from "./components/NavbarComponent";
import Footer from "./components/Footer";
import NavbarComponent from "./components/NavbarComponent";
import heroSection from "../src/img/hero-section-gif.gif";
import startYourJourny from "../src/img/start-your-journy.gif";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <NavbarComponent />
      <main className="pt[60px]">
        {/* Hero Section */}
        <section className="px-4 py-12 md:py-16 lg:py-20">
          <div className="grid max-w-screen-xl mx-auto lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <h2 className="max-w-2xl mb-4 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-medium tracking-tight dark:text-white">
                Unlock Your Data Potential With {" "}
                <span className="text-[#22B04B]">Reandata</span>
              </h2>
              <p className="max-w-2xl mb-6 text-gray-500 leading-relaxed md:text-lg lg:text-xl dark:text-gray-400">
                Access free, beginner-friendly resources to learn data analysis,
                visualization, and more. Start your journey today and build a
                solid foundation for your data career.
              </p>
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white rounded-[20px] bg-[#22B04B] opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  Get started
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <img
                src={heroSection}
                alt="Hero Image"
                className="w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto hover:scale-[1.03] hover:cursor-pointer transition-all duration-150 ease-in-out"
              />
            </div>
          </div>
        </section>

        {/* Start Your Data Analytics Journey with ReanData */}
        <section className="px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-screen-xl mx-auto lg:grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left border-2 border-blue-100 shadow-lg shadow-blue-200/50 p-4 rounded-[20px]">
              <h2 className="max-w-2xl mb-4 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-medium tracking-tight dark:text-white">
                Start Your Data Analytics Journey with {" "}
                <span className="text-[#3C55A5]">Reandata</span>
              </h2>
              <p className="max-w-2xl mb-6 text-gray-500 leading-relaxed md:text-lg lg:text-xl dark:text-gray-400">
                ReanData is an easy-to-use platform designed for beginners.
                Learn at your own pace, explore real projects, and open the door
                to new career possibilities in data analytics.
              </p>
              <p className="max-w-2xl mb-6 text-gray-500 leading-relaxed md:text-lg lg:text-xl dark:text-gray-400">
                Our goal is to make learning data analytics simple, fun, and
                free for everyone. Whether you're just starting or looking to
                improve, we have everything you need to get started.
              </p>
            </div>
            {/* Right Image (Top on small screens) */}
            <div className="lg:col-span-5 flex justify-center">
              <img
                src={startYourJourny}
                alt="Start Your Data Analytics Journey"
                className="w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto hover:scale-[1.03] hover:cursor-pointer transition-all duration-150 ease-in-out"
              />
            </div>
          </div>
        </section>

        {/* Why Choose Reandata */}
        <section className="mb-8 px-4 py-12 md:py-16 lg:py-20 dark:bg-gray-900">
          <div className="max-w-screen-2xl mx-auto text-center flex flex-col items-center justify-center">
            {/* Heading */}
            <div className="relative inline-block">
              <h2 className="mb-8 text-3xl uppercase sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-green-300 bg-clip-text text-transparent dark:text-white">
                Why choose reandata
              </h2>
            </div>
            <p className="max-w-screen-xl mb-6 mx-auto text-center text-gray-500 leading-relaxed md:text-lg lg:text-xl dark:text-gray-400">
              Reandata is a platform designed to teach beginners how to analyze
              and visualize data through easy-to-understand tutorials and
              resources. With real-world examples and hands-on exercises, we aim
              to make learning data as simple as possible.
            </p>
          </div>
        </section>

        {/* Benifits of Data Analytics */}
        <section className="px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-screen-xl mx-auto lg:grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <h2 className="max-w-2xl mb-4 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-medium tracking-tight dark:text-white">
                Benifits of Data Analytics
              </h2>
              <p className="max-w-2xl mb-6 text-gray-500 leading-relaxed md:text-lg lg:text-xl dark:text-gray-400">
                ReanData is an easy-to-use platform designed for beginners.
                Learn at your own pace, explore real projects, and open the door
                to new career possibilities in data analytics.
              </p>
              <p className="max-w-2xl mb-6 text-gray-500 leading-relaxed md:text-lg lg:text-xl dark:text-gray-400">
                Our goal is to make learning data analytics simple, fun, and
                free for everyone. Whether you're just starting or looking to
                improve, we have everything you need to get started.
              </p>
            </div>
            {/* Right Image (Top on small screens) */}
            <div className="lg:col-span-5 flex justify-center">
              <img
                src={startYourJourny}
                alt="Start Your Data Analytics Journey"
                className="w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto hover:scale-[1.03] hover:cursor-pointer transition-all duration-150 ease-in-out"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
