import { BrowserRouter, Route, Routes, useLocation, Link ,useNavigate} from "react-router-dom";
import { useState,useContext } from "react";
import { Predict } from "./components/Predict";
import { Dash } from "./components/Dash";
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { History } from "./components/History";
import { Pres } from "./components/Pres";
import { Menu, X, Home, Activity, MessageCircle, Bell, LogIn, Watch } from "lucide-react";
import Chat from "./components/Chat";
import { AppProvider } from "./components/Databasemodel/AppContext";
import { AppContext } from "./components/Databasemodel/AppContext";
import { Front } from "./components/Front";
import {About} from "./components/About"
import Career from "./components/Career";
import Alert from "./components/Alert";


import { Doc } from "./components/Doc";

import weblogo from './weblogo2.png';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate=useNavigate();
  const token = localStorage.getItem("Token")
  const {userData} = useContext(AppContext)

  
  const isActive = (path) =>
    location.pathname === path ? "text-blue-600" : "text-gray-800";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md shadow-md">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center ml-10 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={weblogo} alt="Logo"
              className="h-10 w-10 rounded-full object-contain mr-2"
            />
            <span className="text-xl font-bold text-blue-900">AyurCare</span>
          </Link>

          {/* Desktop Nav */}
          <nav className=" absolute left-[450px] hidden md:flex space-x-6 ml-10 items-center gap-10">
            <button onClick={()=>{
            if(!token)
              {
                alert("Login First")
              }
              else{
                navigate("/dash")
              }
                      }} className={`flex items-center gap-1 ${isActive("/dash")} `}>
              <Home size={20} /> Home
            </button>
           <button
            onClick={() => {
              if(!token)
              {
                alert("Login First")
              }
              else{
                navigate("/predict")
              }
              }}
            className={`flex items-center gap-1 ${isActive("/predict")} bg-transparent`}
          >
            <Activity size={20} /> Live Patient Data
          </button>

            <button onClick={()=>{
            if(!token)
              {
                alert("Login First")
              }
              else{
                navigate("/history")
              }
                      }} className={`flex items-center gap-1 ${isActive("/history")}`}>
                        <Watch size={20} /> History
                      </button>
                      <button onClick={()=>{
                          if(!token)
              {
                alert("Login First")
              }
              else
              {
                        navigate("/chat", { state: { username: userData } })
              }
            }} className={`flex items-center gap-1 ${isActive("/chat")}`}>
              <MessageCircle size={20} /> Chat
            </button>
          
            
              <button  onClick={()=>{
                localStorage.clear()
                navigate("/")
                alert("Logout Successfull")
              }}className="border relative border-blue-800 text-blue-800 px-4 py-2 rounded hover:bg-blue-800 hover:text-white transition left-[100px]">
                <LogIn size={20} className="inline-block mr-1" />
                LOGOUT
              </button>
           
          </nav>

  
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

    
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow">
          <Link to="/dash" className="block py-2" onClick={() => setIsMenuOpen(false)}>
            <Home className="inline mr-2" /> Home
          </Link>
         {token && (
  <Link to="/predict" className={`flex items-center gap-1 ${isActive("/predict")}`}>
    <Activity size={20} /> Live Patient Data
  </Link>
)}
{token && (
  <Link to="/devices" className={`flex items-center gap-1 ${isActive("/devices")}`}>
    <Watch size={20} /> IoT Devices
  </Link>
)}
{token && (
  <Link to="/messages" className={`flex items-center gap-1 ${isActive("/messages")}`}>
    <MessageCircle size={20} /> Chat
  </Link>
)}

          <Link to="/alerts" className="block py-2" onClick={() => setIsMenuOpen(false)}>
            <Bell className="inline mr-2" /> Alerts
          </Link>
          <Link to="/login" className="block py-2" onClick={() => setIsMenuOpen(false)}>
            <button className="w-full border border-blue-800 text-blue-800 py-2 rounded hover:bg-blue-800 hover:text-white transition">
              <LogIn className="inline mr-1" /> LOGIN
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default function App() {

  
  return (
    <AppProvider>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/dash" element={<Dash />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/history" element={<History />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/pres" element={<Pres/>}/>
        <Route path="/doc" element={<Doc/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/career" element={<Career/>}/>
        <Route path="/" element={<Front/>}/>
      </Routes>
    </BrowserRouter>
    </AppProvider>
  );
}
