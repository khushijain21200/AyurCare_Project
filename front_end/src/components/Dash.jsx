import { Link, useNavigate } from "react-router-dom";
import {
  Wifi,
  Cloud,
  Shield,
  Signal,
  MessageCircle,
  Twitter,
  Github,
  Linkedin,Smartphone,Watch,Home,Server,LogIn,BarChart,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

import Footer from "./Footer";

import bg from "../assets/bg.jpg";
import { useEffect } from "react";

export function Dash() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (

    <div className="flex flex-col min-h-screen">

      {/* Main Content */}
      <main
        className="flex-grow bg-cover bg-center bg-no-repeat animate-dashFadeIn"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Title */}
        <div
          className="text-5xl font-extrabold text-white drop-shadow-2xl text-center mt-8"
        >
          <span className="text-[#2c4a69]">Ayur</span>
          <span className="text-[rgb(74,114,155)]">Care</span>
        </div>

        <div className="container mx-auto px-4 mt-6">
           <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-lg p-8 md:p-12 max-w-5xl mx-auto">
              <h2 className="text-[rgb(74,114,155)] text-center font-bold text-2xl italic">
                Welcome to the Smart Healthcare System
              </h2>
                <h3 className="text-[rgb(72,101,130)] text-center font-bold text-md italic mt-4">
                We Empower Health with IoT, Cloud & Ayurveda
              </h3>
              <p className="text-[rgb(65,104,142)] text-center mt-6">
                Experience the future of remote healthcare with our secure and intelligent monitoring system. Our end-to-end encrypted IoT platform enables real-time patient monitoring, AI-driven analytics, and instant alerts — all designed to enhance healthcare delivery.
                Explore your well-being further with the wisdom of Ayurveda, blending ancient knowledge with modern technology to offer personalized disease prediction and holistic cures.
              </p>
                {/* Buttons */}
              <div className="flex justify-center gap-6 mt-6">
                <Link to="/SignUp">
                  <button className="w-48 p-2 bg-green-500 text-white rounded hover:bg-green-600">
                    SignUp
                  </button>
                </Link>
                <button
                  onClick={() => {
                    const token = localStorage.getItem("Token");
                    if (!token) {
                      navigate("/Signin");
                    } else {
                      alert("Logout First");
                    }
                  }}
                  className="w-48 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  SignIn
                </button>
              </div>
              <div className="text-center mt-8 text-sm text-slate-400">
                <p>
                  Providing solutions rooted in the ancient wisdom of Ayurveda.
                </p>
              </div>
           </div>
        </div>
                  
        <div className="container mx-auto px-4 mt-6">
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2c4a69]">Key System Features</h2>
              <p className="text-lg text-[#2c4a69] max-w-3xl mx-auto">
                Our cloud-based IoT platform offers comprehensive solutions for remote healthcare monitoring with unparalleled security.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-[#fcfafa]">
                <CardHeader className="pb-2">
                  <div className="flex flex-row items-center space-x-3">
                    <Wifi className="h-8 w-8 text-[#2c4a69]" />
                    <CardTitle className="text-[#2c4a69] text-justify">
                      IoT Device Integration
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#2c4a69] text-lg text-justify">
                    Seamlessly connect with medical IoT devices to monitor vital signs like heart rate, glucose level, temperature, and more.
                  </p>
                </CardContent>
            </Card>

            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-[#fcfafa]">
              <CardHeader className="pb-2">
                <div className="flex flex-row items-center space-x-3">
                  <Shield className="h-8 w-8 text-[#2c4a69]" />
                  <CardTitle  className="text-[#2c4a69] text-justify">End-to-End Encryption</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#2c4a69] text-lg text-justify">
                  All health data is encrypted using AES-256, TLS/SSL protocols, and OAuth-based authentication for maximum security.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-[#fcfafa]">
              <CardHeader className="pb-2">
                <div className="flex flex-row items-center space-x-3">
                  <Server className="h-8 w-8 text-[#2c4a69]" />
                  <CardTitle  className="text-[#2c4a69] text-justify">Cloud-based Storage</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#2c4a69] text-lg text-justify">
                  Securely store medical data in the cloud with AWS IoT Core, Azure IoT Hub, or Firebase for reliable access.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-[#fcfafa]">
              <CardHeader className="pb-2">
                <div className="flex flex-row items-center space-x-3">
                  <BarChart className="h-8 w-8 text-[#2c4a69]" />
                  <CardTitle  className="text-[#2c4a69] text-justify">AI-Driven Analytics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#2c4a69] text-lg text-justify">
                  Advanced anomaly detection algorithms alert healthcare providers when patient vitals fall outside normal ranges.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-[#fcfafa]">
              <CardHeader className="pb-2">
                <div className="flex flex-row items-center space-x-3">
                  <MessageCircle className="h-8 w-8 text-[#2c4a69]" />
                  <CardTitle  className="text-[#2c4a69] text-justify">Secure Communications</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#2c4a69]  text-lg text-justify">
                  Encrypted chat and video call functionality allows for compliant communication between patients and doctor.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-[#fcfafa]">
              <CardHeader className=" pb-2">
                <div className="flex flex-row items-center space-x-3">
                  <Smartphone className="h-8 w-8 text-[#2c4a69]" />
                  <CardTitle  className="text-[#2c4a69]  text-justify">Cross-Platform Dashboard</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#2c4a69] text-lg text-justify">
                  Access vital health information from any device with responsive web and mobile interfaces for doctors and patients.
                </p>
              </CardContent>
            </Card>
            </div>
        </div>
      
      <div className="container mx-auto px-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-9 text-[#2c4a69] ">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6 ">
              <div className="bg-white p-4 rounded-xl shadow-xl text-center">
                <h4 className="font-semibold mb-2 text-[#2c4a69]">1. Connect IoT Devices</h4>
                <p className="text-[#2c4a69] text-sm">Install medical-grade sensors on patients to collect data.</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-xl text-center">
                <h4 className="font-semibold mb-2 text-[#2c4a69]">2. Data Transmission</h4>
                <p className="text-[#2c4a69] text-sm">Sensor data is transmitted securely to the cloud in real time.</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-xl text-center">
                <h4 className="font-semibold mb-2 text-[#2c4a69]">3. AI Analysis</h4>
                <p className="text-[#2c4a69] text-sm">AI models analyze the data and flag anomalies or critical conditions.</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-xl text-center">
                <h4 className="font-semibold mb-2 text-[#2c4a69]">4. Alert & Response</h4>
                <p className="text-[#2c4a69] text-sm">Doctors and caregivers are notified instantly for immediate action.</p>
              </div>
            </div>
          </div>

        {/* CTA Section */}
        <section className="py-16 bg-medical-primary/10 backdrop-blur-sm text-[#2c4a69] mt-5 rounded-xl">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#2c4a69]">Join the Future of Healthcare</h2>
            <p className="text-[#2c4a69] mb-6">Start leveraging our secure IoT-based system for better patient care.</p>
            <Link to="/Signup">
              <button className="bg-[#2c4a69] text-white px-8 py-3 rounded-full text-lg hover:bg-medical-dark transition">
                Get Started
              </button>
              </Link>
          </div>
        </section>


      {/* Footer - No Background */}
         <div className=" p-6 overflow-x-hidden">
                  <Footer />
         </div>

      {/* Fade-in Animation */}
      <style>
        {`
          @keyframes dashFadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-dashFadeIn {
            animation: dashFadeIn 1.5s ease-out forwards;
          }
        `}
      </style>
    
      </main>
    </div>
  );
}
