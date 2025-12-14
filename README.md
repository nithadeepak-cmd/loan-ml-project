# Loan Eligibility Prediction System (ML + FastAPI + React)

An end-to-end Machine Learning project that predicts loan approval status based on applicant details.  
This project demonstrates the complete ML lifecycle — from data preprocessing and model training to API development, frontend integration, and deployment.

---

## Live Project Links

Frontend (UI):
https://nithadeepak-cmd.github.io/loan-ml-project/

Backend API (FastAPI):
https://loan-ml-api-qxq3.onrender.com

Swagger API Docs:
https://loan-ml-api-qxq3.onrender.com/docs

---

## Project Overview

The Loan Eligibility Prediction System takes applicant details such as income, loan amount, credit history, and property area, and predicts whether a loan will be Approved or Rejected.

This project is designed to simulate a real-world ML product, not just a notebook-based model.

---

## Tech Stack

Machine Learning:
- Python
- NumPy
- Pandas
- Scikit-learn
- RandomForestClassifier

Backend:
- FastAPI
- Uvicorn
- Joblib (model persistence)

Frontend:
- React
- JavaScript
- HTML
- CSS
- Fetch API

Deployment:
- Backend: Render
- Frontend: GitHub Pages
- Version Control: Git & GitHub

---

## Project Architecture

Dataset  
↓  
Data Preprocessing  
↓  
Model Training  
↓  
Saved Model (.pkl)  
↓  
FastAPI Backend  
↓  
React Frontend  
↓  
Deployment

---

## Project Structure

loan-ml-project/
│
├── api/                      # Production backend (ONLY what runs on server)
│   ├── main.py
│   ├── loan_model.pkl
│   ├── label_encoders.pkl
│   ├── requirements.txt
│   └── .gitignore
│
├── model-training/           # Offline ML work (NOT deployed)
│   ├── train_model.py
│   ├── loan_data.csv
│   ├── loan_model.pkl
│   ├── label_encoders.pkl
│   └── README.md
│
├── loan-predict-ui/          # Frontend
│   ├── src/
│   ├── public/
│   ├── build/
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
├── README.md                 # Main project README (single source)
└── .gitignore
---

## Machine Learning Workflow

1. Dataset loading and analysis
2. Data preprocessing and encoding
3. Model training using RandomForestClassifier
4. Model evaluation
5. Saving trained model and encoders
6. Loading model in FastAPI backend
7. Exposing prediction API
8. Connecting frontend to API
9. Deployment

---

## API Details

Endpoint:
POST /predict

Request Body (JSON):
{
  "Gender": "Male",
  "Married": "Yes",
  "Dependents": 0,
  "Education": "Graduate",
  "Self_Employed": "Yes",
  "ApplicantIncome": 5000,
  "CoapplicantIncome": 2000,
  "LoanAmount": 150,
  "Loan_Amount_Term": 360,
  "Credit_History": 1,
  "Property_Area": "Urban"
}

Response:
{
  "Loan_Status": "Approved"
}

---

## Frontend Features

- User-friendly loan application form
- Dropdown-based inputs to avoid invalid values
- Loading spinner during API call
- Success and error messages
- Reset functionality
- Connected to live backend API

---

## Deployment Details

Backend:
- Hosted on Render
- Uses Uvicorn with FastAPI
- Auto-deploys on GitHub push

Frontend:
- Hosted on GitHub Pages
- Built React app deployed from GitHub repository

---

## Key Learnings

- End-to-end ML project workflow
- Model serialization and reuse
- API development with FastAPI
- Frontend-backend integration
- Handling CORS and production URLs
- Real-world deployment challenges

---

## Future Improvements

- Add Deep Learning model
- Improve feature engineering
- Add authentication
- Store prediction history
- Improve UI design

---

## Author

Nitha Deepak  
Aspiring ML & Full-Stack Developer  

GitHub:
https://github.com/nithadeepak-cmd
