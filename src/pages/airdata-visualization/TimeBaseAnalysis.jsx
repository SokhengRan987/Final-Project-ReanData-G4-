import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect } from "react";
import TimeBasedBoardingAnalysis from "../../components/airdata/TimeBasedBoardingAnalysis";

export default function TimeBaseAnalysis() {
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
    <div className="my-6">
      {/* Container for the entire page */}
      <div className="max-w-screen-xl mx-auto">
        {/* Charts Section */}
        <section
          className="grid grid-cols-1 border-2 border-gray-100 rounded-[20px] p-6 bg-white shadow-sm"
          data-aos="fade-up" // Animation for the charts section
          data-aos-delay="100" // Slight delay for smooth entry
        >
          <div className="w-full" data-aos="zoom-in" data-aos-delay="75">
            {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Boarding Analysis by Hours
            </h2> */}
            <TimeBasedBoardingAnalysis />
          </div>
        </section>

        {/* Analysis and Storytelling Section */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-visible">
          <div className="border-2 border-blue-100 rounded-[20px] p-6 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
              Analysis
            </h3>
            <div className="text-sm leading-6 sm:text-lg sm:leading-8 space-y-3 text-gray-700">
              <p>
                This function helps track the number of boardings by hour of the
                day.
              </p>
            </div>
          </div>

          <div className="border-2 border-blue-100 rounded-[20px] p-6 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
              Storytelling
            </h3>
            <p className="text-sm leading-6 sm:text-lg sm:leading-8 space-y-3 text-gray-700">
              The time-based analysis reveals the busiest hours at the airport.
              It helps with staffing, resource allocation, and improving
              passenger flow management. For instance, if there is high traffic
              at certain hours, additional support may be required at check-in
              counters or security.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
