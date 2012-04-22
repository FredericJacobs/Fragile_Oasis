# What is Fragile Oasis ?

Fragile Oasis is an effort to get everyone to see the Earth as a single home for humanity, and to inspire people to make a difference, change things for the better. This projects focus on brining a convenient way of browsing Fragile's Oasis inputs.

## What is this project about ?

This project was built during the 48 hours *International Space Apps Challenge*, a hackathon organized by NASA that was run on every continent on earth and from ISS. This project was built in Lausanne, Switzerland.

The project was proposed by NASA on the [challenges page](http://spaceappschallenge.org/challenges/).A Fragile Oasis Map Visualisation tool was pitched by [Michele Castata](http://twitter.com/#!/pirroh) and we quickely build up a team with [Sacha Bron](http://twitter.com/Binary_Brain) and [Frederic Jacobs](http://twitter.com/FredericJacobs). We also got help on the documentation of API's and artwork from Florian Junker, Robin Würsch and Vito Pellizzani.

## Motivation behind it

We read the blog post by [Ron Garan](http://en.wikipedia.org/wiki/Ronald_J._Garan,_Jr.) about what Fragile Oasis really is and we thought it was a cause worth defending.

>In June 2008, I had the privilege of flying on board the Space Shuttle Discovery to the International Space Station, the most complex structure ever built. I was also privileged to conduct three spacewalks during the fourteen-day mission.
During the last one, with my feet anchored in clamps on the end of the space station’s robotic arm, I was swept in a big arc over the top of the space station and back. 
At the top of the arc, I was 100 feet above the space station with the Earth 250 miles below. It was absolutely incredible to see this enormous orbiting space station --  the tremendous achievement of sixteen diverse nations working together on Earth to accomplish a goal in space. Seeing humanity’s magnificent accomplishment against the backdrop of our indescribably beautiful Earth 250 miles below took my breath away. I wasn’t just looking down at the Earth.  I was looking at a planet hanging in the blackness of space.

# What did we build ?

## Data Handeling (Backend)

[Michele Castata](http://twitter.com/#!/pirroh) is our backend guy. He wrote a script in Python that can act as a deamon on a server to allow the data from the Fragile Oasis to be preprocessed for use on maps. We did used something called *Google Fusion Tables*. You may ask why we did use these instead of a regular database. 
Here is why :

- Fusion Tables are synonym to free database hosting

- It is very easy to visualize the data

- They provide tools for drawing graphs

- They can easily be exported

- They have an SQL-API

Check out our [demo table](http://www.google.com/fusiontables/DataSource?docid=1gFh_V4C0GoIL0NmqJaSYOvmwMWrNl1MyvhYOUmg)

### Backend dependencies

- python-fusiontables

- python-requests

- BeautifulSoup

### External services used to enhance the dataset

- Freebase.com (now part of the Google APIs)

- OpenStreetMap.org

## Data Visualisation

Because a great website is made of both we didn't stop with the backend. [Frederic Jacobs](http://www.fredericjacobs.com) and [Sacha Bron](http://twitter.com/Binary_Brain) worked exclusively on the front-end.

### Goal 

Our goal was to bring a the data from Fragile Oasis to the user with a custom UX. We started by brainstorming on what was the best way to deliver content to the visitor. We ended up choosing for a web app. I'm personally not a big fan of web apps since they are often slow, unresponsive and have huge limitations in terms of capabilities but it was our only way to get some working prototype by the end of the weekend. We took my previous points into consideration when designing the application and tries to give it a native feel.

We ended up using those well-knows web libraries like bootstrap, jQuery and less. ([yes, not more](http://morecss.org/) ;) )

Getting the information from Google Fusion Tables has been tricky since they deprecated the old API and the new one isn't correctly documented yet. They are also restrictive concerning the way you can get data. 

### About the Map

The map itself is a Google Map. We added a custom overlay on top of that programatically. There is a way to do it with Fusion Tables automatically but that doesn't make markers (sometimes called pins) scriptable for custom actions and you'll end up being very limited in terms of functionality. The [Google Maps API3 for JavaScript](http://developers.google.com/maps/documentation/javascript/) can be very painful when handeling the modifications of markers but in the end remains probably the easiest way to get a map-based visualisation tool.

The Map is using the user's location on modern web browsers to center the initial frame.

### Categories

Fragile Oasis is getting bigger on a daily basis and collected initiatives are in a really broad spectrum. We build a tool to get quickly started by searching initiatives by geographical locations and category.
Categories include communication, community, education, energy, environment, food, health, peace, research and water.

** NOTE : This isn't fully supported yet - Check out this page in a few days **

### Markers 

The World Map is full of markers. You'll be able to visualize what exactly is going on in these locations by looking at the markers that are different depending on the category. 
If you're interested in an initiative, just click a marker to know more about it.

## More to come 

48 hours is short. We did only succeed in building the above features but opportunities to expand this are limitless. We would love getting all kind of geolocalized information on top of this map and crowd-source inputs of this map even more.
Twitter feeds about initiatives will probably be implemented very quickly. 

We would also love to redesign the detailed view. Redefining the CSS should be enough since all the data handeling is already done.