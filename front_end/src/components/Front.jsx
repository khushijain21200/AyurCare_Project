import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import img1 from "./Doc.png";
import img2 from "./Pat.png";

const images = [img1, img2];

export function Front() {
  const [foggy, setFoggy] = useState(false);
  const [blank, setBlank] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.querySelector(".carousel-container");
    const items = document.querySelectorAll(".carousel-item");

    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        container.style.transition = "perspective 0.8s ease-in-out";
        container.style.perspective = "900px";
      });

      item.addEventListener("mouseleave", () => {
        container.style.transition = "perspective 0.8s ease-in-out";
        container.style.perspective = "2800px";
      });
    });
  }, []);

  const handleClick = (index) => {
    const g = document.getElementById("ha");
    g.style.transition = "perspective 1s ease-in-out";
    g.style.perspective = "400px";

    setFoggy(true);
    setTimeout(() => {
      setBlank(true);
      setTimeout(() => {
        setShowWelcome(true);
        // Navigate after welcome is shown
        setTimeout(() => {
          if (index === 0) navigate("/doc");      // img1 clicked
          else if (index === 1) navigate("/dash"); // img2 clicked
        }, 2000);
      }, 1000);
    }, 2000);
  };

  const quantity = images.length;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-200 to-pink-100 ">
      <div className="text-3xl mt-4 mb-0 text-[#2c4a69] font-extrabold text-center animate-pulse">Choose Your Role</div>
      {/* Main Carousel Content */}
      <div
        className="carousel-container w-full h-full flex items-center justify-center transition-all duration-1000"
        style={{ perspective: "2800px" }}
        id="ha"
      >
        <div
          className="relative w-[300px] h-[300px]"
          style={{
            transformStyle: "preserve-3d",
            animation: "spin3D 20s linear infinite",
          }}
        >
          {images.map((src, index) => {
            const angle = (360 / quantity) * index;
            return (
              <div
                onClick={() => handleClick(index)}
                key={index}
                className="carousel-item absolute top-0 left-0 w-full h-full transition-transform duration-500 cursor-pointer"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(350px)`,
                }}
              >
                <img
                  src={src}
                  alt={`carousel-${index}`}
                  className="w-full h-full object-cover rounded-[30px] hover:animate-wave3D"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Fog Overlay */}
      {foggy && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/30 backdrop-blur-md z-50 animate-fogFadeIn" />
      )}

      {/* Blank Overlay with Welcome Text */}
      {blank && (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50 animate-blankFadeIn flex items-center justify-center">
          {showWelcome && (
            <h1 className="text-4xl md:text-6xl font-bold text-center flex animate-pulse fade-in-text">
              <div>Welcome to </div>
              <div className="text-[#2c4a69] ml-4">Ayur</div>
              <div className="text-[rgb(74,114,155)]">care</div>
            </h1>
          )}
        </div>
      )}

      {/* Custom Animations */}
      <style>
        {`
          @keyframes spin3D {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }

          @keyframes wave3D {
            0% { transform: rotateX(0deg) rotateY(0deg) translateZ(0px); }
            25% { transform: rotateX(5deg) rotateY(-5deg) translateZ(10px); }
            50% { transform: rotateX(-5deg) rotateY(5deg) translateZ(-10px); }
            75% { transform: rotateX(2deg) rotateY(-2deg) translateZ(5px); }
            100% { transform: rotateX(0deg) rotateY(0deg) translateZ(0px); }
          }

          @keyframes fogFadeIn {
            from {
              opacity: 0;
              backdrop-filter: blur(0px);
            }
            to {
              opacity: 1;
              backdrop-filter: blur(8px);
            }
          }

          @keyframes blankFadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes fadeInText {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fogFadeIn {
            animation: fogFadeIn 2s ease-in-out forwards;
          }

          .animate-blankFadeIn {
            animation: blankFadeIn 1.5s ease-in-out forwards;
          }

          .fade-in-text {
            animation: fadeInText 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
