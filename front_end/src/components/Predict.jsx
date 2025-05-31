import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Twitter, Github, Linkedin } from "lucide-react";
import axios from "axios";
import Select from "react-select";

import Footer from "./Footer";
import { HeartPulse, ThermometerSun, Droplets, ActivitySquare } from "lucide-react";
import bg from "../assets/bg.jpg";

const symptomsList = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering',
  'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting',
  'vomiting', 'burning_micturition', 'spotting_urination', 'fatigue', 'weight_gain',
  'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness',
  'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever',
  'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache',
  'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes',
  'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine',
  'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach',
  'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm',
  'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion',
  'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements',
  'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness',
  'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels',
  'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties',
  'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech',
  'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints',
  'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness',
  'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of_urine',
  'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
  'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body',
  'belly_pain', 'abnormal_menstruation', 'dischromic_patches', 'watering_from_eyes',
  'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum',
  'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion',
  'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen',
  'history_of_alcohol_consumption', 'blood_in_sputum', 'prominent_veins_on_calf',
  'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring',
  'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails',
  'blister', 'red_sore_around_nose', 'yellow_crust_ooze'];
const symptomOptions = symptomsList.map(symptom => ({
  value: symptom,
  label: symptom.replaceAll("_", " "),
}));

function getSymptomsFromVitals(ox, hr, systolic, diastolic) {
  const symptoms = [];

  if (ox <= 94 && ox >= 91) symptoms.push("breathlessness");
  if (ox <= 90) symptoms.push("dizziness", "fatigue", "chest_pain");

  if (hr < 60) symptoms.push("fatigue", "dizziness");
  if (hr > 100) symptoms.push("fast_heart_rate", "palpitations");

  if (systolic > 130 || diastolic > 80) symptoms.push("headache", "chest_pain");
  if (systolic < 90 || diastolic < 60) symptoms.push("dizziness", "blurred_and_distorted_vision");

  return symptoms;
}

