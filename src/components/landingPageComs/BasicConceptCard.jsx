import React from "react";
import PropTypes from "prop-types";

export default function BasicConceptCard({ title, description, icon, alt, delay }) {
  return (
    
    <div
      className="flex flex-col items-center text-center p-8 bg-white rounded-[20px] shadow-xl transition-transform transform hover:scale-[1.02] border-2 border-blue-100 hover:shadow-blue-50 hover:ring-2 hover:ring-blue-400 max-w-md mx-auto"
      data-aos="slide-up"
      data-aos-delay={delay}
      data-aos-duration="900"
    >
      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 leading-relaxed text-base md:text-lg mb-6">
        {description}
      </p>

      {/* Icon */}
      <img
        src={icon}
        alt={alt || title} // Fallback to title if alt is not provided
        className="w-32 h-32 object-contain"
      />
    </div>
  );
}

// PropTypes for type checking
BasicConceptCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired, // Path to the icon/image
  alt: PropTypes.string,
};


            //   {/* Card 1 */}
            //   <div className="p-6 bg-white rounded-[20px] shadow-xl transition-transform transform hover:scale-[1.02] flex flex-col items-center text-center border-2 border-blue-100 hover:shadow-blue-50 hover:ring-2 hover:ring-blue-400"
            //   data-aos="slide-up"
            //   data-aos-delay="100"
            //   >
            //     <div className="text-blue-500 text-5xl mb-4">📊</div>
            //     <h3 className="text-xl font-semibold text-gray-800 mb-4">
            //       Real-World Datasets
            //     </h3>
            //     <p className="text-gray-500 leading-relaxed ">
            //       Reandata provides access to real-world datasets like AirData and Food & Beverages,
            //       allowing beginners to practice data analysis in a hands-on, interactive way.
            //     </p>
            //   </div>