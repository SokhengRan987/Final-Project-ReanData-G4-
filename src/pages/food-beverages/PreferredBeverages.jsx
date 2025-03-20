import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect } from "react";
import BeveragesBarChart from "../../components/foodAndBeverages/preferenceBeverages/BarChart";

export default function PreferredBeverages() {
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
          className="border-2 border-gray-100 rounded-[20px] shadow-sm"
          data-aos="fade-up" // Animation for the charts section
          data-aos-delay="100" // Slight delay for smooth entry
        >
          <div className="w-full" data-aos="zoom-in" data-aos-delay="75">
            <BeveragesBarChart />
          </div>
        </section>

        {/* Storytelling Section */}
        <section className="mt-8 overflow-visible">
          <div className="border-2 border-blue-100 rounded-[20px] p-6 shadow-sm">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Storytelling
            </h3>
            <p className="text-gray-700">
              This graph shows beverage preferences across different occupations
              (e.g., coffee, tea, wine). It can help identify potential niche
              markets or customer segments based on occupation.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
