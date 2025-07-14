# 🎉 Fun Planner V2

Fun Planner V2 is a modern event planning SaaS built with React, Redux, TailwindCSS, Node.js, and Express. It helps users plan, manage, and host unforgettable events with powerful tools, templates, and real-time collaboration features.

---

## 📂 Project Structure

FunPlanner_v2/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── redux/
│ ├── layouts/
│ └── App.jsx
├── server/ # Express backend
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ └── app.js
├── .env.example
├── package.json
└── README.md





---

## 📘 Table of Contents

- [🚀 Introduction](#-introduction)  
- [💡 Why Fun Planner](#-why-fun-planner)  
- [🛠 Technologies](#-technologies)  
- [⚙️ Environment Setup](#️-environment-setup)  
- [🧪 Local Setup](#-local-setup)  
- [📜 Usage & Scripts](#-usage--scripts)  
- [🤝 Contributing](#-contributing)  
- [👤 Author](#-author)  
- [📄 License](#-license)  
- [📟 Bash Commands](#-bash-commands)  

---

## 🚀 Introduction

Planning events is stressful. Coordinating vendors, guest lists, reminders, and logistics — all spread across emails and spreadsheets — becomes overwhelming.

**Fun Planner V2** changes that.

It brings everything together in one platform with:

- Intuitive design
- Real-time collaboration
- Smart scheduling
- Vendor & guest management
- Budget tracking
- AI-powered recommendations

---

## 💡 Why Fun Planner?

Current tools are outdated or fragmented. Event planners juggle between WhatsApp, Google Sheets, Trello, Calendars, and vendor calls.

Fun Planner centralizes the process:

- ✅ Schedule, plan, and track events  
- ✅ Invite and manage guests  
- ✅ Collaborate with co-hosts in real-time  
- ✅ Use pre-made templates  
- ✅ Access mobile-friendly features  
- ✅ Track budget and tasks seamlessly  

---

## 🛠 Technologies

**Frontend**:
- React
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios
- React Toastify

**Backend**:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- CORS + dotenv

---

## ⚙️ Environment Setup

1. Duplicate `.env.example` and rename it `.env` in both `/client` and `/server`.
2. Fill the following keys:

**Frontend (`client/.env`)**



VITE_BACKEND_URL=http://localhost:5000

PORT=5000
MONGO_URI=mongodb://localhost:27017/funplanner
JWT_SECRET=your_jwt_secret


```
# clone and navigate
git clone https://github.com/Sagolsa78/FunPlanner_v2.git
cd FunPlanner_v2

# run backend
cd server
npm install
npm run dev

# run frontend
cd ../client
npm install
npm run dev

```

## Access app at:
Frontend → http://localhost:3000
Backend → http://localhost:5000


## 🤝 Contributing
We welcome contributions from developers!

Steps:

Fork this repo

Create your feature branch: git checkout -b feature/your-feature

Commit your changes: git commit -m "Add your message"

Push to the branch: git push origin feature/your-feature

Open a pull request 🚀

## 👤 Author
Mohit Sahani (Sagolsa78)

GitHub: @Sagolsa78

## 📄 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute this project as long as the license is included.