import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import PreCheckUsagePieChart from "../../components/airdata/boardingPass/PreCheckUsagePieChart";
import AirportStatisticsBarChart from "../../components/airdata/boardingPass/AirportStatisticsBarChart";

export default function BoardingStatistics() {
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
    <div className="my-6">
      {/* Container for the entire page */}
      <div className="max-w-screen-xl mx-auto">
        {/* Charts Section */}
        <section
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-2 border-gray-100 rounded-[20px] p-6 bg-white shadow-sm"
          data-aos="fade-up" // Animation for the charts section
          data-aos-delay="100" // Slight delay for smooth entry
        >
          <div className="w-full" data-aos="zoom-in" data-aos-delay="75">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
              Airport Statistics
            </h2>
            <AirportStatisticsBarChart />
          </div>
          <div className="w-full" data-aos="zoom-in" data-aos-delay="300">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
              PreCheck Usage
            </h2>
            <PreCheckUsagePieChart />
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
                <span className="font-semibold">Total Boardings:</span>{" "}
                Indicates overall passenger activity across the airport.
              </p>
              <p>
                <span className="font-semibold">Unique Passengers:</span>
                Shows the number of distinct passengers flying.
              </p>
              <p>
                <span className="font-semibold">Unique Flight Legs:</span>{" "}
                Represents the variety of routes flown.
              </p>
              <p>
                <span className="font-semibold">PreCheck Percentage:</span>{" "}
                Highlights the percentage of passengers who utilize PreCheck for
                a smoother boarding process.
              </p>
            </div>
          </div>

          <div className="border-2 border-blue-100 rounded-[20px] p-6 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
              Storytelling
            </h3>
            <p className="text-sm leading-6 sm:text-lg sm:leading-8 space-y-3 text-gray-700">
              The boarding statistics provide a clear snapshot of airport
              operations. They reveal the volume of flights, the number of
              unique passengers, and the efficiency of security processes
              through PreCheck usage, offering valuable insights for operational
              improvements.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
