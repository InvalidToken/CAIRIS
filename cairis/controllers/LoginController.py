import httplib
import logging
import sys
import MySQLdb
from flask_restful_swagger import swagger
from flask import request, make_response, session
from flask_restful import Resource
from jsonpickle import encode

from cairis.core.Borg import Borg
from cairis.daemon.CairisHTTPError import MissingParameterHTTPError, MalformedJSONHTTPError
from werkzeug.security import generate_password_hash, check_password_hash
from cairis.core.BorgFactory import parseConfigFile
from cairis.tools.ModelDefinitions import UserLoginModel
from cairis.tools.SessionValidator import validate_proxy, get_logger


__author__ = 'Robin Quetin'


def set_dbproxy():
    b = Borg()
    setting = parseConfigFile()
    db_proxy = validate_proxy(None, -1, conf=setting)
    pSettings = db_proxy.getProjectSettings()
    id = b.init_settings()
    db_proxy.close()
    session['session_id'] = id
    b.settings[id]['dbProxy'] = db_proxy
    b.settings[id]['dbUser'] = setting['dbuser']
    b.settings[id]['dbPasswd'] = setting['dbpasswd']
    b.settings[id]['dbHost'] = setting['dbhost']
    b.settings[id]['dbPort'] = setting['dbport']
    b.settings[id]['dbName'] = setting['dbname']
    b.settings[id]['fontSize'] = pSettings['Font Size']
    b.settings[id]['apFontSize'] = pSettings['AP Font Size']
    b.settings[id]['fontName'] = pSettings['Font Name']
    b.settings[id]['jsonPrettyPrint'] = setting.get('jsonPrettyPrint', False)

    return b.settings['id']


def verify_login(conf):
    setting = parseConfigFile()
    db = MySQLdb.connect(host=setting['dbhost'], user=setting['dbuser'], passwd=setting['dbpasswd'], db=setting['dbname'])
    cur = db.cursor()
    cur.execute("SELECT COUNT(1) FROM users WHERE username = %s;", [conf['username']])
    if cur.fetchone()[0]:
        cur.execute("SELECT password FROM users WHERE username = %s;", [conf['username']])
        for row in cur.fetchall():
            pwd_hash = row[0].replace("'", "").strip()
            #if (check_password_hash(pwd_hash, conf['password'])):
            if (conf['password'] == pwd_hash):
                proxy = set_dbproxy()
                print proxy
                return proxy;
            else:
                print "Password Error"
    else:
        print "Username Error"




def serve_user_login_form():
    b = Borg()
    resp = make_response(b.template_generator.serve_result('user_login', action_url=request.full_path), httplib.OK)
    resp.headers['Content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = "*"
    return resp

def handle_user_login_form():
    try:
        dict_form = request.form
        conf = {
            'username': dict_form['username'],
            'password': dict_form['password'],
            'jsonPrettyPrint': dict_form.get('jsonPrettyPrint', False) == 'on'
        }
        
        s = verify_login(conf)
        print session_id
        print id
        debug = ''
        '''debug += '{0}\nSession vars:\n{1}\nQuery string:\n'.format(
            'Successfully Logged In',
            json_serialize(s, session_id=s['session_id']))'''

        resp = make_response(debug + 'session_id={0}'.format(s['session_id']), httplib.OK)
        resp.headers['Content-type'] = 'text/plain'
        resp.headers['Access-Control-Allow-Origin'] = "*"
        return resp
    except KeyError as ex:
        return MissingParameterHTTPError(exception=ex)

class UserLoginAPI(Resource):
    # region Swagger Doc
    @swagger.operation(
        notes='Sets up the user session',
        nickname='user-login-post',
        responseClass=str.__name__,
        parameters=[
            {
                'name': 'body',
                "description": "The login settings for the user's session",
                "required": True,
                "allowMultiple": False,
                'type': UserLoginModel.__name__,
                'paramType': 'body'
            }
        ],
        responseMessages=[
            {
                'code': httplib.BAD_REQUEST,
                'message': 'The method is not callable without setting up a database connection'
            },
            {
                'code': httplib.BAD_REQUEST,
                'message': 'The provided parameters are invalid'
            }
        ]
    )
    # endregion
    def post(self):
        try:
            b = Borg()
            dict_form = request.get_json(silent=True)
            print "POSTING"
            print request.get_json
            print dict_form

            if dict_form is False or dict_form is None:
                raise MalformedJSONHTTPError(data=request.get_data())

            b.logger.info(dict_form)
            s = verify_login(dict_form)

            
            resp_dict = {'session_id': s['session_id'], 'message': 'Configuration successfully applied'}
            resp = make_response(encode(resp_dict), httplib.OK)
            resp.headers['Content-type'] = 'application/json'
            return resp

        except KeyError:
            return MissingParameterHTTPError()
