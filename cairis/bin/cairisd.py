#!/usr/bin/python
#  Licensed to the Apache Software Foundation (ASF) under one
#  or more contributor license agreements.  See the NOTICE file
#  distributed with this work for additional information
#  regarding copyright ownership.  The ASF licenses this file
#  to you under the Apache License, Version 2.0 (the
#  "License"); you may not use this file except in compliance
#  with the License.  You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing,
#  software distributed under the License is distributed on an
#  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
#  specific language governing permissions and limitations
#  under the License.
import sys
import cairis.daemon.IRISDaemon 
import cairis.daemon.WebConfig 
from cairis.daemon.CairisHTTPError import CairisHTTPError

__author__ = 'Robin Quetin'

def main(args):
    options = {
        'port': 0,
        'unitTesting': False
    }

    if len(args) > 1:
        for arg in args[1:]:
            if arg == '-d':
                options['loggingLevel'] = 'debug'
            if arg == '--unit-test':
                options['unitTesting'] = True

    cairis.daemon.WebConfig.config(options)
    client = cairis.daemon.IRISDaemon.start()
    if client is not None:
        return client

if __name__ == '__main__':
  try:
    main(sys.argv)
  except CairisHTTPError, e:
    print "Fatal CAIRIS error: " + str(e)
    sys.exit(-1)
