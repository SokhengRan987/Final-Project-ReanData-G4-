import React from "react";
import reandatalogo from "../img/reandataicon2.png";
import istadlogo from "../img/istad.png";

export default function Footer() {
  return (
    <div className="relative">
      <hr className="border-gray-200" />
      <footer className="bg-white text-gray-800 shadow-lg">
        <div className="mx-auto w-full max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Redesigned Logo Section - Clean Version */}
            <div>
              <div className="relative overflow-hidden rounded-lg border border-indigo-100 p-5">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-indigo-100 opacity-50"></div>
                <div className="absolute -bottom-8 -left-8 h-16 w-16 rounded-full bg-indigo-50 opacity-70"></div>
                
                {/* Logo with elegant styling */}
                <div className="relative z-10 flex flex-col items-start space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-1 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full"></div>
                    <a href="#" className="transition-transform duration-300 hover:translate-x-1">
                      <img 
                        src={reandatalogo || "/placeholder.svg"} 
                        className="h-28 object-contain" 
                        alt="Reandata Logo" 
                      />
                    </a>
                  </div>
                  
                  {/* Tagline with underline effect */}
                  <h3 className="font-medium text-indigo-700 relative pb-2 text-lg">
                    Cambodia's Open Data Platform
                    <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-indigo-400"></span>
                  </h3>
                  
                  {/* Description with improved typography */}
                  {/* <p className="text-gray-600 text-sm leading-relaxed">
                    Reandata provides high-quality datasets for researchers, developers, and policymakers 
                    across Cambodia, enabling data-driven innovation and informed decision-making.
                  </p> */}
                  
                  {/* Call to action button instead of social icons */}
                  {/* <a 
                    href="#" 
                    className="mt-2 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Learn more about our mission
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="ml-1 h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </a> */}
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div>
              <h2 className="mb-6 text-lg font-bold tracking-wide uppercase text-indigo-600">
                Features
              </h2>
              <ul className="space-y-4">
                {["Datasets", "Documentation","About Us", "Help & Support"].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h2 className="mb-6 text-lg font-bold tracking-wide uppercase text-indigo-600">
                Contact Us
              </h2>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:reandata.istad@gmail.com"
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    reandata.istad@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+8551234567"
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    (+855) 12 456 789
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h2 className="mb-6 text-lg font-bold tracking-wide uppercase text-indigo-600">
              Organized By
              </h2>
              <div className="flex flex-col items-start gap-6">
                <a 
                  href="https://www.cstad.edu.kh/" 
                  target="_blank" 
                  className="group flex items-center transition-transform duration-300 hover:scale-105"
                >
                  <img 
                    src={istadlogo || "/placeholder.svg"} 
                    className="h-16 transform transition-transform group-hover:rotate-3" 
                    alt="Istad Logo" 
                  />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Section */}
          <hr className="my-8 border-gray-200" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm text-gray-500">
              © 2025{" "}
              <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                Reandata™
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                <span className="text-xl">⦿</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                <span className="text-xl">⦿</span>
              </a>
            </div>
          </div>
        </div>
        {/* Decorative Element */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-tl-full pointer-events-none"></div>
      </footer>
    </div>
  );
}