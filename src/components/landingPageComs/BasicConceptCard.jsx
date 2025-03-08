import React from "react";
import PropTypes from "prop-types";

export default function BasicConceptCard({ title, description, icon, alt, delay }) {
  return (
    <div
      className="flex flex-col items-center text-center p-6 sm:p-8 bg-white rounded-2xl shadow-xl transition-transform transform hover:scale-[1.02] border-2 border-blue-100 hover:shadow-blue-50 hover:ring-2 hover:ring-blue-400 w-full max-w-md mx-auto"
      data-aos="fade-up"
      data-aos-delay={delay}
      data-aos-duration="900"
    >
      {/* Title */}
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 leading-relaxed text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
        {description}
      </p>

      {/* Icon */}
      <img
        src={icon}
        alt={alt || title}
        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
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
  delay: PropTypes.number,
};
