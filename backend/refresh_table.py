#!/usr/bin/env python

from BeautifulSoup import BeautifulSoup
import json
import requests
import sys
import time

from ftpusher import FTPusher

import util


# extract city, country from OpenStreetMap
def _extract_city_country(cords):
  # let's be polite with the external webservices!
  time.sleep(1)

  r = requests.get('http://nominatim.openstreetmap.org/search?format=json'
                   '&addressdetails=1&email=pirroh@fooshed.net&app=fragileoasis'
                   '&q=%s' % cords)
  country = ''
  city =''
  try:
    data = json.load(r, object_hook=util.str_only_dict)
  except ValueError:
    # no results returned for the given coordinates
    return [city, country]
  try:
    # extract country with priority
    country = data[0]['address']['country']
    city = data[0]['address']['city']
    return [city, country]
  except:
    return [city, country]


# scrape followers from the Fragile Oasis website
def _scrape_followers(url):
  r = requests.get(url)
  soup = BeautifulSoup(r.read())

  followers = {}
  # the space at the end of 'right-rail ' is NOT a typo
  f = soup.find(
      'div', {'class':'right-rail '}).find(
      'div', {'class':'grid'})
  for link in f.findAll('a'):
    user = 'http://www.fragileoasis.org' + str(link.get('href'))
    followers[user] = str(link.contents[0])
  return json.dumps(followers)


# reconcile entity type on Freebase
def _get_entity_info(entity, type):
  # let's be polite with the external webservices!
  time.sleep(1)

  if entity == '':
    return ''
  payload = {'query':entity, 'filter':'(all type:%s)' % type}
  r = requests.get('https://www.googleapis.com/freebase/v1/search',
                   params=payload)
  try:
    data = json.load(r, object_hook=util.str_only_dict)
    return 'http://www.freebase.com/view' + data['result'][0]['mid']
  except:
    return ''


# get City entity on Freebase
def _get_city_info(city):
  return _get_entity_info(city, '/location/citytown')


# get Country entity on Freebase
def _get_country_info(country):
  return _get_entity_info(country, '/location/country')


# enhance the Fragile Oasis dataset with external data
def _enhance_FO(data):
  for row in data:
    city, country = _extract_city_country(row['cords'])
    row['city'] = city
    row['cityinfo'] = _get_city_info(city)
    row['country'] = country
    row['countryinfo'] = _get_country_info(country)
    row['followersinfo'] = _scrape_followers(row['url'])
  return data


def import_fragile_oasis():
  r = requests.get('http://www.fragileoasis.org/projects/feed/?format=json')
  data = json.load(r, object_hook=util.fragile_oasis_parser)
  return _enhance_FO(data)


if __name__ == '__main__':
  pusher = FTPusher()
  pusher.populate_table(import_fragile_oasis())
  
