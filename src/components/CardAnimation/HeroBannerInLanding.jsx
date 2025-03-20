import React from "react";
import styled from "styled-components";
import stackedChart from "../../img/landingPage/img1.jpg";
import scatterPlot from "../../img/landingPage/img2.jpg";
import radarChart from "../../img/landingPage/img3.jpg";
import lineChart from "../../img/landingPage/img4.jpg";
import histogramChart from "../../img/landingPage/img5.jpg";
import gaugesChart from "../../img/landingPage/img6.jpg";
import columnChart from "../../img/landingPage/img7.jpg";
import bubbleChart from "../../img/landingPage/img8.jpg";
import barChart from "../../img/landingPage/img9.jpg";
import areaChart from "../../img/landingPage/img10.jpg";

const imgs = [
  stackedChart,
  scatterPlot,
  radarChart,
  lineChart,
  histogramChart,
  gaugesChart,
  columnChart,
  bubbleChart,
  barChart,
  areaChart,
];

const HeroBannerInLanding = () => {
  return (
    <StyledWrapper className="h-screen flex flex-col-reverse sm:flex-row items-center justify-between w-full overflow-hidden max-w-screen-xl mx-auto px-4 gap-6">
      {/* Text Section */}
      <div className="text-section max-w-lg ​​text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
          Unlock Your Data Potential With
          <span className="text-[#22B04B]"> Reandata</span>
        </h2>
        <p className="text-gray-500 leading-relaxed md:text-lg lg:text-xl my-4">
          Access free, beginner-friendly resources to learn data analysis,
          visualization, and more. Start your journey today and build a solid
          foundation for your data career.
        </p>
        <a
          href="#"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white rounded-[20px] bg-[#22B04B] opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Get started
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>

      {/* Card 3D Section */}
      <div className="card-3d max-w-sm mt-6 sm:mt-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {imgs.map((image, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${image})`,
              width: "100%",
              maxWidth: "120px", // Limit size to prevent overflow
              height: "auto",
              aspectRatio: "16/9",
              backgroundSize: "cover",
            }}
          ></div>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  overflow-x: hidden; // Prevent horizontal scroll

  @keyframes autoRun3d {
    from {
      transform: perspective(800px) rotateY(0deg);
    }
    to {
      transform: perspective(800px) rotateY(360deg);
    }
  }

  .card-3d {
    width: 100%;
    max-width: 300px;
    transform-style: preserve-3d;
    transform: perspective(800px);
    animation: autoRun3d 30s linear infinite;
  }

  .card-3d div {
    position: absolute;
    width: 120px;
    height: 80px;
    background-size: cover;
    background-position: center;
    border: solid 2px lightgray;
    border-radius: 0.5rem;
    top: 50%;
    left: 50%;
    transform-origin: center;
  }

  /* Reduce translateZ to avoid overflow */
  .card-3d div:nth-child(1) {
    transform: translate(-50%, -50%) rotateY(0deg) translateZ(150px);
  }
  .card-3d div:nth-child(2) {
    transform: translate(-50%, -50%) rotateY(36deg) translateZ(150px);
  }
  .card-3d div:nth-child(3) {
    transform: translate(-50%, -50%) rotateY(72deg) translateZ(150px);
  }
  .card-3d div:nth-child(4) {
    transform: translate(-50%, -50%) rotateY(108deg) translateZ(150px);
  }
  .card-3d div:nth-child(5) {
    transform: translate(-50%, -50%) rotateY(144deg) translateZ(150px);
  }
  .card-3d div:nth-child(6) {
    transform: translate(-50%, -50%) rotateY(180deg) translateZ(150px);
  }
  .card-3d div:nth-child(7) {
    transform: translate(-50%, -50%) rotateY(216deg) translateZ(150px);
  }
  .card-3d div:nth-child(8) {
    transform: translate(-50%, -50%) rotateY(252deg) translateZ(150px);
  }
  .card-3d div:nth-child(9) {
    transform: translate(-50%, -50%) rotateY(288deg) translateZ(150px);
  }
  .card-3d div:nth-child(10) {
    transform: translate(-50%, -50%) rotateY(324deg) translateZ(150px);
  }
`;

export default HeroBannerInLanding;
