import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect } from "react";

import BarChart from "../../components/foodAndBeverages/preferredPromotion/BarChart";

export default function PreferredPromotion() {
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
          className="grid grid-cols-1 border-2 border-gray-100 bg-white shadow-sm rounded-[20px] p-6"
          data-aos="fade-up" // Animation for the charts section
          data-aos-delay="100" // Slight delay for smooth entry
        >
          <div className="w-full" data-aos="zoom-in" data-aos-delay="75">
            <BarChart />
          </div>
        </section>

        {/* Storytelling Section */}
        <section className="mt-8 overflow-visible">
          <div className="border-2 border-blue-100 rounded-[20px] p-6">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Storytelling
            </h3>
            <p className="text-gray-700">
              This graph visualizes the most preferred types of promotions
              (e.g., discounts, coupons, happy hours) and helps in understanding
              which promotional strategies are likely to attract more customers.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
