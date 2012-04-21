# Fragile Oasis #
-----------------


### Backend dependencies ###
* python-fusiontables
* python-requests

### Google Refine manipulations ###
* 'http://nominatim.openstreetmap.org/search?format=json&addressdetails=1&email=pirroh@fooshed.net&app=google-refine&q=' + escape(value, 'url') 
  * 'cords' to JSON data
* value.parseJson()[0]['address']['country']
  * JSON data to 'country'
