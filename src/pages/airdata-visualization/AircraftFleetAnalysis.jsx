import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import AircraftRangeVelocityChart from "../../components/airdata/aircraftFleetAnalysis/AircraftRangeVelocityChart";
import HorizontalBarChartComponent from "../../components/airdata/aircraftFleetAnalysis/HorizontalBarChartComponent";

export default function AircraftFleetAnalysis() {
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
    <div className="my-8 px-4 sm:px-6 lg:px-8">
      {/* Container for the entire page */}
      <div className="max-w-screen-xl mx-auto">
        {/* Charts Section */}
        <section
          className="grid grid-rows-1 lg:grid-rows-2 gap-6 border-2 border-gray-100 rounded-[20px] p-6 bg-white shadow-sm"
          data-aos="fade-up" // Animation for the charts section
          data-aos-delay="100" // Slight delay for smooth entry
        >
          <div className="w-full" data-aos="zoom-in" data-aos-delay="200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Airport Statistics
            </h2>
            <AircraftRangeVelocityChart />
          </div>
          <div className="w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              PreCheck Usage
            </h2>
            <HorizontalBarChartComponent />
          </div>
        </section>

        {/* Analysis and Storytelling Section */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-visible">
          <div className="border-2 border-blue-100 rounded-[20px] p-6 bg-blue-50 shadow-sm">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Analysis
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                The aircraft count per class helps determine the fleet size in
                each category.
              </p>
              <p>
                <span className="font-semibold">Avg Range</span> and{" "}
                <span className="font-semibold">Avg Velocity</span>
                provide insights into the fleet's capabilities in terms of speed
                and distance.
              </p>
            </div>
          </div>

          <div className="border-2 border-blue-100 rounded-[20px] p-6 bg-blue-50 shadow-sm">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Storytelling
            </h3>
            <p className="text-gray-700">
              The aircraft fleet analysis provides insights into the strength
              and diversity of the fleet. For example, a large number of certain
              classes may indicate a focus on specific routes, while greater
              range and velocity could suggest the fleet's readiness for
              long-haul flights.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
