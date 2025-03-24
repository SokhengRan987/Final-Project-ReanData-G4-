import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import StackedBarChartDiningMethod from "../../components/foodAndBeverages/diningMethod/StackedBarChartDiningMethod";

export default function DiningMethod() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      mirror: true,
      once: false,
    });
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
            <StackedBarChartDiningMethod />
          </div>
        </section>

        {/* Storytelling Section */}
        <section className="mt-8 overflow-visible">
          <div className="border-2 border-blue-100 rounded-[20px] p-6 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
              Storytelling
            </h3>
            <p className="text-gray-700">
              This graph shows how dining preferences (dine-in, takeaway,
              delivery) align with willingness to recommend. It helps determine
              whether customers who prefer a specific dining method are more
              likely to recommend your business.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
