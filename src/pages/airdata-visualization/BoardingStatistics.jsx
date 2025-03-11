import React, { useEffect } from "react";
import AirportStatisticsBarChart from "../../components/airdata/boardingPass/AirportStatisticsBarChart";
import PreCheckUsagePieChart from "../../components/airdata/boardingPass/PreCheckUsagePieChart";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

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
    <div className="my-8 px-4 sm:px-6 lg:px-8">
      {/* Container for the entire page */}
      <div className="max-w-screen-xl mx-auto">
        {/* Charts Section */}
        <section
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-2 border-gray-200 rounded-[20px] p-6 bg-white shadow-md"
          data-aos="fade-up" // Animation for the charts section
          data-aos-delay="100" // Slight delay for smooth entry
        >
          <div className="w-full" data-aos="zoom-in" data-aos-delay="75">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Airport Statistics
            </h2>
            <AirportStatisticsBarChart />
          </div>
          <div className="w-full" data-aos="zoom-in" data-aos-delay="300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              PreCheck Usage
            </h2>
            <PreCheckUsagePieChart />
          </div>
        </section>

        {/* Analysis and Storytelling Section */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-visible">
          <div
            className="border-2 border-blue-100 rounded-[20px] p-6 bg-blue-50 shadow-sm"
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Analysis
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Total Boardings:</span>{" "}
                Indicates overall passenger activity across the airport.
              </p>
              <p>
                <span className="font-semibold">Unique Passengers:</span> Shows
                how many distinct passengers are flying.
              </p>
              <p>
                <span className="font-semibold">Unique Flight Legs:</span>{" "}
                Represents the variety of routes flown.
              </p>
              <p>
                <span className="font-semibold">PreCheck Percentage:</span>{" "}
                Highlights how many passengers utilize PreCheck for a smoother
                boarding process.
              </p>
            </div>
          </div>

          <div
            className="border-2 border-blue-100 rounded-[20px] p-6 bg-blue-50 shadow-sm"
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Storytelling
            </h3>
            <p className="text-gray-700">
              The boarding statistics offer a clear snapshot of airport
              operations. They reveal the volume of flights, the number of
              unique passengers, and the efficiency of security processes
              through PreCheck usage, providing valuable insights for
              operational improvements.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
