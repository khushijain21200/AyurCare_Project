import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

export function Pres() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = location.state?.username || {};
  const diseaseName = location.state?.disease || null;

  const [diseaseData, setDiseaseData] = useState(null);
  const pdfRef = useRef();

  useEffect(() => {
    const fetchDisease = async () => {
      if (diseaseName) {
        try {
          const response = await axios.post("http://localhost:3002/diseased", {
            dis: diseaseName,
          });
          setDiseaseData(response.data);
        } catch (error) {
          console.error("Error fetching disease data:", error);
        }
      }
    };
    fetchDisease();
  }, [diseaseName]);

  const handleDownload = () => {
    const element = pdfRef.current;
    const options = {
      margin: 0.5,
      filename: `${diseaseName}_prescription.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  if (!diseaseData) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading prescription...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-200 to-pink-100 pb-10 animate-dashFadeIn" >
      <div
        ref={pdfRef}
        className="relative top-2 max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Ayurvedic Prescription
        </h1>

  
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Patient Information
          </h2>
          <span className="font-semibold mr-5">Name: {user.name || "N/A"}</span>
          <span className="font-semibold mr-5">Age: {user.age || "N/A"}</span>
          <span className="font-semibold mr-5">Height: {user.height || "N/A"} cm</span>
          <span className="font-semibold mr-5">Weight: {user.weight || "N/A"} kg </span>
        </div>

    
        <div className="mb-4">
          <p>
            <span className="font-semibold">Modern Name:</span>{" "}
            {diseaseData.modern_name}
          </p>
          <p>
            <span className="font-semibold">Ayurvedic Name(s):</span>{" "}
            {diseaseData.ayurvedic_names.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Primary Dosha:</span>{" "}
            {diseaseData.doshic_imbalance.primary}
          </p>
          <p>
            <span className="font-semibold">Secondary Doshas:</span>{" "}
            {diseaseData.doshic_imbalance.secondary.join(", ")}
          </p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-green-700 mb-1">
            Description
          </h2>
          <p className="text-gray-700">{diseaseData.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Recommended Formulations
          </h2>
          {diseaseData.formulations.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 p-4 mb-4 rounded-lg"
            >
              <p className="font-bold text-lg text-gray-800">
                {item.name} ({item.common_name})
              </p>
              <ul className="text-sm text-gray-700 mt-2 space-y-1">
                <li>
                  <strong>Rasa (Taste):</strong>{" "}
                  {item.rasa_guna_virya_vipaka.rasa}
                </li>
                <li>
                  <strong>Guna (Qualities):</strong>{" "}
                  {item.rasa_guna_virya_vipaka.guna}
                </li>
                <li>
                  <strong>Virya (Potency):</strong>{" "}
                  {item.rasa_guna_virya_vipaka.virya}
                </li>
                <li>
                  <strong>Vipaka (Post-digestive effect):</strong>{" "}
                  {item.rasa_guna_virya_vipaka.vipaka}
                </li>
                <li>
                  <strong>Contraindications:</strong>{" "}
                  {item.contraindications.join(", ")}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="text-center mt-6 relative ">
        
       

        <button
          onClick={handleDownload}
          className="mr-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Download as PDF
        </button>

        <button
          onClick={() => navigate("/chat", { state: { username: user.name } })}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Chat With Doctor
        </button>
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
