import React from "react";
import reandatalogo from "../img/reandata.png";
import istadlogo from "../img/istad.png";

export default function Footer() {
  return (
    <div className="relative">
      <hr className="border-gray-200" />
      <footer className="bg-white text-gray-800 shadow-lg">
        <div className="mx-auto w-full max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo Section */}
            <div className="space-y-6">
              <div className="flex flex-col items-start gap-6">
                <a 
                  href="https://www.cstad.edu.kh/" 
                  target="_blank" 
                  className="group flex items-center transition-transform duration-300 hover:scale-105"
                >
                  <img 
                    src={istadlogo} 
                    className="h-16 transform transition-transform group-hover:rotate-3" 
                    alt="Istad Logo" 
                  />
                </a>
                <a 
                  href="#" 
                  className="group flex items-center transition-transform duration-300 hover:scale-105"
                >
                  <img 
                    src={reandatalogo} 
                    className="h-10 transform transition-transform group-hover:rotate-3" 
                    alt="Reandata Logo" 
                  />
                </a>
              </div>
            </div>

            {/* Features Section */}
            <div>
              <h2 className="mb-6 text-lg font-bold tracking-wide uppercase text-indigo-600">
                Features
              </h2>
              <ul className="space-y-4">
                {["Datasets", "Documentation"].map((item) => (
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

            {/* Company Section */}
            <div>
              <h2 className="mb-6 text-lg font-bold tracking-wide uppercase text-indigo-600">
                Company
              </h2>
              <ul className="space-y-4">
                {["About Us", "Help & Support"].map((item) => (
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