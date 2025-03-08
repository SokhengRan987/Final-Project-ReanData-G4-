import React, { useEffect } from "react";
import heroSection from "../img/hero-section-gif.gif";
import startYourJourney from "../img/start-your-journey.gif";
import whyDataAnalytics from "../img/why-data.gif";
import collectData from "../img/collect-data.gif";
import dataCleaning from "../img/data-cleaning.gif";
import dataAnalysis from "../img/analysis.gif";
import visualization from "../img/visualization.gif";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import BasicConceptCard from "../components/landingPageComs/BasicConceptCard";

export default function LandingPage() {
  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 900, // Default duration for all animations
      easing: "ease-in-out",
      mirror: true, // Animate elements again when scrolling up
      once: false, // Allow animations to repeat
    });
    // Optional: Refresh AOS on component update if dynamic content is added
    AOS.refresh();
  }, []);

  return (
    <div>
      <main>
        {/* Hero Section */}
        <section className="px-4 py-12 md:py-16 lg:py-20">
          <div className="grid max-w-screen-xl mx-auto lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <h2 className="max-w-2xl mb-4 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-medium tracking-tight">
                Unlock Your Data Potential With {" "}
                <span className="text-[#22B04B]"> Reandata</span>
              </h2>
              <p className="max-w-2xl mb-6 text-gray-500 leading-relaxed md:text-lg lg:text-xl">
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
            <div
              className="lg:col-span-5 flex justify-center lg:justify-end"
              data-aos="zoom-in"
              data-aos-delay="75"
            >
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
            <div
              className="mb-4 lg:col-span-7 text-center lg:text-left border-2 border-blue-100 shadow-lg shadow-blue-200/50 p-4 rounded-[20px]"
              data-aos="fade-left"
            >
              <h2 className="max-w-2xl mx-auto mb-4 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-medium tracking-tight">
                Start Your Data Analytics Journey With {" "}
                <span className="text-[#3C55A5]"> Reandata</span>
              </h2>
              <p className="max-w-2xl mx-auto mb-6 text-gray-500 leading-relaxed md:text-lg lg:text-xl">
                ReanData is an easy-to-use platform designed for beginners.
                Learn at your own pace, explore real projects, and open the door
                to new career possibilities in data analytics.
              </p>
              <p className="max-w-2xl mx-auto mb-6 text-gray-500 leading-relaxed md:text-lg lg:text-xl">
                Our goal is to make learning data analytics simple, fun, and
                free for everyone. Whether you're just starting or looking to
                improve, we have everything you need to get started.
              </p>
            </div>
            {/* Right Image */}
            <div
              className="lg:col-span-5 flex justify-center"
              data-aos="fade-right"
            >
              <img
                src={startYourJourney}
                alt="Start Your Data Analytics Journey"
                className="w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto hover:scale-[1.03] hover:cursor-pointer transition-all duration-150 ease-in-out"
              />
            </div>
          </div>
        </section>

        {/* Why Choose Reandata */}
        <section className="mb-8 px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-screen-2xl mx-auto text-center flex flex-col items-center justify-center">
            {/* Heading */}
            <div
              className="relative inline-block"
              data-aos="slide-up"
              data-aos-delay="75"
            >
              <h2 className="mb-8 text-3xl uppercase sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
                Why Choose Reandata
              </h2>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
              {/* Card 1 */}
              <div
                className="p-6 bg-white rounded-[20px] shadow-xl transition-transform transform hover:scale-[1.02] flex flex-col items-center text-center border-2 border-blue-100 hover:shadow-blue-50 hover:ring-2 hover:ring-blue-400"
                data-aos="slide-up"
                data-aos-delay="25"
              >
                <div className="text-blue-500 text-5xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Real-World Datasets
                </h3>
                <p className="text-gray-500 leading-relaxed ">
                  Reandata provides access to real-world datasets like AirData
                  and Food & Beverages, allowing beginners to practice data
                  analysis in a hands-on, interactive way.
                </p>
              </div>

              {/* Card 2 */}
              <div
                className="p-6 bg-white rounded-[20px] shadow-xl transition-transform transform hover:scale-[1.02] flex flex-col items-center text-center border-2 border-blue-100 hover:shadow-blue-50 hover:ring-2 hover:ring-blue-400"
                data-aos="slide-up"
                data-aos-delay="75"
              >
                <div className="text-green-500 text-5xl mb-4">⚙️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Powerful Data Tools
                </h3>
                <p className="text-gray-500 leading-relaxed ">
                  Our platform simplifies data management with tools for
                  filtering, listing, viewing, and searching datasets, making
                  data analysis more efficient and accessible.
                </p>
              </div>

              {/* Card 3 */}
              <div
                className="p-6 bg-white rounded-[20px] shadow-xl transition-transform transform hover:scale-[1.02] flex flex-col items-center text-center border-2 border-blue-100 hover:shadow-blue-50 hover:ring-2 hover:ring-blue-400"
                data-aos="slide-up"
                data-aos-delay="125"
              >
                <div className="text-yellow-500 text-5xl mb-4">📈</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Interactive Visualizations
                </h3>
                <p className="text-gray-500 leading-relaxed ">
                  Reandata helps transform raw data into meaningful insights
                  with dynamic charts and graphs, making trend analysis and
                  pattern recognition easier than ever.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Data Analytics */}
        <section className="px-4 py-12 md:py-16 lg:py-20 ">
          <div className="max-w-screen-xl mx-auto lg:grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Image */}
            <div
              className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="900"
            >
              <img
                src={whyDataAnalytics} // Replace with a relevant image if you have one
                alt="Why Data Analytics Illustration"
                className="w-full mb-4 max-w-md sm:max-w-lg lg:max-w-xl h-auto hover:scale-[1.03] hover:cursor-pointer transition-all duration-150 ease-in-out"
              />
            </div>

            {/* Right Content */}
            <div
              className="lg:col-span-7 text-center lg:text-left order-1 lg:order-2"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <h2 className="max-w-2xl mx-auto mb-4 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-medium tracking-tight ">
                Why Data Analytics {" "}
                <span className="bg-gradient-to-r from-blue-400 to-green-300 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                  Matters
                </span>
              </h2>
              <p className="max-w-2xl mx-auto mb-6 text-gray-500 leading-relaxed md:text-lg lg:text-xl ">
                Data analytics empowers you to uncover hidden patterns, make
                informed decisions, and solve real-world problems. In today's
                data-driven world, it's a skill that opens doors to countless
                opportunities.
              </p>
              <p className="max-w-2xl mx-auto mb-6 text-gray-500 leading-relaxed md:text-lg lg:text-xl ">
                Whether you're a beginner or a professional, understanding data
                analytics helps you stay ahead, boost your career, and
                contribute to impactful projects—all with the power of numbers.
              </p>
            </div>
          </div>
        </section>
        {/* Basic concepts */}
        <section className="mb-8 px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-screen-2xl mx-auto text-center flex flex-col items-center justify-center">
            {/* Heading */}
            <div
              className="relative inline-block"
              data-aos="slide-up"
              data-aos-delay="75"
            >
              <h2 className="mb-8 text-3xl uppercase sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
                Basic Concepts
              </h2>
            </div>
          </div>
          {/* Card Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
            {/* card 1 */}
            <BasicConceptCard
              title="Data Collection"
              description="Gather data from surveys, databases, APIs, and more."
              icon={collectData}
              alt="whyDataAnalytics"
              delay="25"
            />
            {/* card 2 */}
            <BasicConceptCard
              title="Data Cleaning"
              description="Handle missing data, remove duplicates, and correct errors."
              icon={dataCleaning}
              alt="whyDataAnalytics"
              delay="75"
            />
            {/* card 3 */}
            <BasicConceptCard
              title="Data Analysis"
              description="Use techniques like descriptive statistics and regression."
              icon={dataAnalysis}
              alt="whyDataAnalytics"
              delay="125"
            />
            {/* card 4 */}
            <BasicConceptCard
              title="Data Visualization"
              description="Present data using charts, graphs, and dashboards."
              icon={visualization}
              alt="whyDataAnalytics"
              delay="175"
            />
          </div>
        </section>
        {/* Learn about graph */}
        <section className="mb-8 px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-screen-2xl mx-auto text-center flex flex-col items-center justify-center">
            {/* Heading */}
            <div
              className="relative inline-block"
              data-aos="slide-up"
              data-aos-delay="75"
            >
              <h2 className="mb-8 text-3xl uppercase sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
                Learn About Graphs
              </h2>
              <p className="max-w-2xl mx-auto mb-6 text-gray-500 leading-relaxed md:text-lg lg:text-xl ">
                Graphs make data easy to understand. Here are some examples we
                will describe briefly.
              </p>
            </div>
          </div>
          {/* Card Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
            {/* card 1 */}
            <BasicConceptCard
              title="Data Collection"
              description="Gather data from surveys, databases, APIs, and more."
              icon={collectData}
              alt="whyDataAnalytics"
              delay="25"
            />
            {/* card 2 */}
            <BasicConceptCard
              title="Data Cleaning"
              description="Handle missing data, remove duplicates, and correct errors."
              icon={dataCleaning}
              alt="whyDataAnalytics"
              delay="75"
            />
            {/* card 3 */}
            <BasicConceptCard
              title="Data Analysis"
              description="Use techniques like descriptive statistics and regression."
              icon={dataAnalysis}
              alt="whyDataAnalytics"
              delay="125"
            />
            {/* card 4 */}
            <BasicConceptCard
              title="Data Visualization"
              description="Present data using charts, graphs, and dashboards."
              icon={visualization}
              alt="whyDataAnalytics"
              delay="175"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
