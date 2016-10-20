# Predict Watch

by Faire Soule-Reeves and Daniel Reeves

The code in src/rocky is what runs on the watch and the code in src/pkjs is what runs on the phone.
The watch sends a message to the phone every minute asking for the new predictions.
When the phone gets a message like "fetch: predict" then it grabs the latest numbers from PredictWise.
It sends those back to the watch.
When the watch gets the prediction data it constructs a string and displays it on the watch face.

That is all.

One thing we want to do is make it parse that dumb timestamp and actually say how many minutes ago the predictions were fetched.
Also Bethany Soule requests that the watch face show the date as well as the time.
