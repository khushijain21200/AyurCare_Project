import { Link } from "react-router-dom";
import { useState,useContext } from 'react';
import axios from "axios";
import { AppContext } from "./Databasemodel/AppContext";
import { useNavigate } from "react-router-dom";

import { User, Lock, Eye, EyeOff } from "lucide-react";
import bg from "../assets/bg.jpg";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setUserData} = useContext(AppContext);
  
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex-grow bg-cover bg-center bg-no-repeat animate-dashFadeIn" 
    style={{ backgroundImage: `url(${bg})` }}>
        <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-lg md:p-12 max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-4xl font-extrabold text-white drop-shadow-2xl text-center">
              <span className="text-[#2c4a69]">Ayur</span>
              <span className="text-[rgb(74,114,155)]">Care</span>
            </div>

            <div className="mt-2 text-center text-[#3d5a74] mb-3 text-[#172c41]">Welcome Back!</div>
            <div className="text-slate-400 text-center mb-6">Enter your credentials to login</div>

            <div className="relative mb-4">
              <User className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  value={email}
                  placeholder="Username"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded focus:outline-none"
                />
            </div>
            <div className="relative mb-4">
                  <Lock className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded focus:outline-none"
                  />
                  <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>

              <button
                onClick={async () => {
                  try {
                    const response = await axios.post('http://localhost:3002/signin', {
                      username: email,
                      password: password
                    });
                    const token = response.data.token;
                    localStorage.setItem("Token", token);
                    console.log(`Signin successful token: ${token}`);
                    setUserData(email)
                    navigate("/predict",);
                  } catch (error) {
                    alert("User not Found/Wrond Credentials")
                    console.log("Error in signin", error);
                  }
                }}
                className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600 transition"
              >
                Signin
              </button>
                  <div className="flex items-center mt-6 mb-4">
                    <input
                      type="checkbox"
                      className="mr-2"
                    />
                    <span className="text-sm text-slate-400">Keep me signed in</span>
                  </div>

                  <div className="flex justify-center">
                    <Link to="/signup" className="text-blue-500 hover:underline text-sm">
                      New here? Signup
                    </Link>
                  </div>
            </div>
        </div>
  
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
    </div>
  );
}
