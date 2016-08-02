# -*- coding:ascii -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
STOP_RENDERING = runtime.STOP_RENDERING
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 10
_modified_time = 1470044666.928425
_enable_loop = True
_template_filename = '/home/cairis/cairisw/cairis/templates/user.login.mako'
_template_uri = 'user.login.mako'
_source_encoding = 'ascii'
_exports = []


def render_body(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        action_url = context.get('action_url', UNDEFINED)
        __M_writer = context.writer()
        __M_writer(u'<!DOCTYPE html>\n<html>\n<head lang="en">\n    <meta charset="UTF-8">\n    <title>Login | CAIRIS</title>\n    <meta content=\'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\' name=\'viewport\'>\n    <!-- Bootstrap 3.3.2 -->\n    <link href="/static/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>\n</head>\n<body>\n<div class="col-md-4 col-md-offset-3">\n    <h1>Configuration</h1>\n\n    <div>\n        <form action="')
        __M_writer(unicode(action_url))
        __M_writer(u'" method="post" enctype="text/html" class="form-horizontal" role="form">\n            <div class="form-group">\n                <label for="username" class="control-label col-sm-2">Username:</label>\n                <div class="col-sm-10">\n                    <input type="text" id="username" name="username" class="form-control"/>\n                </div>\n            </div>\n            <div class="form-group">\n                <label for="password" class="control-label col-sm-2">Password:</label>\n                <div class="col-sm-10">\n                    <input type="password" id="password" name="password" class="form-control"/>\n                </div>\n            </div>\n            <div class="form-group">\n                <div class="col-sm-10 col-sm-offset-2 checkbox">\n                    <label>\n                        <input type="checkbox" id="jsonPrettyPrint" name="jsonPrettyPrint" />JSON pretty printing\n                    </label>\n                </div>\n            </div>\n            <div class="form-group">\n                <div class="col-sm-10 col-sm-offset-2">\n                    <input type="submit" class="btn btn-primary" />\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n<script src="/static/plugins/jQuery/jQuery-2.1.3.min.js"></script>\n</body>\n</html>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


"""
__M_BEGIN_METADATA
{"source_encoding": "ascii", "line_map": {"16": 0, "24": 15, "30": 24, "22": 1, "23": 15}, "uri": "user.login.mako", "filename": "/home/cairis/cai-ris/cairis/templates/user.login.mako"}
__M_END_METADATA
"""
