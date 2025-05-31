import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Twitter, Github, Linkedin } from "lucide-react";

export function History() {
  const [user, setUser] = useState({});
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");

    async function find() {
      try {
        const response = await axios.post("http://localhost:3002/history", {
          Token: token,
        });
        setUser(response.data.User);
        setSearch(response.data.history);
      } catch (error) {
        console.log(`Something happened: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    find();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-pink-100 p-6 overflow-x-hidden">
      <div className="bg-white w-[100vw] relative right-5 bg-gradient-to-br from-blue-200 to-pink-100 p-6 animate-dashFadeIn">
        <div className="w-4/5 mx-auto bg-white p-6 rounded-2xl shadow-xl relative">
          <h1 className="text-5xl text-[#2c4a69] font-extrabold text-center mb-4 animate-pulse">
            History
          </h1>

            <div className="flex items-center gap-6 mb-6 ml-7">
            <img
              src={`http://localhost:3002${user.profileImage}` }
              alt="Profile"
              className="w-24 h-24 p-2 border-2 shadow-md object-cover rounded-full"
            />
            <div>
              <h1 className="text-2xl font-semibold uppercase text-[#152f48] ">{user.name}</h1>
              <p className="text-[#2c4a69] ">Age: {user.age || 'N/A'}</p>
              <p className="text-[#2c4a69] ">Weight: {user.weight || 'N/A'} kg</p>
              <p className="text-[#2c4a69] ">Height: {user.height || 'N/A'} cm</p>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            {loading ? (
              <div className="text-center text-blue-700 text-lg font-medium animate-pulse">
                Loading your history...
              </div>
            ) : search.length === 0 ? (
              <div className="text-center text-slate-500 text-lg">No history found.</div>
            ) : (
              search.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-blue-50 shadow-md p-4 rounded-lg border border-blue-200"
                >
                  <div className="text-lg font-medium text-blue-800">
                    {item.replaceAll("_", " ")}
                  </div>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    onClick={() => {
                      navigate("/pres", {
                        state: { username: user, disease: item },
                      });
                    }}
                  >
                    Cure
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-[340px] w-[100vw] bg-white relative right-5 mt-10">
        <div className="h-1/3 w-[400px] mx-auto text-slate-700 pt-10 text-center">
          <div className="font-bold text-xl p-2">VitalGuard</div>
          <span className="text-md">
            Secure and efficient cloud-based IoT system for remote healthcare monitoring with end-to-end encryption.
          </span>
        </div>

        <div className="h-[2px] w-full bg-slate-200 mt-10"></div>

        <div className="flex justify-center mt-10 gap-6">
          <div className="bg-slate-600 hover:bg-blue-500 text-white p-3 rounded-full transition-colors cursor-pointer">
            <Twitter size={20} />
          </div>
          <div className="bg-slate-600 hover:bg-blue-500 text-white p-3 rounded-full transition-colors cursor-pointer">
            <Github size={20} />
          </div>
          <div className="bg-slate-600 hover:bg-blue-500 text-white p-3 rounded-full transition-colors cursor-pointer">
            <Linkedin size={20} />
          </div>
        </div>
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
    </div>
  );
}
