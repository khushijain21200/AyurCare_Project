import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { User, Lock, Phone, Mail, Eye, EyeOff,Weight,Ruler , Keyboard} from 'lucide-react';
import bg from "../assets/bg.jpg";


export function Signup() {
  const navigate = useNavigate();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null); // File
  const [previewUrl, setPreviewUrl] = useState(null);     // Preview URL
  const [age,setAge]= useState("");
  const [weight,setWeight]= useState("");
  const [height,setHeight]= useState("") ;
  const [passwordStrength, setPasswordStrength] = useState("");



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create preview
    }
  };

  const checkPasswordStrength = (pass) => {
    let strength = "Weak Password";
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*\\d))|((?=.*[A-Z])(?=.*\\d)))(?=.{6,})");

    if (strongRegex.test(pass)) {
      strength = "Strong Password";
    } else if (mediumRegex.test(pass)) {
      strength = "Moderate Password";
    }

    setPasswordStrength(strength);
  };

  const handleSubmit = async () => {
    if (!isChecked) return;
    
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("username", `${first} ${last}`);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("age",age);
    formData.append("weight",weight);
    formData.append("height",height);
    if (profileImage) formData.append("profileImage", profileImage);

    try {
      const response = await axios.post(
        'https://ayurcare-project.onrender.com/signup',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert("Signup Successful");
      navigate("/signin");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || `Signup failed: ${error.response.status}`);
      } else {
        alert("Network or server error");
        console.error(error);
      }
    }
  };

  return (
    

    <div className="flex-grow bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg})` }}>
        <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-lg md:p-12 max-w-5xl mx-auto">
        <div className="text-4xl font-extrabold text-white drop-shadow-2xl text-center">
          <span className="text-[#2c4a69]">Ayur</span>
          <span className="text-[rgb(74,114,155)]">Care</span>
        </div>

        <p className="mt-2 text-center text-[#3d5a74] mb-6">Welcome to Secure Healthcare Monitoring System</p>
        
        <div className="flex gap-6 m-7">
          <div className="input-group w-1/3">

                <div className="relative group w-40 h-40 rounded-full overflow-hidden shadow-md border-2 border-gray-300">
                                   
                  <label htmlFor="profileImageInput" className="w-full h-full block cursor-pointer">
                    <img
                      src={
                        previewUrl ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Update Profile
                    </div>
                  </label>

                   <input
                      type="file"
                      id="profileImageInput"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                </div>
              <label className=" mt-4 block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <i className="fa fa-image" aria-hidden="true"></i> Upload Profile Image
              </label>
          </div>


          <div className="w-2/3">
            <InputField icon={<User size={18} />} value={first} onChange={setFirst} placeholder="First Name" />
            <InputField icon={<User size={18} />} value={last} onChange={setLast} placeholder="Last Name" />
            <InputField icon={<Phone size={18} />} value={phone} onChange={setPhone} placeholder="Phone Number" />
            <InputField icon={<Mail size={18} />} value={email} onChange={setEmail} placeholder="Email" />
            <InputField icon={<Keyboard size={18} />} value={age} onChange={setAge} placeholder="Age (in years)" />
            <InputField icon={<Ruler size={18} />} value={height} onChange={setHeight} placeholder="Height (in cm)" />
            <InputField icon={<Weight size={18} />} value={weight} onChange={setWeight} placeholder="Weight (in kg)" />

             <div className="mb-2">
                <div className="flex items-center border border-gray-300 rounded px-3">
                  <Lock className="text-gray-500 mr-2" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      checkPasswordStrength(e.target.value);
                    }}
                    className="w-full p-2 focus:outline-none"
                  />
                  <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="text-gray-500">
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                <p className={`mt-1 text-sm ${passwordStrength === "Strong Password" ? "text-green-600" : passwordStrength === "Moderate Password" ? "text-yellow-600" : "text-red-600"}`}>
                  {password && passwordStrength}
                </p>
             </div>

             <div className="mb-2">
                <div className="flex items-center border border-gray-300 rounded px-3">
                  <Lock className="text-gray-500 mr-2" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 focus:outline-none"
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-500"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  
                </div>
                {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
              )}
             </div>
          </div>
        </div>

         <div className="flex items-center mb-6 text-sm">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2"
          />
          I hereby declare that I am 18 years old
        </div>

         <button
          onClick={handleSubmit}
          className={`w-full p-2 rounded text-white bg-blue-600 hover:bg-blue-700 transition ${
            !isChecked ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!(isChecked)}
        >
          Signup
        </button>
        </div>
    </div>
  );
}


function InputField({ icon, value, onChange, placeholder }) {
  return (
    <div className="flex items-center mb-4 border border-gray-300 rounded px-3">
      <span className="text-gray-500 mr-2">{icon}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 focus:outline-none"
      />
    </div>
  );
}
