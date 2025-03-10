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
import FoodSurveyImg from "../img/FoodSurvey.png";

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
    <div className="flex flex-col min-h-screen  ">

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
            <h3 className="text-[#22B04B] font-bold text-lg md:text-xl lg:text-[30px]" style={{ lineHeight: "1.5", marginBottom: "0.5rem" }}>
            Where Does the Dataset Come From?
          </h3>

          <div data-aos="fade-left"  className="mb-8 p-6 rounded-lg shadow-sm transition-all hover:shadow-md h-auto bg-white max-w-[100rem] mx-auto">
            <div className="p-4">
              <p className="text-[#334155] text-sm md:text-base lg:text-[18px] leading-relaxed">
                We collected data from <span className="font-semibold">Postgres_Air by Hettie-D</span>,  
                which provides structured airline-related data. Additionally, we conducted real-world surveys  
                using <span className="font-semibold">Google Forms</span>, where participants shared insights  
                based on their personal experiences.
              </p>
              <p className="text-[#334155] text-sm md:text-base lg:text-[18px] leading-relaxed mt-4">
                To maintain data integrity, we cleaned and processed the collected information,  
                ensuring it remains free from inconsistencies and is ready for analysis.
              </p>
            </div>
          </div>

            <div className="mb-10">
              <h3 className=" text-[#22B04B] font-bold text-xl md:text-1xl lg:text-[30px] mb-2 leading-loose" style={{ lineHeight: "1.5" }}>
                Data Sources
              </h3>
              <div
  data-aos="fade-right"
  className="mb-12 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white max-w-[100rem] mx-auto overflow-hidden"
