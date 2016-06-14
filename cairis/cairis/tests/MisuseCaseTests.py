import logging
from urllib import quote

import jsonpickle
from MisuseCase import MisuseCase
from tests.CairisTests import CairisTests

__author__ = 'Robin Quetin'


class MisuseCaseTests(CairisTests):
    # region Class fields
    logger = logging.getLogger(__name__)
    existing_risk_name = 'Unauthorised Certificate Access'
    misuse_case_class = MisuseCase.__module__+'.'+MisuseCase.__name__
    # endregion

    def test_get_all(self):
        method = 'test_get_all'
        rv = self.app.get('/api/misuse-cases?session_id=test')
        misuse_cases = jsonpickle.decode(rv.data)
        self.assertIsNotNone(misuse_cases, 'No results after deserialization')
        self.assertIsInstance(misuse_cases, dict, 'The result is not a dictionary as expected')
        self.assertGreater(len(misuse_cases), 0, 'No misuse_cases in the dictionary')
        self.logger.info('[%s] MisuseCases found: %d', method, len(misuse_cases))
        misuse_case = misuse_cases.values()[0]
        self.logger.info('[%s] First misuse_case: %s [%d]\n', method, misuse_case['theName'], misuse_case['theId'])

    def test_get_by_name(self):
        method = 'test_get_by_risk'
        url = '/api/misuse-cases/risk/%s?session_id=test' % quote(self.existing_risk_name)
        rv = self.app.get(url)
        self.assertIsNotNone(rv.data, 'No response')
        self.logger.debug('[%s] Response data: %s', method, rv.data)
        misuse_case = jsonpickle.decode(rv.data)
        self.assertIsNotNone(misuse_case, 'No results after deserialization')
        self.logger.info('[%s] MisuseCase: %s [%d]\n', method, misuse_case['theName'], misuse_case['theId'])