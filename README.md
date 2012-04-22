Fragile Oasis Mashup  
Version 0.1  
Copyright (C) 2012 Michele Catasta, Frederic Jacobs, Sacha Bron  
Licensed under The MIT License  

Project Page:
http://spaceappsch.github.com/Fragile_Oasis

# What is Fragile Oasis?

[Fragile Oasis](http://www.fragileoasis.org) is an effort to get everyone to see the Earth as a single home for humanity, and to inspire people to make a difference, changing things for the better. Our mashup focuses on giving a great UX on the Fragile Oasis dataset by means of geolocalization, category filtering, data enhancement from multiple sources, etc.

## Project & Team

This project was developed during the 2-days [*International Space Apps Challenge*](http://spaceappschallenge.org/), a hackathon organized by NASA that was run on every continent on Earth (and even on the ISS!). Our team was located in Lausanne, Switzerland.

As soon as we read about the "Fragile Oasis: Map-a-Difference" project on the [challenges page](http://spaceappschallenge.org/challenges/), we realized that making a difference is exactly what we look for in a hackathon! [Michele Catasta](http://twitter.com/pirroh) pitched the mashup idea during the introductory meeting, and we formed a team with [Sacha Bron](http://twitter.com/Binary_Brain) and [Frederic Jacobs](http://twitter.com/FredericJacobs). We also got help on API documentation and artwork from Florian Junker, Robin Würsch and Vito Pellizzani.

## Motivation behind it

We read the blog post by [Ron Garan](http://en.wikipedia.org/wiki/Ronald_J._Garan,_Jr.) about what Fragile Oasis really is and we thought it was a cause worth defending.

>In June 2008, I had the privilege of flying on board the Space Shuttle Discovery to the International Space Station, the most complex structure ever built. I was also privileged to conduct three spacewalks during the fourteen-day mission.
During the last one, with my feet anchored in clamps on the end of the space station’s robotic arm, I was swept in a big arc over the top of the space station and back. 
At the top of the arc, I was 100 feet above the space station with the Earth 250 miles below. It was absolutely incredible to see this enormous orbiting space station --  the tremendous achievement of sixteen diverse nations working together on Earth to accomplish a goal in space. Seeing humanity’s magnificent accomplishment against the backdrop of our indescribably beautiful Earth 250 miles below took my breath away. I wasn’t just looking down at the Earth.  I was looking at a planet hanging in the blackness of space.

# What did we build ?

## Backend & Data Enhancement

[Michele Catasta](http://twitter.com/pirroh) is our backend guy. He wrote a small daemon in Python that 
uses the Fragile Oasis live feed, and runs a pipeline of pre-processing steps before storing the data. 
For our storage layer, we used [*Google Fusion Tables*](http://www.google.com/fusiontables/). You may ask why we didn't use a regular database. 
Here is why :

- Fusion Tables can be made public. We followed the [Open Data philosophy](http://en.wikipedia.org/wiki/Open_data) by allowing everybody to export our enhanced dataset in a variety of formats.

- They are a great way to quickly visualize data

- Drawing graphs is just 2 clicks away

- They can be queried with a SQL-like API

Check out our [public table](http://www.google.com/fusiontables/DataSource?docid=1gFh_V4C0GoIL0NmqJaSYOvmwMWrNl1MyvhYOUmg)

### Backend dependencies

- python-fusiontables

- python-requests

- BeautifulSoup

### External services used to enhance the dataset

- OpenStreetMap.org: we used it to extract accurately the city and the country where the initiative is taking place (often fixing the location provided in the Fragile Oasis dataset).

- Freebase.com (now part of the Google APIs): we used it to extract meaningful information about the locations, to integrate it in our mashup.

## Data Visualisation

A great website is made of both a powerful backend, and a carefully designed frontend.. [Frederic Jacobs](http://www.fredericjacobs.com) and [Sacha Bron](http://twitter.com/Binary_Brain) worked exclusively on the front-end.

### Goal 

Our goal was to bring the data from Fragile Oasis to the user with a custom UX. We started by brainstorming on what was the best way to deliver content to the visitor. We are not big fans of web apps since they are often slow, unresponsive and have huge limitations in terms of capabilities but it was our only way to get some working prototype by the end of the weekend. We took the previous points into consideration when designing the application and tried to give it a native feel.

We ended up using some well-known Web libraries like bootstrap (from Twitter), jQuery and less. ([yes, not more](http://morecss.org/) ;) )

Getting the information from Google Fusion Tables proved to be tricky since they deprecated the old API and the new one isn't correctly documented yet. They are also restrictive concerning the way you can get data. 

### About the Map

The map itself is a Google Map. We added a custom overlay on top of that programatically. There is a way to do it with Fusion Tables, but that doesn't make markers (sometimes called pins) scriptable for custom actions and you'll end up being very limited in terms of functionality. The [Google Maps API3 for JavaScript](http://developers.google.com/maps/documentation/javascript/) can be very painful when handling the modifications of markers, but it's still a lot more powerful.
The map takes the user location as an input, so (on modern browsers) we can center the initial frame.

### Categories

Fragile Oasis is growing steadily, and the collected initiatives are in a really broad spectrum. We built a tool to search initiatives not only by geographical locations, but also by category.
Categories include communication, community, education, energy, environment, food, health, peace, research and water.

** NOTE : This isn't fully supported yet - Check out this page in a few days **

### Markers 

The World Map is full of markers. You'll be able to visualize what exactly is going on in those locations by looking at the different markers (one for each category).
If you're interested in an initiative, just click a marker to know more about it!

## More to come 

30 hours is a short amount of time! We were able only to develop the above features, but there are great opportunities to expand our mashup. We would love to get all kind of geolocalized information on top of this map, and even crowd-sourced inputs.
We will also show Twitter feeds based both on the location and on the initiatives. 

We would also love to redesign the detailed view. Improving the CSS should be enough since the data handling is already implemented.