>
  {/* Header Section */}
  <div className="flex flex-col md:flex-row md:items-center md:gap-6 mb-8">
    {/* Logo Section */}
    <div className="flex justify-center md:justify-start mb-6 md:mb-0">
      <div className="h-20 w-20 bg-gradient-to-br from-[#3C55A5] to-[#2a3f7e] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
        DB
      </div>
    </div>

    {/* Content Section */}
    <div className="flex-1">
      <h3 className="text-[#1E293B] font-bold text-xl md:text-2xl lg:text-3xl mb-4 text-center md:text-left">
        Postgres-Air Database
      </h3>
      
      {/* Divider */}
      <div className="w-20 h-1 bg-[#3C55A5] rounded-full mb-4 mx-auto md:mx-0"></div>
      
    </div>
  </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-[#334155] text-base lg:text-lg leading-relaxed">
          A comprehensive structured dataset used for advanced analytics and performance experiments in the aviation industry. 
          This database provides rich information about commercial flight operations including 
          <span className="font-semibold text-[#3C55A5]"> flight schedules</span>, 
          <span className="font-semibold text-[#3C55A5]"> ticket pricing</span>, 
          <span className="font-semibold text-[#3C55A5]"> aircraft status</span>, and 
          <span className="font-semibold text-[#3C55A5]"> operational metrics</span>.
        </p>
      </div>

  {/* Features Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
    <div className="bg-[#f0f2f9] p-5 rounded-lg border-l-4 border-[#3C55A5]">
      <h4 className="font-semibold text-[#1E293B] text-lg mb-2">Routes & Schedules</h4>
      <p className="text-gray-600 text-sm">Comprehensive flight path data including origin, destination, and transit timing</p>
    </div>
    <div className="bg-[#f0f2f9] p-5 rounded-lg border-l-4 border-[#3C55A5]">
      <h4 className="font-semibold text-[#1E293B] text-lg mb-2">Pricing Models</h4>
      <p className="text-gray-600 text-sm">Historical and current ticket prices with seasonal and demand-based variations</p>
    </div>
    <div className="bg-[#f0f2f9] p-5 rounded-lg border-l-4 border-[#3C55A5]">
      <h4 className="font-semibold text-[#1E293B] text-lg mb-2">Fleet Management</h4>
      <p className="text-gray-600 text-sm">Aircraft details including maintenance records, capacity, and operational status</p>
    </div>
    <div className="bg-[#f0f2f9] p-5 rounded-lg border-l-4 border-[#3C55A5]">
      <h4 className="font-semibold text-[#1E293B] text-lg mb-2">Performance Metrics</h4>
      <p className="text-gray-600 text-sm">Key indicators for on-time performance, utilization rates, and operational efficiency</p>
    </div>
  </div>

  {/* Image Section Below Content */}
  <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
    {/* Title */}
    <h3 className="text-[#1E293B] text-center font-bold text-xl md:text-2xl mb-6">
      Entity Relationship Diagram of Postgres-Air
    </h3>
    
    {/* Image Container */}
    <div className=" overflow-hidden  bg-white mb-4">
      <div className="p-2">
        <img
          src={PostgresAirImg || "/api/placeholder/900/600"}
          alt="Airline Data Visualization"
          className="w-full h-auto "
        />
      </div>
    </div>
  </div>
</div>
              <div 
                data-aos="fade-left" 
                className="mb-12 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white max-w-[100rem] mx-auto overflow-hidden"
              >
                <div className="flex flex-col md:flex-row-reverse md:items-start gap-10">
                  {/* Image Section (Right) */}
                  <div className="md:w-1/3">
                    <div
                      className="relative w-full max-w-md mx-auto md:mx-0 "
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay="200"
                    >
                      <div className=" from-[#f0f9f0] to-[#e0f5e0] p-1">
                        <img
                          src={FoodSurveyImg || "/api/placeholder/900/600"}
                          alt="Food & Beverage Data"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Section (Left) */}
                  <div className="md:w-2/3">
                    {/* Logo and Title in same row */}
                    <div className="flex items-center mb-6">
                      <div className="h-16 w-16 bg-[#22B04B] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md mr-4">
                        F&B
                      </div>
                      <h3 className="text-[#1E293B] font-bold text-xl md:text-2xl lg:text-3xl">
                        Food & Beverage Data
                      </h3>
                    </div>

                    {/* Divider */}
                    <div className="w-20 h-1 bg-[#22B04B] rounded-full mb-6 opacity-70"></div>

                    {/* Description */}
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <p className="text-[#334155] text-base md:text-lg mb-4 leading-relaxed">
                        Our comprehensive food and beverage dataset is collected through meticulously designed 
                        <span className="font-semibold text-[#22B04B]"> Google Forms surveys </span> 
                        to gather authentic consumer insights. This approach allows us to capture detailed information about:
                      </p>
                    </div>

                    {/* Enhanced Bullet Points */}
                    <div className="space-y-5 pl-2 mb-8">
                      <div className="flex items-start">
                        <div className="h-8 w-8 bg-[#e6f3ea] text-[#22B04B] rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1E293B] text-lg mb-1">Dietary Preferences</h4>
                          <p className="text-gray-600">What kinds of food do people eat during air travel? How do these preferences vary by flight duration and time of day?</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 bg-[#e6f3ea] text-[#22B04B] rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1E293B] text-lg mb-1">Beverage Selection</h4>
                          <p className="text-gray-600">What beverages do travelers prefer? Are there notable differences between business and economy class preferences?</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 bg-[#e6f3ea] text-[#22B04B] rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1E293B] text-lg mb-1">Satisfaction Metrics</h4>
                          <p className="text-gray-600">How does food quality affect overall travel experience? What factors have the most impact on passenger satisfaction?</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Survey Methodology Note */}
                    <div className="bg-[#f0f9f0] border-l-4 border-[#22B04B] p-4 rounded-r-lg">
                      <h4 className="text-[#22B04B] font-semibold text-lg mb-2">Survey Methodology</h4>
                      <p className="text-gray-600 text-sm">
                        Our surveys target diverse demographic groups across multiple routes and airlines, with over 2,500 responses collected. Results undergo rigorous statistical analysis and validation before integration with our broader dataset.
                      </p>
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