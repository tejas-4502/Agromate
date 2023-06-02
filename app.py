from flask import Flask, render_template, request, redirect, url_for
import joblib 
import pandas as pd
import pickle 

app = Flask(__name__)

# @app.route('/')
# def login():
#     return render_template('login.html')

@app.route('/home')
def home():
    return render_template('home.html')

# load the machine learning model
model = joblib.load("model.pkl")

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'GET':
        # get the form data from the frontend
        state = request.args.get('state')
        district = request.args.get('district')
        year = request.args.get('year')
        season = request.args.get('season')
        crop = request.args.get('crop')
        area = request.args.get('area')

        # preprocess the input data
        Value = (state, district, year, season, crop, area)

        # make a prediction using the model
        prediction = model.predict([Value])

        # format the prediction as a string
        output = "The predicted yield for your selected crop is {} tonnes per hectare".format(prediction[0])

        # Round the prediction to 2 decimal places
        prediction = round(prediction[0], 2)

        return render_template('predict.html', prediction=output)
    else:
        return render_template('home.html')



if __name__=="__main__":
    app.run(debug=True)