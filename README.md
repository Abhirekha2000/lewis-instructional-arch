
# Lewis Instructional Architecture – Lab 4

## Overview
This README provides a complete, beginner-friendly guide for the Lewis Instructional Architecture Lab‑4 project — from cloning the repository, understanding the file structure, running the project locally, to deploying the full stack (frontend + Azure Functions API + storage).

---

## 📁 Project File Structure

```
lewis-instructional-arch/
│
├── frontend/                     # React client application
│   ├── src/
│   │   ├── App.jsx              # Frontend UI + API calls
│   │   └── components/          # (Optional future components)
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── azure-function-api/           # Azure Functions backend
│   ├── hello/                   # GET /hello
│   ├── items/                   # GET /items
│   ├── upload/                  # POST /upload (Blob storage)
│   ├── auth-proxy/              # (Optional) Authentication proxy
│   ├── host.json
│   ├── local.settings.json
│   └── package.json
│
└── README.md (this file)
```

---

## 🚀 Step 1 — Clone the Repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd lewis-instructional-arch
```

---

## 💻 Step 2 — Run the Frontend Locally

### Install dependencies:
```bash
cd frontend
npm install
```

### Start development server:
```bash
npm run dev
```

Your React UI will be available at:  
👉 **http://localhost:5173**

---

## ⚙️ Step 3 — Run Azure Functions Locally

### Install dependencies:
```bash
cd azure-function-api
npm install
```

### Make sure Azure Functions Core Tools is installed:
```bash
func --version
```

### Run the API:
```bash
npm start
```

Your local endpoints will be:

- http://localhost:7071/api/hello  
- http://localhost:7071/api/items  
- http://localhost:7071/api/upload  
- http://localhost:7071/api/auth-proxy  

---

## ☁️ Step 4 — Deploy to Azure

### 1️⃣ Create Azure Resources
You created:

- **Function App**  
- **Storage Account**  
- **Static Web App (for frontend)**  

### 2️⃣ Deploy API
From the `azure-function-api/` folder:

```bash
func azure functionapp publish <your-function-app-name>
```

Example:
```
func azure functionapp publish lewis-api-abhirekha
```

---

## 🌐 Step 5 — Deploy Frontend to Azure Static Web Apps

1. Open your repo on GitHub  
2. Add Azure Static Web App → choose React  
3. GitHub Actions auto‑deploys artifacts  
4. Replace API endpoint in frontend with:

```
https://<your-function-app>.azurewebsites.net/api
```

---

## 🧪 Step 6 — Verify Everything

### ✔️ Hello API working  
### ✔️ Items API working  
### ✔️ Upload API storing files to Azure Blob Storage  
### ✔️ Deployed frontend calling deployed API  

Congratulations — the architecture is fully implemented!

---

## 🧱 Technologies Used

- **React (Vite)** — Frontend UI  
- **Azure Functions (Node 18)** — Backend  
- **Azure Blob Storage** — File uploads  
- **Static Web Apps** — Frontend hosting  
- **JavaScript (Node.js)** — Server side  
- **Axios + Fetch** — API communication  

---

## 📚 Helpful for Students

This architecture supports:

- Beginner projects (Hello World)
- Intermediate projects (CRUD, uploads)
- Advanced capstone-level systems
- Multi-language API expansion (Python, Java)
- Authentication (optional)
- NoSQL → SQL expansion

---

## 🏁 Final Notes

This project meets all ASRs:
- Low cost  
- No university maintenance  
- Expandable  
- Supports multiple classes  
- Easy for students & instructors  

---

*Generated for Lewis University — Lab 4 Architectural Task*
