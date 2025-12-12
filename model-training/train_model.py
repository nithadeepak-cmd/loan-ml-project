import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

#1. Load data
data= pd.read_csv("loan_data.csv")

#2. Clean data
# Remove Loan id - not useful
data=data.drop("Loan_ID",axis=1)

#Replace missing values if any
data=data.fillna({"Dependents":"0","Self_Employed":"No"})

#Convert Dependents "3+"-> 3
data["Dependents"]=data["Dependents"].replace("3+",3).astype(int)

#3. Encode categorical colums
label_encoders={}
cat_cols=["Gender","Married","Education","Self_Employed","Property_Area"]
for col in cat_cols:
    le=LabelEncoder()
    data[col]=le.fit_transform(data[col])
    label_encoders[col]=le
print("encoders loaded:",label_encoders.keys())

#4. Split Features and labels
data["Loan_Status"]=data["Loan_Status"].map({"Y":1,"N":0})
X=data.drop("Loan_Status",axis=1)
y=data["Loan_Status"]

X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=42)

#5. Train Model
model=RandomForestClassifier(n_estimators=200,random_state=42)
model.fit(X_train,y_train)

#6. Test model
y_pred=model.predict(X_test)
accuracy=accuracy_score(y_test,y_pred)

print("Model training completed")
print("Accuracy:",round(accuracy*100,2),"%")

#7. Save model & encoders
joblib.dump(model,"loan_model.pkl")
joblib.dump(label_encoders,"label_encoders.pkl")
print("Model+encoders saved successfully")

