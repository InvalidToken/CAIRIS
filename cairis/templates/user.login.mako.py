# -*- coding:ascii -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
STOP_RENDERING = runtime.STOP_RENDERING
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 10
_modified_time = 1470834195.432941
_enable_loop = True
_template_filename = '/home/cairis/cai-ris/cairis/templates/user.login.mako'
_template_uri = 'user.login.mako'
_source_encoding = 'ascii'
_exports = []


def render_body(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        action_url = context.get('action_url', UNDEFINED)
        __M_writer = context.writer()
        __M_writer(u'<html>\n \t<!-- BOOTSTRAP STYLES-->\n    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />\n     <!-- FONTAWESOME STYLES-->\n    <link href="../dist/css/font-awesome.css" rel="stylesheet" />\n        <!-- CUSTOM STYLES-->\n    <link href="../dist/css/custom.css" rel="stylesheet" />\n\t  <!-- CUSTOM STYLES-->\n    <link href="../dist/css/login.css" rel="stylesheet" />\n     <!-- GOOGLE FONTS-->\n   <link href=\'http://fonts.googleapis.com/css?family=Open+Sans\' rel=\'stylesheet\' type=\'text/css\' />\n   <html>\n<body>\n\n<div id="background">\n    <img src="../images/homeBanner.jpg" class="stretch" alt="cairis" />\n\n<div class="container">\n    <div class="row">\n        <div class="col-md-4 col-md-offset-7">\n            <div class="panel panel-default">\n                <div class="panel-heading"> <strong class="">Login</strong>\n\n                </div>\n                <div class="panel-body">\n                    <form class="form-horizontal" role="form" action="')
        __M_writer(unicode(action_url))
        __M_writer(u'" method="POST" enctype="text/html">\n                        <div class="form-group">\n                            <label for="username" class="col-sm-3 control-label">Username</label>\n                            <div class="col-sm-9">\n                                <input class="form-control" id="username" placeholder="Email" required type="text">\n                            </div>\n                        </div>\n                        <div class="form-group">\n                            <label for="password" class="col-sm-3 control-label">Password</label>\n                            <div class="col-sm-9">\n                                <input class="form-control" id="password" placeholder="Password" required type="password">\n                            </div>\n                        </div>\n                        <div class="form-group">\n                            <div class="col-sm-10 col-sm-offset-2 checkbox">\n                                <label>\n                                    <input type="checkbox" id="jsonPrettyPrint" name="jsonPrettyPrint" />JSON pretty printing\n                                </label>\n                            </div>\n                        </div>\n                        <div class="form-group last">\n                            <div class="col-sm-offset-3 col-sm-9">\n                                <button type="submit" class="btn btn-success btn-sm">Sign in</button>\n                            </div>\n                        </div>\n                    </form>\n            </div>\n        </div>\n    </div>\n</div>\n</div>\n<script src="../static/plugins/jQuery/jQuery-2.1.3.min.js"></script>\n</body>\n</html>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


"""
__M_BEGIN_METADATA
{"source_encoding": "ascii", "line_map": {"16": 0, "24": 26, "30": 24, "22": 1, "23": 26}, "uri": "user.login.mako", "filename": "/home/cairis/cai-ris/cairis/templates/user.login.mako"}
__M_END_METADATA
"""
