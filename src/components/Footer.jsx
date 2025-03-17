"use client"

import reandatalogo from "../img/Logo/LogoRD.png"
import istadlogo from "../img/istad.png"
import { Mail, Phone, ChevronRight, ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <div className="border-green-200 border-t-[2px] mt-10">
      <footer className="shadow-md text-gray-800 pb-10">
        <div className="mx-auto w-full max-w-7xl px-6">
          {/* Main footer links section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
            <div className="space-y-5">
              <a href="#" className="inline-block">
                <img
                  src={reandatalogo || "/placeholder.svg?height=112&width=200"}
                  className="h-[110px] object-contain"
                  alt="Reandata Logo"
                />
              </a>

              <h3 className="font-medium text-indigo-600 text-xl">Rean Data PlatForm</h3>
            </div>

            {/* Features Section */}
            <div>
              <h2 className="text-lg font-bold mb-6 text-gray-800 relative inline-block">
                Features
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-indigo-500"></span>
              </h2>
              <ul className="space-y-4">
                {[
                  { name: "Datasets", link: "/dataset" },
                  { name: "Documentation", link: "/documentation" },
                  { name: "About Us", link: "/about-us" },
                  { name: "Help & Support", link: "help&support" },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.link}
                      className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ChevronRight
                        size={16}
                        className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-indigo-600"
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-6 text-gray-800 relative inline-block">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-indigo-500"></span>
              </h2>
              <ul className="space-y-5">
                <li>
                  <a
                    href="mailto:reandata.istad@gmail.com"
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-start gap-3 group"
                  >
                    <Mail size={18} className="text-indigo-500 mt-0.5" />
                    <span>reandata.istad@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+85512456789"
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-start gap-3 group"
                  >
                    <Phone size={18} className="text-indigo-500 mt-0.5" />
                    <span>(+855) 12 456 789</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h2 className="text-lg font-bold mb-6 text-gray-800 relative inline-block">
                Organized By
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-indigo-500"></span>
              </h2>
              <div className="space-y-6">
                <a href="https://www.cstad.edu.kh/" target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="bg-white rounded-lg p-5 transition-all duration-300 group-hover:bg-gray-100 border border-gray-200 group-hover:border-indigo-200">
                    <img
                      src={istadlogo || "/placeholder.svg?height=64&width=150"}
                      className="h-14 transform transition-transform group-hover:scale-105"
                      alt="Istad Logo"
                    />
                  </div>
                  <div className="flex items-center text-sm text-indigo-600 mt-3 group-hover:text-indigo-800 transition-colors">
                    <span>Visit ISTAD website</span>
                    <ArrowUpRight size={14} className="ml-1" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <span className="text-sm text-gray-500">
                  © {new Date().getFullYear()}{" "}
                  <a
                    href="#"
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                  >
                    Reandata™
                  </a>
                </span>
                <span className="hidden sm:block text-gray-400">|</span>
                <span className="text-sm text-gray-500">All Rights Reserved</span>
              </div>
              <div className="mt-6 text-center sm:text-right">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  Back to top
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-up"
                  >
                    <path d="m5 12 7-7 7 7" />
                    <path d="M12 19V5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

