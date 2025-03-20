import React from "react";
import styled from "styled-components";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

const storedData = localStorage.getItem("userData");
const userDataInitial = storedData ? JSON.parse(storedData) : {};
const hasAccessToken = !!localStorage.getItem("accessToken"); // Check if logged in

const GetStartedButton = () => {
  const navigate = useNavigate(); // ✅ Move inside the component

  const handleGetStartedClick = () => {
    const hasAccessToken = !!localStorage.getItem("accessToken");

    if (hasAccessToken) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <StyledWrapper className="">
      <button className="animated-button" onClick={handleGetStartedClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="arr-2"
          viewBox="0 0 24 24"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
        <span className="text">Get Started</span>{" "}
        {/* Replaced <a> with <span> */}
        <span className="circle" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="arr-1"
          viewBox="0 0 24 24"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .animated-button {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 30px;
    border: 4px solid;
    border-color: transparent;
    font-size: 16px;
    background-color: inherit;
    border-radius: 100px;
    font-weight: 600;
    color: rgb(85, 141, 0);
    box-shadow: 0 0 0 2px rgb(85, 141, 0);
    cursor: pointer;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  a {
    text-decoration: none;
    color: rgb(85, 141, 0);
  }
  a:hover {
    color: #212121;
  }
  .animated-button svg {
    position: absolute;
    width: 24px;
    fill: rgb(85, 141, 0);
    z-index: 9;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button .arr-1 {
    right: 16px;
  }

  .animated-button .arr-2 {
    left: -25%;
  }

  .animated-button .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: greenyellow;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button .text {
    position: relative;
    z-index: 1;
    transform: translateX(-12px);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button:hover {
    box-shadow: 0 0 0 12px transparent;
    color: #212121;
    border-radius: 12px;
  }

  .animated-button:hover .arr-1 {
    right: -25%;
  }

  .animated-button:hover .arr-2 {
    left: 16px;
  }

  .animated-button:hover .text {
    transform: translateX(12px);
  }

  .animated-button:hover svg {
    fill: #212121;
  }

  .animated-button:active {
    scale: 0.95;
    box-shadow: 0 0 0 4px greenyellow;
  }

  .animated-button:hover .circle {
    width: 220px;
    height: 220px;
    opacity: 1;
  }
`;

export default GetStartedButton;
