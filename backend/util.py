#!/usr/bin/env python

import json
import unicodedata


# recursively encode (to str) a list with unicode values
def _decode_list(data):
  rv = []
  for item in data:
    if isinstance(item, unicode):
      item = item.encode('utf-8')
    elif isinstance(item, list):
      item = _decode_list(item)
    elif isinstance(item, dict):
      item = str_only_dict(item)
    rv.append(item)
  return rv


# substitute a simple call to dict(), to enforce str encoding
def str_only_dict(data):
  rv = {}
  for key, value in data.iteritems():
    if isinstance(key, unicode):
      key = key.encode('utf-8')
    if isinstance(value, unicode):
      value = unicodedata.normalize('NFKD', value).encode('ascii','ignore')
    elif isinstance(value, list):
      value = _decode_list(value)
    elif isinstance(value, dict):
      value = str_only_dict(value)
    rv[key] = value
  return rv


# parsing rules specific to the Fragile Oasis dataset
def fragile_oasis_parser(data):
  rv = {}
  for key, value in data.iteritems():
    if key == 'cords':
      value = ','.join(["%s" % f for f in value])
    elif key == 'photos':
      value = json.dumps(value)
    elif isinstance(value, bool):
      value = str(value)
    rv[key] = value
  return str_only_dict(rv)

