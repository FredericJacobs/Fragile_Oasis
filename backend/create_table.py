#!/usr/bin/env python

from collections import OrderedDict

from ftpusher import FTPusher


# the schema must have __hash__, because the library needs (TABLE_NAME:schema)
class HashableOrderedDict(OrderedDict):
  def __hash__(self):
    return hash(tuple(self.items()))


# base schema extracted from the Fragile Oasis dataset (JSON feed)
# maps 1-to-1 to a Google Fusion Tables schema
SCHEMA = {
  'Fragile Oasis':HashableOrderedDict([
  ('title', 'STRING'),
  ('category', 'STRING'),
  ('url', 'STRING'),
  ('website', 'STRING'),
  ('cords', 'LOCATION'),
  ('city', 'LOCATION'), # augmented with OpenStreetMap
  ('cityinfo', 'LOCATION'), # augmented with Freebase
  ('country', 'LOCATION'), # augmented with OpenStreetMap
  ('countryinfo', 'LOCATION'), # augmented with Freebase
  ('description', 'STRING'),
  ('votes', 'NUMBER'),
  ('location', 'LOCATION'),
  ('comments', 'NUMBER'),
  ('featured', 'STRING'),
  ('followers', 'NUMBER'),
  ('followersinfo', 'NUMBER'), # augmented by scraping fragileoasis.org
  ('shares', 'NUMBER'),
  ('id', 'NUMBER'),
  ('photos', 'STRING'),
  ])
}


if __name__ == '__main__':
  pusher = FTPusher()
  pusher.create_table(SCHEMA)
  
