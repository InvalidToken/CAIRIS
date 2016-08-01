<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Configuration | CAIRIS</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- Bootstrap 3.3.2 -->
    <link href="/static/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<div class="col-md-4 col-md-offset-3">
    <h1>Configuration</h1>

    <div>
        <form action="${action_url}" method="post" enctype="text/html" class="form-horizontal" role="form">
            <div class="form-group">
                <label for="username" class="control-label col-sm-2">Username:</label>
                <div class="col-sm-10">
                    <input type="text" id="username" name="username" class="form-control"/>
                </div>
            </div>
            <div class="form-group">
                <label for="password" class="control-label col-sm-2">Password:</label>
                <div class="col-sm-10">
                    <input type="password" id="password" name="password" class="form-control"/>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-10 col-sm-offset-2 checkbox">
                    <label>
                        <input type="checkbox" id="jsonPrettyPrint" name="jsonPrettyPrint" />JSON pretty printing
                    </label>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-10 col-sm-offset-2">
                    <input type="submit" class="btn btn-primary" />
                </div>
            </div>
        </form>
    </div>
</div>
<script src="/static/plugins/jQuery/jQuery-2.1.3.min.js"></script>
</body>
</html>
