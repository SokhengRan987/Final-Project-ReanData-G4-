import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AirlineData from "../img/AirlineData.jpg";
import FoodAndBeverage from "../img/Food and Beverage.webp";

import defineObjectivesImg from "../img/Define Objectives and Questions.jpg";
import cleanDataImg from "../img/Clean Data.png";
import analyzeDataImg from "../img/Analyze data.png";
import presentFindingImg from "../img/Present Finding.jpg";
import collectDataImg from "../img/Collect Data.png";
import DataVisualizationImg from "../img/Data Visualization.png";

const DataSet = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const steps = [
    {
      number: 1,
      title: "Define Objectives & Questions",
      description: "Identify the goal of the analysis and key questions to answer.",
      imagePath: defineObjectivesImg,
      animation: "fade-right"
    },
    {
      number: 2,
      title: "Collect Data",
      description: "Gather relevant data through surveys, databases, observations.",
      imagePath: collectDataImg,
      animation: "fade-left"
    },
    {
      number: 3,
      title: "Clean Data",
      description: "Process the collected data to remove inconsistencies, duplicates, and errors for better analysis.",
      imagePath: cleanDataImg,
      animation: "fade-right"
    },
    {
      number: 4,
      title: "Analyze Data",
      description: "Apply statistical methods and analytics techniques to interpret the data and extract meaningful insights.",
      imagePath: analyzeDataImg,
      animation: "fade-left"
    },
    {
      number: 5,
      title: "Data Visualization",
      description: "Present data using charts, graphs, and dashboards.",
      imagePath: DataVisualizationImg,
      animation: "fade-right"
    },
    {
      number: 6,
      title: "Present Findings",
      description: "Communicate insights and recommendations to stakeholders in easy-to-digest formats.",
      imagePath: presentFindingImg,
      animation: "fade-left"
    }
  ];
  
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="w-full py-8 md:py-16 bg-gradient-to-r from-[#17203F] via-[#23315F] to-[#3C55A5] text-white text-center">
        <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Real-Time Air and Food & Beverage Data Analytics</h1>
          <p className="text-sm md:text-base text-slate-100 mb-4 md:mb-8 max-w-2xl mx-auto">
            Harnesses the power of artificial intelligence to transform your business data into actionable insights, propelling you to new heights of success
          </p>
          <button className="bg-[#22B04B] hover:bg-green-600 text-white font-bold py-2 px-4 md:px-6 rounded-[10px] transition duration-300 text-sm md:text-base">
            View Datasets
          </button>
        </div>
      </div>

      {/* Subtitle Section */}
      <div className="w-full py-4 md:py-8">
        <div className="container mx-auto px-4">
          <div className="ml-2 md:ml-8">
            <p className="text-[#FF0000] text-xl md:text-2xl lg:text-[32px] font-bold">Get to know about</p>
            <h2 className="text-[#3C55A5] font-bold text-3xl md:text-5xl lg:text-[64px]">Airline data & FB</h2>
          </div>
        </div>
      </div>

      {/* First Content Section */}
      <div className="w-full py-8 md:py-16 bg-[#3C55A599] p-4 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
            <div className="w-full md:w-1/2 p-2 md:p-4">
              <h2 className="text-2xl md:text-3xl lg:text-[48px] font-bold text-white mb-2 md:mb-4">Airline Data</h2>
              <p className="text-[#F1F5F9] text-base md:text-lg lg:text-[20px] text-justify mb-3 md:mb-6">
                Airline data refers to the collection of structured and unstructured information related 
                to airline operations, including flight schedules, passenger details, ticket prices, aircraft 
                status, crew management, and other operational metrics. This data is used by airlines, airports, 
                travel agencies, and regulatory bodies for decision-making, optimizing operations, and enhancing customer experience.
              </p>
              <button className="bg-[#3C55A5] hover:bg-indigo-700 text-white font-medium py-1 md:py-2 px-4 md:px-6 rounded-md transition duration-300 text-sm md:text-base">
                Explore Here
              </button>
            </div>

            <div className="w-full md:w-1/2 rounded-lg p-2 md:p-4 mt-4 md:mt-0">
              <img 
                src={AirlineData}
                alt="Airline data analytics" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Second Content Section */}
      <div className="w-full py-8 md:py-16 bg-[#3C55A599] p-4 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4 md:gap-8">
            <div className="w-full md:w-1/2 p-2 md:p-4">
              <h2 className="text-2xl md:text-3xl lg:text-[48px] font-bold text-[#1E293B] mb-2 md:mb-4">Food & Beverages</h2>
              <p className="text-[#334155] text-base md:text-lg lg:text-[20px] text-justify mb-3 md:mb-6">
                Food and Beverage data refers to the collection of information related to the production, 
                distribution, consumption, and sales of food and beverages. This data is used by restaurants, hotels, 
                food manufacturers, retailers, and analysts to track trends, improve customer experiences, manage inventory, 
                and optimize business operations.
              </p>
              <button className="bg-[#3C55A5] hover:bg-indigo-700 text-white font-medium py-1 md:py-2 px-4 md:px-6 rounded-md transition duration-300 text-sm md:text-base">
                Explore Here
              </button>
            </div>
            <div className="w-full md:w-1/2 rounded-lg p-2 md:p-4 mt-4 md:mt-0">
              <img 
                src={FoodAndBeverage}
                alt="Food and beverage display with fresh produce" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="container mx-auto py-4">
        <div className="ml-8">
          <h2 className="text-black font-bold text-3xl md:text-5xl lg:text-[48px]">Data Sources & Collection</h2>
        </div>
      </div>
      <div className="w-full py-8 md:py-12">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"style={{width:"1278px"}}>
            {steps.map((step, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg shadow-md transition-all hover:shadow-lg h-auto"
                data-aos={step.animation}
                data-aos-delay={(index % 3) * 100}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="font-bold text-xl md:text-2xl lg:text-[36px] text-blue-800">{step.number}. {step.title}</div>
                </div>
                <p className="text-sm md:text-base lg:text-[24px] text-gray-700 mt-2 flex flex-col items-center text-center">
                  {step.description}
                </p>
                <div className="flex justify-center mt-4">
                  <div className="bg-white p-2 md:p-3 flex items-center justify-center w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                    <img src={step.imagePath} alt={step.title} className="max-w-full max-h-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSet;