import cherrypy
from SessionValidator import validate_proxy
from jsonpickle import encode as json_serialize

__author__ = 'Robin Quetin'


class EnvironmentController(object):
    def all(self, session_id=None, constraintsId=-1):
        db_proxy = validate_proxy(cherrypy.session, session_id)
        environments = db_proxy.getEnvironments(constraintsId)
        return json_serialize(environments)

    def all_names(self, session_id=None):
        db_proxy = validate_proxy(cherrypy.session, session_id)
        environment_names = db_proxy.getEnvironmentNames()
        return json_serialize(environment_names)