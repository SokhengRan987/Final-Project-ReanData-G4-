import React from "react";
import reandatalogo from "../img/reandata.png";
import istadlogo from "../img/istad.png";

export default function Footer() {
  return (
    <div>
      <footer class="bg-white dark:bg-gray-900">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div class="md:flex md:justify-center gap-48">
            <div class="mb-6 md:mb-0">
              <a href="#" class="flex items-center mb-6">
                <img src={istadlogo} class="h-14 me-3" alt="Reandata Logo" />
              </a>
              <a href="#" class="flex items-center">
                <img src={reandatalogo} class="h-8 me-3" alt="Reandata Logo" />
              </a>
            </div>
            <div class="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2">
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Features
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a href="#" class="hover:underline">
                      Datasets
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" class="hover:underline">
                      Documentation
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" class="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li mb-4>
                    <a href="#" class="hover:underline">
                      Help & Support
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Contact Us
                </h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a
                      href="mailto:reandata.istad@gmail.com"
                      class="hover:underline"
                    >
                      reandata.istad@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+8551234567" class="hover:underline">
                      Phone: (+855) 12 456 789
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400 w-screen justify-center">
              © 2025{" "}
              <a href="#" class="hover:underline">
                Reandata™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
