from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import os;

app=FastAPI()
app.add_middleware(
     CORSMiddleware,
     allow_origins=["*"],
     allow_credentials=True,
     allow_methods=["*"],
     allow_headers=["*"]
)


# lode model and encoders
#model=joblib.load("../model-training/loan_model.pkl")
#label_encoders=joblib.load("../model-training/label_encoders.pkl")
BASE_DIR=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model=joblib.load(os.path.join(BASE_DIR,"model-training","loan_model.pkl"))
label_encoders=joblib.load(os.path.join(BASE_DIR,"model-training","label_encoders.pkl"))

#input schema

class LoanInput(BaseModel):
    Gender:str
    Married:str
    Dependents:int
    Education:str
    Self_Employed:str
    ApplicantIncome:int
    CoapplicantIncome:int
    LoanAmount:int
    Loan_Amount_Term: int
    Credit_History:int
    Property_Area:str

@app.post("/predict")
def predict_loan_status(data:LoanInput):
        try:
            input_dict=data.dict()
            #encode categorical columns

            for col,le in label_encoders.items():
                input_dict[col]=le.transform([input_dict[col]])[0]

            # #convert to dataframe
            # input_df=pd.DataFrame([input_dict])    

            # #Predit
            # prediction=model.predict(input_df)[0]

            # #Map output
            # status_map={1:"Approved",0:"Rejected"}
            # return{"Loan_Status":status_map[prediction]}

            #convert to numpy array for model
            input_array=np.array(list(input_dict.values())).reshape(1,-1)
            #predit
            prediction=model.predict(input_array)[0]
            # #Map output
            status_map={1:"Approved",0:"Rejected"}
            return{"Loan_Status":status_map[int(prediction)]}
            # result="Approved" if prediction==1 else"Rejected"
            # return{"Loan_Status: ":result}
        except Exception as e:
            return{"Error: ":str(e)}


