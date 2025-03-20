import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect } from "react";
import CohortAnalysis from "../../components/airdata/cohort/CohortAnalysis";
export default function CohortAnalysisPage() {
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
          className="grid grid-cols-1 border-2 border-gray-100 rounded-[20px] p-6 bg-white shadow-sm"
          data-aos="fade-up" // Animation for the charts section
          data-aos-delay="100" // Slight delay for smooth entry
        >
          <div className="w-full" data-aos="zoom-in" data-aos-delay="75">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_250%] bg-clip-text text-transparent animate-gradient">
              Cohort Analysis for Frequent Flyers
            </h2>
            <CohortAnalysis />
          </div>
        </section>

        {/* Analysis and Storytelling Section */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-visible">
          <div className="border-2 border-blue-100 rounded-[20px] p-6 shadow-sm">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Analysis
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                This function helps group passengers by when they first flew,
                offering insight into the behavior of frequent flyers over time.
              </p>
            </div>
          </div>

          <div className="border-2 border-blue-100 rounded-[20px] p-6 shadow-sm">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-300 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              Storytelling
            </h3>
            <p className="text-gray-700">
              The cohort analysis tells the story of how new passengers become
              frequent flyers. By examining trends over months, we can uncover
              periods of growth or stagnation, helping the business focus on
              customer retention strategies.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
