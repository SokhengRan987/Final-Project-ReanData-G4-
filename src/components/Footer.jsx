import React from "react";
import reandatalogo from "../img/reandata.png";
import istadlogo from "../img/istad.png";

export default function Footer() {
  return (
    <div>
      <hr />
<<<<<<< HEAD
      <footer className="bg-white shadow-md">
=======
      <footer className="bg-white dark:bg-gray-900 shadow-md">
>>>>>>> 889806776b6360802b8f2f9044d277960be3949d
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          {/* Flex container for logo and links */}
          <div className="md:flex md:justify-between md:items-start">
            {/* Logo section */}
            <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
              <a
                href="https://www.cstad.edu.kh/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mb-6"
              >
                <img src={istadlogo} className="h-14 me-3" alt="Istad Logo" />
              </a>
              <a href="#" className="flex items-center">
                <img src={reandatalogo} className="h-8 me-3" alt="Reandata Logo" />
              </a>
            </div>

            {/* Grid container for Features and Contact Us */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
              {/* Features section */}
              <div>
<<<<<<< HEAD
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                  Features
                </h2>
                <ul className="text-gray-500 font-medium">
=======
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Features
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
>>>>>>> 889806776b6360802b8f2f9044d277960be3949d
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Datasets
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Documentation
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Help & Support
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Us section */}
              <div>
<<<<<<< HEAD
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                  Contact Us
                </h2>
                <ul className="text-gray-500 font-medium">
=======
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Contact Us
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
>>>>>>> 889806776b6360802b8f2f9044d277960be3949d
                  <li className="mb-4">
                    <a
                      href="mailto:reandata.istad@gmail.com"
                      className="hover:underline"
                    >
                      reandata.istad@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+8551234567" className="hover:underline">
                      Phone: (+855) 12 456 789
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
<<<<<<< HEAD
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

          {/* Copyright section */}
          <div className="sm:flex sm:items-center sm:justify-center">
            <span className="text-sm text-gray-500 sm:text-center ">
=======
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

          {/* Copyright section */}
          <div className="sm:flex sm:items-center sm:justify-center">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
>>>>>>> 889806776b6360802b8f2f9044d277960be3949d
              © 2025{" "}
              <a href="#" className="hover:underline">
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