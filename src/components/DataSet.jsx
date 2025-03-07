import  { useEffect } from 'react';

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
import PostgresAirImg from "../img/postgres_air_ERD.png";

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
    <div className="flex flex-col min-h-screen ">

      {/* Hero Section */}
      <div className="w-full py-8 md:py-16 bg-gradient-to-r from-[#17203F] via-[#23315F] to-[#3C55A5] text-white text-center">
        <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Real-Time Air and Food & Beverage Data Analytics</h1>
          <p className="text-sm md:text-base text-slate-100 mb-4 md:mb-8 max-w-2xl mx-auto">
            Harnesses the power of artificial intelligence to transform your business data into actionable insights, propelling you to new heights of success
          </p>
        </div>
      </div>
  
      {/* Subtitle Section */}
      <div className="w-full py-4 md:py-8 sm:px-[7rem]">
        <div className="container mx-auto ">
          <div className="ml-2 md:ml-8">
            <p className="text-[#22B04B] text-xl md:text-2xl lg:text-[32px] font-bold" style={{lineHeight: "1.5"}}>Get to know about</p>
            <h2 className="text-[#3C55A5] font-bold text-3xl md:text-5xl lg:text-[38px]">Airline data & Food Beverage data</h2>
          </div>
        </div>
      </div>

    {/* First Content Section */}
    <div className="w-full py-6 md:py-10 bg-[#3C55A599] px-2 sm:px-36 md:px-6 text-white">
      <div className="container mx-auto sm:px-[6.5rem]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-5">
          <div className="w-full md:w-1/2 px-2 md:px-4">
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-white mb-2 md:mb-3 tracking-tight">
              Airline Data
            </h2>
            <p className="text-[#F1F5F9] text-sm md:text-base lg:text-lg text-justify mb-2 md:mb-4 tracking-tight leading-tight">
              Airline data refers to the collection of structured and unstructured information related 
              to airline operations, including flight schedules, passenger details, ticket prices, aircraft 
              status, crew management, and other operational metrics. This data is used by airlines, airports, 
              travel agencies, and regulatory bodies for decision-making, optimizing operations, and enhancing customer experience.
            </p>
          </div>
          <div className="w-full md:w-1/2 rounded-lg px-2 md:px-4">
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
    <div className="w-full py-6 md:py-10 bg-[#3C55A599] px-2 sm:px-36 md:px-6 text-white">
      <div className="container mx-auto sm:px-[6.5rem]">
        <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-3 md:gap-5">
          <div className="w-full md:w-1/2 px-2 md:px-4">
            <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-white mb-2 md:mb-3 tracking-tight">
              Food & Beverages
            </h2>
            <p className="text-white text-sm md:text-base lg:text-lg text-justify mb-2 md:mb-4 tracking-tight leading-tight">
              Food and Beverage data refers to the collection of information related to the production, 
              distribution, consumption, and sales of food and beverages. This data is used by restaurants, hotels, 
              food manufacturers, retailers, and analysts to track trends, improve customer experiences, manage inventory, 
              and optimize business operations.
            </p>
          </div>
          <div className="w-full md:w-1/2 rounded-lg px-2 md:px-4">
            <img 
              src={FoodAndBeverage}
              alt="Food and beverage display with fresh produce" 
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      </div>
    </div>

  
      {/* Data Sources & Collection Section */}
      <div className="w-full py-8 sm:px-[4.5rem] bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="px-4 md:px-8 lg:px-12">
            <h2 className="text-center text-[#3C55A5] text-2xl md:text-3xl lg:text-[38px] font-bold mb-6 leading-loose" style={{ lineHeight: "1" }}>
              Data Sources & Collection
            </h2>
            <h3 className=" text-[#22B04B] font-bold text-lg md:text-xl lg:text-[30px]" style={{ lineHeight: "1.5", marginBottom: "0.5rem" }}>
              Where The DataSet Comes From?
            </h3>

            <p className="  text-[#334155] text-sm md:text-base lg:text-[18px] mb-6 pl-8 md:pl-10 lg:pl-12" style={{ lineHeight: "1" }}>
              We collected datasets from postgres_air by hettie-d and real-life surveys using Google Forms.
            </p>

            <div className="mb-10">
              <h3 className=" text-[#22B04B] font-bold text-xl md:text-1xl lg:text-[30px] mb-2 leading-loose" style={{ lineHeight: "1.5" }}>
                Data Sources
              </h3>
              <div 
              data-aos="fade-right"  
              className="mb-8 p-6 rounded-lg shadow-sm transition-all hover:shadow-md h-auto bg-white max-w-[100rem] mx-auto"
            >
              <div className="flex flex-col md:flex-row md:items-center">
                {/* Logo Section */}
                <div className="md:w-1/6 mb-6 md:mb-0">
                  <div className="h-16 w-16 bg-[#3C55A5] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto md:mx-0">
                    DB
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-2/3">
                  <p className="text-[#1E293B] font-bold text-lg md:text-xl lg:text-2xl mb-3">
                    Postgres - Air:
                  </p>
                  <p className="text-[#334155] text-sm md:text-base lg:text-lg mb-4 leading-relaxed">
                    A dataset used for training and performance experiments, providing structured data. It includes information such as flight schedules, 
                    ticket pricing, aircraft status, and operational metrics.
                  </p>
                </div>
              </div>
              </div>
              <div 
                data-aos="fade-left"  
                className="mb-8 p-6 rounded-lg shadow-sm transition-all hover:shadow-md h-auto bg-white max-w-[100rem] mx-auto"
              >
                <div className="flex flex-col md:flex-row md:items-start">
                  {/* Logo Section */}
                  <div className="md:w-1/6 mb-6 md:mb-0 flex justify-center md:justify-start">
                    <div className="h-16 w-16 bg-[#22B04B] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                      F&B
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:w-2/3">
                    <p className="text-[#1E293B] font-bold text-lg md:text-xl lg:text-2xl mb-3">
                      Food & Beverage Data:
                    </p>
                    <p className="text-[#334155] text-sm md:text-base lg:text-lg mb-4 leading-relaxed">
                      Collected through surveys using Google Forms to gather real-life insights. For example, if we want to understand food habits in a specific area, we conduct surveys asking questions like:
                    </p>
                    <ul className="list-disc pl-6 md:pl-8 space-y-4 text-[#334155] text-sm md:text-base lg:text-lg">
                      <li className="leading-relaxed">
                        What kinds of food do people eat?
                      </li>
                      <li className="leading-relaxed">
                        What beverages do they prefer?
                      </li>
                      <li className="leading-relaxed">
                        Other related questions.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mb-8 bg-white rounded-lg shadow-md p-6 transform transition-all hover:shadow-xl hover:-translate-y-1 max-w-[100rem] mx-auto" 
                data-aos="fade-right"
              >
                <div className="flex flex-col">
                  {/* Title */}
                  <p className="text-[#1E293B] text-center font-bold text-lg md:text-xl lg:text-[24px] mb-4 pl-8 md:pl-10 lg:pl-12" style={{ lineHeight: "2.5" }}>
                    Relationship of AirData
                  </p>

                  {/* Image Section */}
                  <div className="container mx-auto px-2 max-w-6xl">
                    <div 
                      className="relative mx-auto w-full max-w-[1200px]" 
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay="200"
                    >
                      <img
                        src={PostgresAirImg || "/api/placeholder/900/600"}
                        alt="Airline Data Visualization"
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    {/* Caption */}
                    <div className="py-3 px-4 text-center text-sm text-gray-600">
                      Entity Relationship Diagram of Postgres-Air database
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="container mx-auto py-4 sm:px-[8.5rem] bg-gray-100">
        <div className="ml-100">
          <h2 className="text-center font-bold text-3xl md:text-5xl lg:text-[38px] text-[#3C55A5]"> Processing of Data</h2>
        </div>
      </div>
      <div className="w-full py-8 md:py-6 bg-gray-100">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-[78rem]">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-sm transition-all hover:shadow-md h-auto bg-white"
              data-aos={step.animation}
              data-aos-delay={(index % 3) * 100}
            >
              <div className="flex flex-col items-center text-center">
                <div className="font-bold text-xl md:text-2xl lg:text-3xl text-blue-800">
                  {step.number}. {step.title}
                </div>
              </div>
              <p className="text-[#334155] text-base md:text-lg lg:text-[18px] mb-10 leading-loose mt-2 flex flex-col items-center text-center">
                {step.description}
              </p>
              <div className="flex justify-center mt-4">
                <div className="bg-whitesmoke p-2 md:p-3 flex items-center justify-center w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
                  <img
                    src={step.imagePath}
                    alt={step.title}
                    className="w-full h-full object-contain"
                  />
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