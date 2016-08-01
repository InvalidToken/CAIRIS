
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

import logging
import jsonpickle
import unittest
import os
from urllib import quote
from cairis.tools.JsonConverter import json_serialize
from cairis.test.CairisDaemonTestCase import CairisDaemonTestCase

class UserTests(CairisDaemonTestCase):
    logger = logging.getLogger('UserTests')
    data = {
        'username': 'cairis',
        'password': 'cairis123'
    }

    def test_user_config_form_post(self):
        rv = self.app.post('/user/login.html', data=self.data, headers={'accept': 'text/html'})
        self.assertIsNotNone(rv.data, 'No response')
        self.logger.info('Data: %s', rv.data)
        check = rv.data.find('session_id')
        self.assertGreater(check, -1, 'No session ID was returned')

    def test_user_config_json_post(self):
        data_str = jsonpickle.encode(self.data)
        rv = self.app.post('/api/user/login', content_type='application/json', data=data_str)
        self.assertIsNotNone(rv.data, 'No response')
        self.logger.info('Data: %s', rv.data)
        resp_dict = jsonpickle.decode(rv.data)
        self.assertIsNotNone(resp_dict, 'Unable to deserialize response')
        self.assertIsNotNone(resp_dict.get('session_id', None), 'No session ID defined')