export function Predict() {
  const [user, setUser] = useState({});
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [systolicBP, setSystolicBP] = useState("");
  const [diastolicBP, setDiastolicBP] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");

    async function find() {
      try {
        const res = await axios.post("http://localhost:3002/predict", {
          Token: token,
        });
        setUser(res.data.User);
      } catch (error) {
        console.log("Signup Error", error);
      }
    }

    find();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        symptoms: selectedSymptoms,
      });
      setPredictions(response.data.top_predictions);
    } catch (error) {
      console.error("Prediction failed:", error);
      alert("Prediction request failed");
    }
    setLoading(false);
  };

  const removeSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  const handleVitalsSubmit = () => {
    const ox = Number(oxygen);
    const hr = Number(heartRate);
    const sys = Number(systolicBP);
    const dia = Number(diastolicBP);

    const vitalSymptoms = getSymptomsFromVitals(ox, hr, sys, dia);
    const newSymptoms = [...new Set([...selectedSymptoms, ...vitalSymptoms])];

    setSelectedSymptoms(newSymptoms);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-pink-100 p-6 overflow-x-hidden animate-dashFadeIn">

      <div className="bg-white w-[100vw] relative right-5 bg-gradient-to-br from-blue-200 to-pink-100 p-6">
        <div className="w-4/5 mx-auto bg-white p-6 rounded-2xl shadow-xl relative">
          <h1 className="text-5xl text-[#2c4a69] font-extrabold text-center mb-4 animate-pulse">Vital Signs</h1>

      
          <div className="flex items-center gap-6 mb-6 ml-7 ">
            <img
              src={`http://localhost:3002${user.profileImage}` }
              alt="Profile"
              className="w-24 h-24 p-2 border-2 shadow-lg object-cover rounded-full"
            />
            <div>
              <h1 className="text-2xl font-semibold uppercase text-[#152f48] ">{user.name}</h1>
              <p className="text-[#2c4a69] ">Age: {user.age || 'N/A'}</p>
              <p className="text-[#2c4a69] ">Weight: {user.weight || 'N/A'} kg</p>
              <p className="text-[#2c4a69] ">Height: {user.height || 'N/A'} cm</p>
            </div>
          </div>

          {/* Vitals Inputs */}
          <div className="flex gap-6 m-7">
            <div className="w-1/2">
              <label className="flex items-center gap-2 text-[#2c4a69]">
                <HeartPulse className="text-red w-5 h-5 ml-0.5" />
                Heart Rate (BPM)</label>
              <input
                className="w-full bg-slate-200 border p-2 opacity-70 rounded hover:bg-slate-200"
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                placeholder="60-100"
              />
            </div>


            <div className="w-1/2">
              <label className="flex items-center gap-2 text-[#2c4a69]">
                <Droplets className="text-#2c4a69] w-5 h-5 ml-0.5" />Oxygen Level (%)</label>
              <input
                className="w-full bg-slate-200 border p-2 opacity-70 rounded hover:bg-slate-200"
                type="number"
                value={oxygen}
                placeholder="95-100"
                onChange={(e) => setOxygen(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-6 m-7">
            <div className="w-1/2">
              <label className="flex items-center gap-2 text-[#2c4a69]">
                  <ActivitySquare className="text-red  ml-0.5 w-5 h-5" />
                  Systolic BP (mmHg)
                </label>
              <input
                className="w-full bg-slate-200 border p-2 opacity-70 rounded hover:bg-slate-200"
                type="number"
                  placeholder="90-140"
                value={systolicBP}
                onChange={(e) => setSystolicBP(e.target.value)}
              />
            </div>

            <div className="w-1/2">
              <label className="flex items-center gap-2 text-[#2c4a69]">
                  <ActivitySquare className="text-red ml-0.5 w-5 h-5" />Diastolic BP (mmHg)</label>
              <input
                className="w-full bg-slate-200 border p-2 opacity-70 rounded hover:bg-slate-200"
                type="number"
                value={diastolicBP}
                placeholder="60-90"
                onChange={(e) => setDiastolicBP(e.target.value)}
              />
            </div>
          </div>
           <div className="ml-7">
          <button
            onClick={handleVitalsSubmit}
            className="bg-[#2c4a69]  text-white px-4 py-2 mt-2 mr-8 rounded hover:bg-[#5a83ad]"
          >
            Submit Vitals
          </button>
          </div>

          <div className="ml-7">
            <label className="block text-lg text-[#2c4a69] font-medium mt-6 mb-2">Select symptoms (Advanced):</label>
          
          <Select
            options={symptomOptions}
            isMulti
            placeholder="Search and select symptoms..."
            onChange={(selected) => {
              setSelectedSymptoms(selected.map(option => option.value));
            }}
            className="mb-4 ml-7"
            value={symptomOptions.filter(option => selectedSymptoms.includes(option.value))}
          />

          </div>
          
          <div className="flex flex-wrap gap-2 mb-4 ml-7">
            {selectedSymptoms.map((symptom) => (
              <span
                key={symptom}
                className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {symptom.replaceAll("_", " ")}
                <button onClick={() => removeSymptom(symptom)} className="ml-1 font-bold">
                  &times;
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 mt-2 mr-8 rounded ml-7  hover:bg-blue-700 disabled:opacity-50"
            disabled={loading || selectedSymptoms.length === 0}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>

          {predictions.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">Top Predictions</h2>
              <div className="space-y-4">
                {predictions.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-blue-50 p-4 rounded-lg shadow-sm"
                  >
                    <div className="text-lg font-medium text-blue-800">
                      {item.disease.replaceAll("_", " ")}
                    </div>
                    <div className="text-gray-600 font-semibold">
                      {Math.round(item.probability * 100)}%
                    </div>
                    <button
                      onClick={async () => {
                        setSelect(item);
                        const token = localStorage.getItem("Token");
                        await axios.post("http://localhost:3002/disease", {
                          token: token,
                          disease: item.disease,
                          probability: item.probability * 100,
                          username: user.name,
                        });
                        navigate("/pres", { state: { username: user, disease: item.disease } });
                      }}
                      className="ml-4 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                    >
                      Cure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Footer */}
      <Footer />
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
