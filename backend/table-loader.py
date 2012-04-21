#!/usr/bin/env python

import json
import sys


if __name__ == '__main__':
  data = json.load(open('dataset/feed.json'))
  for item in data:
    for values in item.itervalues():
      if isinstance(values, list):
        print len(values),
    print '\n'
  
