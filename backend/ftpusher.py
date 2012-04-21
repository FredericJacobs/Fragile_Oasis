#!/usr/bin/python
"""
Google Fusion Tables pusher.
"""


import sys

from fusiontables import ftclient
from fusiontables.authorization.clientlogin import ClientLogin
from fusiontables.sql.sqlbuilder import SQL


USERNAME = 'pirroh@gmail.com'
TABLE_ID = 3616702


class FTPusher:

  def __init__(self):
    password = open('password.txt', 'r').readline()
    token = ClientLogin().authorize(USERNAME, password)
    self.ft_client = ftclient.ClientLoginFTClient(token)

  def populate_table(self, data):
    for row in data:
      proj_id = row['id']

      try:
        row_id = int(self.ft_client.query(
            SQL().select(TABLE_ID,
            ['rowid'],
            "id=%s" % proj_id)).split('\n')[1])
        self.ft_client.query(
            SQL().update(TABLE_ID, row.keys(), row.values(), row_id))
      except ValueError:
        # if project not in the table, insert new row
        self.ft_client.query(SQL().insert(TABLE_ID, row))
      print '.',
      sys.stdout.flush()
