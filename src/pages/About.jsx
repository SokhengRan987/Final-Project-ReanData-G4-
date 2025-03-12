import { Carousel } from "flowbite-react";
import { IoDiamond } from "react-icons/io5";
import { FaSitemap } from "react-icons/fa6";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <main className="overflow-hidden">
        {/* Hero Carousel Section */}
        <section>
          <div className="h-[400px] sm:h-64 xl:h-[400px] 2xl:h-[490px]">
            <Carousel
              onSlideChange={(index) => console.log("onSlideChange()", index)}
              indicators={true}
              slideInterval={5000}
            >
              <div className="relative flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                <img
                  src="https://t4.ftcdn.net/jpg/04/38/93/15/240_F_438931535_DhZaUQHbGvGUxLzPNzT4inocmtABLBoO.jpg"
                  alt="Data visualization"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-black/50 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20 lg:px-36">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  >
                    Rean Data
                  </motion.h3>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-white text-lg md:text-xl"
                  >
                    A platform designed to help beginners explore data analysis,{" "}
                    <br className="hidden md:block" />
                    management, and visualization in an interactive and
                    user-friendly way.
                  </motion.span>
                </div>
              </div>
              <div className="relative flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                <img
                  src="https://t3.ftcdn.net/jpg/02/19/65/76/240_F_219657640_0xOly1CmE7mnNdVIfEzDgP6pS6QqtUok.jpg"
                  alt="Vision"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-black/50 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20 lg:px-36">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  >
                    Vision
                  </motion.h3>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-white text-lg md:text-xl"
                  >
                    To make data analytics accessible for everyone by providing
                    an <br className="hidden md:block" />
                    interactive platform for hands-on learning, visualization,
                    and real-world data exploration.
                  </motion.span>
                </div>
              </div>
              <div className="relative flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                <img
                  src="https://t4.ftcdn.net/jpg/04/90/91/39/240_F_490913988_q2aQezS0Q0IDFQp1RGip5zEgJ4dArqTn.jpg"
                  alt="Mission"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-black/50 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20 lg:px-36">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  >
                    Mission
                  </motion.h3>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-white text-lg md:text-xl"
                  >
                    To provide beginner-friendly tools, real-world datasets, and{" "}
                    <br className="hidden md:block" />
                    interactive visualizations that help users develop essential
                    data skills and make informed decisions
                  </motion.span>
                </div>
              </div>
            </Carousel>
          </div>
        </section>

        {/* About Us Section */}
        <section className="lg:px-36 sm:px-10 md:px-10 px-5 py-16 bg-gradient-to-b from-white to-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <span className="text-red-600 font-bold text-2xl block">
              ABOUT US
            </span>
            <span className="text-blue-800 font-bold text-4xl md:text-5xl lg:text-6xl">
              REAN DATA?
            </span>
          </motion.div>

          <div className="grid grid-cols-12 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="col-span-12 lg:col-span-7 space-y-8"
            >
              <div className="mb-8">
                <h5 className="text-lg sm:text-xl md:text-2xl font-semibold ml-6 text-blue-800">
                  WHY SHOULD YOU CHOOSE US?
                </h5>
                <div className="border-l-8 border-red-600">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 ml-4">
                    REAN DATA <br /> Website
                  </h1>
                </div>
              </div>

              <div className="mb-8 bg-white p-6 rounded-[20px] shadow-sm hover:shadow-md  transition-shadow duration-300">
                <h1 className="flex flex-row items-center text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#929abd] mr-4 rotate-45"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64z"></path>
                  </svg>
                  WHO WE ARE?
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 tracking-wide mb-4 pl-14">
                  We are a team of data enthusiasts dedicated to making data
                  analytics accessible to everyone. Our platform bridges the gap
                  between complex data science and everyday users, providing
                  intuitive tools that transform raw data into meaningful
                  insights. With a focus on education and practical application,
                  we empower users to make data-driven decisions with
                  confidence.
                </p>
              </div>

              <div className="mb-8 bg-white p-6 rounded-[20px] shadow-sm hover:shadow-md transition-shadow duration-300">
                <h1 className="flex flex-row items-center text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-8">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-[#515d96] w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-4 rotate-45"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64z"></path>
                  </svg>
                  VISION & MISSION
                </h1>

                <div className="space-y-6">
                  <div className="space-y-4 bg-blue-50 p-5 rounded-lg">
                    <h4 className="flex flex-row items-center text-lg sm:text-xl md:text-2xl font-bold text-blue-800">
                      <IoDiamond className="mr-4 text-[#515d96] text-2xl" />
                      OUR VISION
                    </h4>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 pl-10">
                      To become the go-to platform for beginners in data
                      analytics, making data exploration simple, insightful, and
                      practical for real-world applications.
                    </p>
                  </div>

                  <div className="space-y-4 bg-red-50 p-5 rounded-lg">
                    <h4 className="flex flex-row items-center text-lg sm:text-xl md:text-2xl font-bold text-red-800">
                      <FaSitemap className="mr-4 text-[#515d96] text-2xl" />
                      OUR MISSION
                    </h4>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 pl-10">
                      To provide beginner-friendly tools, real-world datasets,
                      and interactive visualizations that help users develop
                      essential data skills and make informed decisions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="col-span-12 lg:col-span-5 space-y-6"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-lg z-0"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-100 rounded-lg z-0"></div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Data Analytics"
                  className="rounded-lg shadow-2xl relative z-10 w-full h-auto object-cover"
                />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm mt-16">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">
                  Our Approach
                </h3>
                <ul className="space-y-4">
                  {[
                    "User-friendly interface for beginners",
                    "Real-world datasets for practical learning",
                    "Interactive visualizations for better understanding",
                    "Step-by-step tutorials for skill development",
                    "Community support for collaborative learning",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 mr-3 bg-blue-600 text-white rounded-full flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mentors Section */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="lg:px-36 sm:px-10 md:px-10 px-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-blue-600 font-bold text-xl inline-block mb-2">
                OUR MENTORS
              </span>
              <h2 className="text-red-700 font-bold text-4xl md:text-5xl">
                Learn From The Best
              </h2>
              <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
              <p className="text-gray-700 max-w-2xl mx-auto mt-6 text-lg">
                Our mentors are industry leaders who provide guidance, share
                expertise, and help our users develop their data skills.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {[
                {
                  name: "Dr. Robert Williams",
                  image:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  title: "Data Science Mentor",
                  bio: "Former Google AI researcher with over 15 years of expertise in machine learning and predictive analytics.",
                  quote:
                    "My goal is to demystify data science and make it accessible to everyone.",
                },
                {
                  name: "Jennifer Lee",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  title: "AI Specialist",
                  bio: "AI expert with a decade of experience in natural language processing and deep learning.",
                  quote:
                    "Empowering the next generation of innovators through practical AI knowledge.",
                },
              ].map((mentor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-64 object-cover object-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className="absolute top-4 left-4 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <MdSchool className="h-6 w-6" />
                    </motion.div>
                  </div>
                  <div className="p-6 text-center">
                    <motion.h3
                      className="text-2xl font-bold text-red-700 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {mentor.name}
                    </motion.h3>
                    <motion.p
                      className="text-blue-600 font-medium text-lg mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {mentor.title}
                    </motion.p>
                    <motion.p
                      className="text-gray-700 text-base mb-4 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {mentor.bio}
                    </motion.p>
                    <motion.p
                      className="text-gray-700 text-base italic mb-4 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      "{mentor.quote}"
                    </motion.p>
                    <motion.div
                      className="flex gap-4 justify-center mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <motion.button
                        className="p-2 bg-gray-100 rounded-full text-red-600"
                        whileHover={{
                          backgroundColor: "#FEE2E2",
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <FaLinkedin className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        className="p-2 bg-gray-100 rounded-full text-red-600"
                        whileHover={{
                          backgroundColor: "#FEE2E2",
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <FaTwitter className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        className="p-2 bg-gray-100 rounded-full text-red-600"
                        whileHover={{
                          backgroundColor: "#FEE2E2",
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <FaGithub className="h-5 w-5" />
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="lg:px-36 sm:px-10 md:px-10 px-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-red-600 font-bold text-xl inline-block mb-2">
                OUR EXPERTS
              </span>
              <h2 className="text-blue-800 font-bold text-4xl md:text-5xl">
                Meet Our Team
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
              <p className="text-gray-700 max-w-2xl mx-auto mt-6 text-lg">
                Our diverse team of data experts brings together years of
                experience in data science, analytics, and education to create
                the best learning experience for you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Chao VanThoung",
                  role: "Data Scientist & Founder",
                  image:
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
                  bio: "I'm currently a student at the Institution of Science and Technology Advanced Development and the Royal University of Phnom Penh",
                },
                {
                  name: "Michael Chen",
                  role: "Lead Developer",
                  image:
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  bio: "Full-stack developer with expertise in building interactive data visualization tools.",
                },
                {
                  name: "Emily Rodriguez",
                  role: "UX/UI Designer",
                  image:
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
                  bio: "Creates intuitive user experiences that make complex data accessible to everyone.",
                },
                {
                  name: "Chao VanThoung",
                  role: "Data Scientist & Founder",
                  image:
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
                  bio: "I'm currently a student at the Institution of Science and Technology Advanced Development and the Royal University of Phnom Penh",
                },
                {
                  name: "Michael Chen",
                  role: "Lead Developer",
                  image:
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  bio: "Full-stack developer with expertise in building interactive data visualization tools.",
                },
                {
                  name: "Emily Rodriguez",
                  role: "UX/UI Designer",
                  image:
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
                  bio: "Creates intuitive user experiences that make complex data accessible to everyone.",
                },
                {
                  name: "Chao VanThoung",
                  role: "Data Scientist & Founder",
                  image:
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
                  bio: "I'm currently a student at the Institution of Science and Technology Advanced Development and the Royal University of Phnom Penh",
                },
                {
                  name: "Michael Chen",
                  role: "Lead Developer",
                  image:
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  bio: "Full-stack developer with expertise in building interactive data visualization tools.",
                },
                {
                  name: "Emily Rodriguez",
                  role: "UX/UI Designer",
                  image:
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
                  bio: "Creates intuitive user experiences that make complex data accessible to everyone.",
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                  className="group"
                >
                  <motion.div
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                    whileHover={{
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div className="relative overflow-hidden h-80">
                      <motion.img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover object-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 text-white">
                          <p>{member.bio}</p>
                          <div className="flex gap-4 mt-4">
                            <motion.button
                              className="p-2 bg-white/20 rounded-full"
                              whileHover={{
                                backgroundColor: "rgba(255, 255, 255, 0.4)",
                              }}
                            >
                              <FaLinkedin className="h-5 w-5" />
                            </motion.button>
                            <motion.button
                              className="p-2 bg-white/20 rounded-full"
                              whileHover={{
                                backgroundColor: "rgba(255, 255, 255, 0.4)",
                              }}
                            >
                              <FaTwitter className="h-5 w-5" />
                            </motion.button>
                            <motion.button
                              className="p-2 bg-white/20 rounded-full"
                              whileHover={{
                                backgroundColor: "rgba(255, 255, 255, 0.4)",
                              }}
                            >
                              <FaGithub className="h-5 w-5" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-blue-800">
                        {member.name}
                      </h3>
                      <p className="text-red-600 font-medium">{member.role}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
