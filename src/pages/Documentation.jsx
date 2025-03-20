import  { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Step1Img from "../img/Step1.png";
import Step2Img from "../img/Step2.png";

const Documentation = () => {
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100,
        });
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            
            <div className="w-full py-8 md:py-16 bg-gradient-to-r from-[#17203F] via-[#23315F] to-[#3C55A5] text-white text-center">
              <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">How To Use Dataset</h1>
                <p className="text-sm md:text-base text-slate-100 mb-4 md:mb-8 max-w-2xl mx-auto">
                  Explore, analyze, and share quality data. Learn more about
                  data types, creating, and collaborating.
                </p>
              </div>
            </div>
            
             {/* Quick Start Guide */}
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 xl:px-36 w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10" data-aos="fade-up">Quick Start Guide</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Step 1 Card */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300" data-aos="fade-right" data-aos-delay="100">
                        <div className="p-1 bg-[#3C55A5]"></div>
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="bg-[#3C55A5] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">
                                    1
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Account Setup</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Click <strong>Get Started</strong> to access your dashboard. New users can create an account 
                                first, while existing users can simply log in.
                            </p>
                            <div className="rounded-lg bg-gray-100 p-4 flex items-center justify-center h-50">
                                <div className="flex flex-col items-center text-gray-500">
                                    <img src={Step1Img} alt="Login Preview" className="w-full object-contain" />
                                    <p>Login page preview</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 Card */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300" data-aos="fade-left" data-aos-delay="200">
                        <div className="p-1 bg-[#3C55A5]"></div>
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="bg-[#3C55A5] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">
                                    2
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Explore Your Dashboard</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Your dashboard displays two primary data categories:
                            </p>
                            <ul className="space-y-3 text-gray-600 mb-4">
                                <li className="flex items-start">
                                    <span className="text-[#3C55A5] mr-2">•</span>
                                    <span><strong>Environmental Data:</strong> Access air quality metrics, temperature trends, and pollution indicators</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#3C55A5] mr-2">•</span>
                                    <span><strong>Consumer Data:</strong> Explore food & beverage consumption patterns and market trends</span>
                                </li>
                            </ul>
                            <div className="rounded-lg bg-gray-100 p-4 flex items-center justify-center h-50">
                                <div className="flex flex-col items-center text-gray-500">
                                    <img src={Step2Img} alt="Login Preview" className="w-full object-contain" />
                                    <p>Dashboard preview</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Elements */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-12" data-aos="fade-up" data-aos-delay="300">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Interactive Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border border-[#3C55A5]/20 rounded-lg bg-[#3C55A5]/5 hover:bg-[#3C55A5]/10 transition duration-300" data-aos="zoom-in" data-aos-delay="400">
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3C55A5] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <h4 className="font-bold text-gray-800">Search Data</h4>
                            </div>
                            <p className="text-gray-600 text-sm">Filter by categories, date ranges, and specific metrics</p>
                        </div>
                        <div className="p-4 border border-[#3C55A5]/20 rounded-lg bg-[#3C55A5]/5 hover:bg-[#3C55A5]/10 transition duration-300" data-aos="zoom-in" data-aos-delay="500">
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3C55A5] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <h4 className="font-bold text-gray-800">View Charts</h4>
                            </div>
                            <p className="text-gray-600 text-sm">Transform tables into interactive visualizations with one click</p>
                        </div>
                        <div className="p-4 border border-[#3C55A5]/20 rounded-lg bg-[#3C55A5]/5 hover:bg-[#3C55A5]/10 transition duration-300" data-aos="zoom-in" data-aos-delay="600">
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3C55A5] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <h4 className="font-bold text-gray-800">Export Results</h4>
                            </div>
                            <p className="text-gray-600 text-sm">Download data in multiple formats for presentations or further analysis</p>
                        </div>
                    </div>
                </div>
            </div> 

            {/* Visualization Techniques */}
            <div className="py-12">
                <div className="container mx-auto px-6 sm:px-6 lg:px-8 xl:px-36 w-full">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10" data-aos="fade-up">Visualization Techniques</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {/* Technique Cards */}
                        {[
                            {
                                title: "Line Charts",
                                description: "Track changes over time and identify trends in continuous data",
                                color: "#3C55A5",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Bar Charts",
                                description: "Compare quantities across different categories with clarity",
                                color: "#3C55A5",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Scatter Plots",
                                description: "Identify correlations between variables in your dataset",
                                color: "#22B04B",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Heat Maps",
                                description: "Visualize complex data matrices with color intensity variations",
                                color: "#22B04B",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                )
                            }
                        ].map((technique, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                                data-aos="flip-up"
                                data-aos-delay={100 * (index + 1)}
                            >
                                <div className={`p-1 bg-[${technique.color}]`}></div>
                                <div className="p-6">
                                    <div className={`h-16 w-16 rounded-full bg-[${technique.color}]/10 flex items-center justify-center mb-4 text-[${technique.color}]`}>
                                        {technique.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{technique.title}</h3>
                                    <p className="text-gray-600">{technique.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
            
                    {/* Analysis Methods Section */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 mb-12" data-aos="fade-up" data-aos-delay="300">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Analysis Methods</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="p-4 border-l-4 border-[#3C55A5] bg-[#3C55A5]/5 rounded hover:translate-x-1 transition-transform" data-aos="fade-right" data-aos-delay="100">
                                    <h4 className="font-bold text-gray-800 mb-1">Descriptive Analysis</h4>
                                    <p className="text-gray-600 text-sm">Summarizes data to identify patterns using metrics like mean, median, and standard deviation</p>
                                </div>
                                
                                <div className="p-4 border-l-4 border-[#3C55A5] bg-[#3C55A5]/5 rounded hover:translate-x-1 transition-transform" data-aos="fade-right" data-aos-delay="200">
                                    <h4 className="font-bold text-gray-800 mb-1">Diagnostic Analysis</h4>
                                    <p className="text-gray-600 text-sm">Examines why trends occurred by exploring correlations and cause-effect relationships</p>
                                </div>
                                
                                <div className="p-4 border-l-4 border-[#22B04B] bg-[#22B04B]/5 rounded hover:translate-x-1 transition-transform" data-aos="fade-right" data-aos-delay="300">
                                    <h4 className="font-bold text-gray-800 mb-1">Predictive Analysis</h4>
                                    <p className="text-gray-600 text-sm">Uses historical patterns to forecast future outcomes and anticipate trends</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="p-4 border-l-4 border-[#22B04B] bg-[#22B04B]/5 rounded hover:translate-x-1 transition-transform" data-aos="fade-left" data-aos-delay="100">
                                    <h4 className="font-bold text-gray-800 mb-1">Prescriptive Analysis</h4>
                                    <p className="text-gray-600 text-sm">Recommends actions to optimize outcomes based on insights from other analyses</p>
                                </div>
                                
                                <div className="p-4 border-l-4 border-[#3C55A5] bg-[#3C55A5]/5 rounded hover:translate-x-1 transition-transform" data-aos="fade-left" data-aos-delay="200">
                                    <h4 className="font-bold text-gray-800 mb-1">Exploratory Analysis</h4>
                                    <p className="text-gray-600 text-sm">Investigates data without predefined hypotheses to discover hidden patterns</p>
                                </div>
                                
                                <div className="p-4 border-l-4 border-[#22B04B] bg-[#22B04B]/5 rounded hover:translate-x-1 transition-transform" data-aos="fade-left" data-aos-delay="300">
                                    <h4 className="font-bold text-gray-800 mb-1">Causal Analysis</h4>
                                    <p className="text-gray-600 text-sm">Determines direct effects between variables through controlled experimental techniques</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Preparation Steps */}
            <div className="container mx-auto px-6 py-12 sm:px-6 lg:px-8 xl:px-36 w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10" data-aos="fade-up">Data Preparation Process</h2>
                
                <div className="relative">
                    {/* Timeline line */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#3C55A5]/20"></div>
                    
                    {/* Timeline items */}
                    <div className="space-y-12">
                        {[
                            {
                                title: "Collect Raw Data",
                                description: "Gather information from multiple sources including APIs, databases, spreadsheets, and manual inputs",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                    </svg>
                                ),
                                color: "#3C55A5"
                            },
                            {
                                title: "Clean & Transform",
                                description: "Remove duplicates, handle missing values, and convert data into consistent formats for analysis",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                ),
                                color: "#22B04B"
                            },
                            {
                                title: "Analyze & Visualize",
                                description: "Apply statistical methods and create visual representations to extract meaningful insights",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                ),
                                color: "#3C55A5"
                            },
                            {
                                title: "Share & Collaborate",
                                description: "Present findings through interactive dashboards and generate shareable reports",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                ),
                                color: "#22B04B"
                            }
                        ].map((step, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-center">
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:order-last md:text-left md:pl-8'}`}>
                                    <div 
                                        className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ${index % 2 === 0 ? 'md:mr-4' : 'md:ml-4'}`}
                                        data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                                        data-aos-delay={100 * (index + 1)}
                                    >
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                                
                                <div className="mt-4 md:mt-0 md:mx-0 z-10 flex-shrink-0" data-aos="zoom-in" data-aos-delay={150 * (index + 1)}>
                                    <div className={`bg-[${step.color}] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-md`}>
                                        {step.icon}
                                    </div>
                                </div>
                                
                                <div className={`flex-1 hidden md:block ${index % 2 === 0 ? 'md:order-last md:text-left md:pl-8' : 'md:text-right md:pr-8'}`}>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-[#17203F] via-[#23315F] to-[#3C55A5] py-16">
                <div className="container mx-auto px-6 text-center sm:px-6 lg:px-8 xl:px-16 w-full">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Data?</h2>
                    <p className="text-white mb-8 max-w-2xl mx-auto">
                        Unlock the full potential of your datasets with our powerful visualization tools
                    </p>
                </div>
            </div>

        </div>
    );
};
  
export default Documentation;