# 🚀 QuickBite - Full Stack Food Delivery App

Yeh ek complete full-stack food delivery application hai jo React, Node.js, Express, aur MongoDB par bani hai. Is project mein frontend aur backend dono files sath hain.

---

## 🛠️ Local Machine Setup Guide

### 1. Project Project System Clone
```bash
git clone https://github.com
cd QUICKBITE
```

### 2. Backend Server Run Karna (File 1)
1. **Backend folder mein jayein:**
   ```bash
   cd backend
   ```
2. **Packages install karein:**
   ```bash
   npm install
   ```
3. **Environment Setup (.env):**
   `backend` folder mein ek `.env` naam ki file banayein aur usme yeh text paste karein:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/quickbite
   JWT_SECRET=quickbite_secret_2026
   ```
4. **Server start karein:**
   ```bash
   npm start
   ```

### 3. Frontend App Run Karna (File 2)
*Apne terminal par ek **naya window/tab** kholein aur yeh commands chalayein:*
1. **Frontend folder mein jayein:**
   ```bash
   cd frontend
   ```
2. **Packages install karein:**
   ```bash
   npm install
   ```
3. **API Connector Config (.env):**
   `frontend` folder mein ek `.env` file banayein aur usme local server mapping dalein:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. **Interface start karein:**
   ```bash
   npm run dev
   ```
