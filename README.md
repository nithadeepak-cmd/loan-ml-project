Loan Prediction ML Project 

Loan Prediction ML Project
Includes:
• Machine Learning Model Training
• FastAPI Backend
• React Frontend UI
• Clean folder structure
• UI enhancements and deployment pending

PROJECT STRUCTURE

loan-ml-project/
│
├── api/ → FastAPI backend
│ ├── main.py → /predict endpoint
│ ├── requirements.txt
│
├── loan-predict-ui/ → React frontend
│ ├── src/
│ ├── public/
│ ├── package.json
│
├── model-training/ → Model training scripts
│ ├── train_model.py
│ ├── loan_model.pkl
│ ├── label_encoders.pkl
│ ├── loan_data.xlsx
│
└── README.txt

FEATURES

MACHINE LEARNING
• Trained using Scikit-Learn
• Label Encoding
• Feature Cleaning
• Saved model & encoders (PKL files)

API – FASTAPI
• Endpoint: POST /predict
• Loads trained ML model
• Returns prediction + confidence

UI – REACT
• Form-based user input
• Sends data to API
• Displays prediction result
• Pending: loading spinner & styling improvements

RUNNING THE PROJECT LOCALLY

START THE FASTAPI BACKEND

cd api
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs at: http://localhost:8000

START THE REACT UI

cd loan-predict-ui
npm install
npm start

UI runs at: http://localhost:3000

TRAIN THE MODEL (OPTIONAL)

cd model-training
python train_model.py

Generates:
• loan_model.pkl
• label_encoders.pkl

STATUS

Model Training: Completed
API: Completed
UI: Partially completed
Deployment: Not started
Next steps: UI spinner, styling, deployment, Docker

ROADMAP

[ ] Add loading spinner
[ ] Improve UI layout
[ ] Add error handling
[ ] Deploy API & UI
[ ] Add screenshots in README
[ ] Add architecture diagram
