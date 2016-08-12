<!DOCTYPE html>
 	<!-- BOOTSTRAP STYLES-->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
     <!-- FONTAWESOME STYLES-->
    <link href="../dist/css/font-awesome.css" rel="stylesheet" />
        <!-- CUSTOM STYLES-->
    <link href="../dist/css/custom.css" rel="stylesheet" />
	  <!-- CUSTOM STYLES-->
    <link href="../dist/css/login.css" rel="stylesheet" />
     <!-- GOOGLE FONTS-->
   <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />
   <html>
<body>

<div id="background">
    <img src="../images/homeBanner.jpg" class="stretch" alt="cairis" />

<div class="container">
    <div class="row">
        <div class="col-md-4 col-md-offset-7">
            <div class="panel panel-default">
                <div class="panel-heading"> <strong class="">Login</strong>

                </div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" action="${action_url}" method="POST" enctype="text/html">
                        <div class="form-group">
                            <label for="username" class="col-sm-3 control-label">Username</label>
                            <div class="col-sm-9">
                                <input class="form-control" name="username" id="username" placeholder="Email" required type="text">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="col-sm-3 control-label">Password</label>
                            <div class="col-sm-9">
                                <input class="form-control" id="password" name="password" placeholder="Password" required type="password">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-10 col-sm-offset-2 checkbox">
                                <label>
                                    <input type="checkbox" id="jsonPrettyPrint" name="jsonPrettyPrint" />JSON pretty printing
                                </label>
                            </div>
                        </div>
                        <div class="form-group last">
                            <div class="col-sm-offset-3 col-sm-9">
                                <button type="submit" class="btn btn-success btn-sm">Sign in</button>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
    </div>
</div>
</div>
<script src="../static/plugins/jQuery/jQuery-2.1.3.min.js"></script>
</body>
</html>
