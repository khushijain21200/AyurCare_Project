const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const bcrypt = require('bcrypt'); 
const secretKey = "jbhvyui";
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const port = 3002;
const cors = require('cors');
const mongoose = require('mongoose');
let senddiseases=[]
mongoose.connect("mongodb+srv://admin:Ktuktuk%404321@cluster0.xh8tk.mongodb.net/user_app");
let a=0;


const PayUsersSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    diseases:{
        type:[String],
        required:true,
        default:[]
    },
    age:{
        type:String,
        required:true,
    },
    weight:{
        type:String,
        required:true

    },
    height:{
        type:String,
        required:true
    },
    
    profileImage:{
        type:String,
        required:true,
    }
    
   
});

const ProjUsers = mongoose.model("ProjUsers", PayUsersSchema);
const DiseaseSchema = new mongoose.Schema({}, { strict: false, collection: "disease" })
const Disease=mongoose.model("Disease", DiseaseSchema);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const UsernameSchema = zod.string();
const passwordSchema = zod.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(100, { message: "Password must be at most 100 characters long" })
  .regex(/[a-z]/, { message: "Password must include at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter" })
  .regex(/[0-9]/, { message: "Password must include at least one number" })
  .regex(/[^a-zA-Z0-9]/, { message: "Password must include at least one special character" });
const emailSchema =zod.string().email()


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage });


app.post("/signin", async (req, res) => {
    const data = req.body;
    const u = UsernameSchema.safeParse(data.username);
    const p = passwordSchema.safeParse(data.password);


    if (!u.success || !p.success) {
        return res.status(400).json({ msg: "error" });
    }

    
    const user = await ProjUsers.findOne({ name: data.username });

    if (!user) {
        return res.status(404).json({ msg: "User not found, please sign up first" });
    }


    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ msg: "Invalid Password" });
    }

    const token = jwt.sign({ username :data.username }, secretKey, { expiresIn: '1h' });
    

    return res.status(200).json({ msg: "Signin successful", token: token, user: user });
});

app.post('/signup', upload.single('profileImage'), async (req, res) => {
  const data = req.body;
  const file = req.file;

  const u = UsernameSchema.safeParse(data.username);
  const p = passwordSchema.safeParse(data.password);
  const m = emailSchema.safeParse(data.email);

  if (!u.success || !p.success) {
    return res.status(400).json({ msg: "Username or password error" });
  }

  if (!m.success) {
    return res.status(400).json({ msg: "Invalid email" });
  }

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = new ProjUsers({
      name: data.username,
      password: hashedPassword,
      phone: data.phone,
      email: data.email,
      age: data.age,
      weight: data.weight,
      height: data.height,
      profileImage: file ? `/uploads/${file.filename}` : null // ✅ Save image path
    });

    await newUser.save();
    console.log('User created successfully:', newUser);
    a++;

    return res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
});

app.post("/history", async (req, res) => {
    const senddiseases = [];
    const diseases = ['Diabetes ', 'GERD', 'Tuberculosis', 'Bronchial Asthma', 'Dimorphic hemmorhoids(piles)', 
        'Common Cold', 'Peptic ulcer diseae', 'Hypertension ', 'Jaundice', 'Impetigo', 'Hepatitis C', 'hepatitis A', 
        'Hepatitis D', 'AIDS', 'Acne', 'Fungal infection', 'Gastroenteritis', 'Migraine', 'Cervical spondylosis', 
        'Paralysis (brain hemorrhage)', 'Osteoarthristis', 'Dengue', 'Hepatitis B', 'Varicose veins', 'Hyperthyroidism', 
        'Hypoglycemia', '(vertigo) Paroymsal  Positional Vertigo', 'Typhoid', 'Chicken pox', 'Heart attack', 'Alcoholic hepatitis', 
        'Psoriasis', 'Urinary tract infection', 'Arthritis', 'Hypothyroidism', 'Malaria', 'Allergy', 'Pneumonia', 'Chronic cholestasis',
        'Drug Reaction', 'Hepatitis E'
    ];

    const token = req.body.Token;

    if (!token) {
        return res.status(400).json({ msg: "Token is missing" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await ProjUsers.findOne({ name: decoded.username });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const hashDiseases = user.diseases;

        for (let j = 0; j < hashDiseases.length; j++) {
            for (let i = 0; i < diseases.length; i++) {
                const match = await bcrypt.compare(diseases[i], hashDiseases[j]);
                if (match) {
                    senddiseases.push(diseases[i]);
                    break; // Optional: stop checking this hash once matched
                }
            }
        }

        return res.send({ history: senddiseases, User: user });
    } catch (error) {
        console.error(error);
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
});


app.post("/predict",async(req,res)=>{



    
    try{
       
        token = req.body.Token

        const decoded = jwt.verify(token,secretKey);

        const user= await ProjUsers.findOne({name:decoded.username})

        if(!user)
        {
           return res.status(404).json({msg:"User not found"})
        }

        res.send({
            User:user
        })

   
    }

    catch (error){

        console.error("Error updating user:", error);
    }

    

})

app.post("/disease",async (req,res)=>{

    try{
    const data= req.body
    const disease=data.disease
    const probability=data.probability
    const user=data.username
    const tok = data.token


    try{
    const decyp= jwt.verify(tok,secretKey)
    }
    catch(error)
    {
        return console.log("Eroor",error)
    }

    hashDisease=await bcrypt.hash(data.disease,10)

    const result =await ProjUsers.updateOne({name:user},{$push:{diseases:hashDisease}})
    console.log(result)
    res.status(200).send({msg:"Disease Updated successfully"})
    }
    catch(error)
    {
     res.status(500).send({msg:"Error is saving"})
    }
})

app.post("/diseased", async (req, res) => {
  const name = req.body.dis?.trim(); // Trim whitespace
  if (!name) return res.status(400).json({ error: "Disease name is required" });

  try {
    const disease = await Disease.findOne({
      modern_name: { $regex: new RegExp("^" + name + "$", "i") }, // case-insensitive match
    });

    if (!disease) return res.status(404).json({ error: "Disease not found" });

    res.json(disease);
  } catch (error) {
    console.error("Error fetching disease:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/docauth", (req, res) => {
  const doctors = ["Dr. Smith", "Dr. Jones", "Dr. Brown"];
  const password = {
    "Dr. Smith": "1234",
    "Dr. Jones": "5678",
    "Dr. Brown": "9012"
  };

  const data = req.body;
  
  if (doctors.includes(data.username) && password[data.username] === data.password) {
    res.status(200).json({ msg: "Login successful" });
  } else {
    res.status(404).json({ msg: "User not Found" });
  }
});



app.listen(port, () => {
    console.log("Connection successful ");
});


app.get("/", (req, res) => {
  res.send("Server is up and running!");
});
