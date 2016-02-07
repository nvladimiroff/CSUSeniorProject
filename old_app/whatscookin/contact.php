<!DOCTYPE html>
	<?php
  include_once "../pre.php";
  
  if (is_object($_user)) {
    $displayName = $_user->firstName;
    $loginDisplay = "Log Out";
    $loginUrl = "logout.php";
    $isLoggedIn = "true";
  } else {
    $displayName = "Guest";
    $loginDisplay = "Log In";
    $loginUrl = "login.php";
    $isLoggedIn = "false";
  }
  
  
?>
<html lang="en">
    <!-- BEGIN HEAD -->

    <head>
        <meta charset="utf-8" />
        <title>What's Cookin | Contact Us</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
        <link href="../theme/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="../theme/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
        <link href="../theme/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="../theme/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
        <link href="../theme/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL STYLES -->
        <link href="../theme/assets/global/css/components-rounded.min.css" rel="stylesheet" id="style_components" type="text/css" />
        <link href="../theme/assets/global/css/plugins.min.css" rel="stylesheet" type="text/css" />
        <!-- END THEME GLOBAL STYLES -->
        <!-- BEGIN PAGE LEVEL STYLES -->
        <link href="../theme/assets/pages/css/contact.min.css" rel="stylesheet" type="text/css" />
        <!-- END PAGE LEVEL STYLES -->
        <!-- BEGIN THEME LAYOUT STYLES -->
        <link href="../theme/assets/layouts/layout3/css/layout.min.css" rel="stylesheet" type="text/css" />
        <link href="../theme/assets/layouts/layout3/css/themes/default.min.css" rel="stylesheet" type="text/css" id="style_color" />
        <link href="../theme/assets/layouts/layout3/css/custom.min.css" rel="stylesheet" type="text/css" />
        <!-- END THEME LAYOUT STYLES -->
        <link rel="shortcut icon" href="favicon.ico" /> </head>
    <!-- END HEAD -->

    <body class="page-container-bg-solid page-boxed">
        <!-- BEGIN HEADER -->
        <div class="page-header">
            <!-- BEGIN HEADER TOP -->
            <div class="page-header-top">
                <div class="container">
                    <!-- BEGIN LOGO -->
                    <div class="page-logo">
                        <a href="index.php">
                <img src="images/logo.png" alt="logo" class="logo-default" width="150" height="80" style="position: relative; top: -40px; left: -50px" />
                        </a>
                    </div>
                    <!-- END LOGO -->
                    <!-- BEGIN RESPONSIVE MENU TOGGLER -->
                    <a href="javascript:;" class="menu-toggler"></a>
                    <!-- END RESPONSIVE MENU TOGGLER -->
                    <!-- BEGIN TOP NAVIGATION MENU -->
              <div class="top-menu">
                <ul class="nav navbar-nav pull-right">
                  <!-- BEGIN USER LOGIN DROPDOWN -->
                  <li class="dropdown dropdown-user dropdown-dark">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
			<img alt="" class="img-circle" src="images/icon-user-default.png">
			<span class="username username-hide-mobile"><?php echo $displayName;?></span>
		    </a>
		    <ul class="dropdown-menu dropdown-menu-default">
		  <?php
		    if (is_object($_user)):?>  
		      <li>
			<a href="profile.php">
			<i class="icon-user"></i> My Profile </a>
		      </li>
		      <li class="divider"> </li>
		  <?php endif; ?>
		      <li>
			<a href="<?php echo $loginUrl; ?>">
			<i class="icon-key"></i> <?php echo $loginDisplay; ?> </a>
                      </li>
                    </ul>
                  </li>
                  <!-- END USER LOGIN DROPDOWN -->
                </ul>
              </div>
                    <!-- END TOP NAVIGATION MENU -->
                </div>
            </div>
            <!-- END HEADER TOP -->
            <!-- BEGIN HEADER MENU -->
            <div class="page-header-menu">
                <div class="container">
                    <!-- BEGIN MEGA MENU -->
              <div class="hor-menu hor-menu-light ">
                <ul class="nav navbar-nav">
                  <li class="menu-dropdown classic-menu-dropdown">
                    <a href="index.php"> <i class="icon-home"></i> Home
                      <span class="arrow"></span>
                    </a>
                  </li>
                  <li class="menu-dropdown classic-menu-dropdown ">
                    <a href="about.php"> <i class="fa fa-group"></i> About Us
                    <span class="arrow"></span>
                    </a>
                  </li>
                  <li class="menu-dropdown classic-menu-dropdown active">
                    <a href="contact.php">
                    <i class="fa fa-phone-square"></i> Contact Us
                    <span class="arrow"></span>
                    </a>
                  </li>
                </ul>
              </div>
                    <!-- END MEGA MENU -->
                </div>
            </div>
            <!-- END HEADER MENU -->
        </div>
        <!-- END HEADER -->
        <!-- BEGIN CONTAINER -->
        <div class="page-container">
            <!-- BEGIN CONTENT -->
            <div class="page-content-wrapper">
                <!-- BEGIN CONTENT BODY -->
                <!-- BEGIN PAGE CONTENT BODY -->
                <div class="page-content">
                    <div class="container">
                        <!-- BEGIN PAGE CONTENT INNER -->
                        <div class="page-content-inner">
                            <div class="c-content-contact-1 c-opt-1">
                                <div class="row" data-auto-height=".c-height">
                                    <div class="col-lg-8 col-md-6 c-desktop"></div>
                                    <div class="col-lg-4 col-md-6">
                                        <div class="c-body">
                                            <div class="c-section">
                                                <h3>Brogrammers Inc.</h3>
                                            </div>
                                            <div class="c-section">
                                                <div class="c-content-label uppercase bg-blue">Address</div>
                                                <p>2121 Euclid Avenue,
                                                    <br/>Cleveland, Ohio
                                                    <br/>44115-2214</p>
													  
                                            </div>
                                            <div class="c-section">
                                                <div class="c-content-label uppercase bg-blue">Contacts</div>
                                                <p>
                                                    <strong>T</strong> 216 555 4564<br/>
                                                    <strong>F</strong> 216 555 4565</p>
                                            </div>
                                            <div class="c-section">
                                                <div class="c-content-label uppercase bg-blue">Social</div>
                                                <br/>
                                                <ul class="c-content-iconlist-1 ">
                                                    <li>
                                                        <a href="#">
                                                            <i class="fa fa-twitter"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i class="fa fa-facebook"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i class="fa fa-linkedin"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="gmapbg" class="c-content-contact-1-gmap" style="height: 615px;"></div>
                            </div>
                            <div class="c-content-feedback-1 c-option-1">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="c-container bg-green">
                                            <div class="c-content-title-1 c-inverse">
                                                <h3 class="uppercase">Need to know more?</h3>
                                                <div class="c-line-left"></div>
                                                <p class="c-font-lowercase">Try visiting our FAQ page to learn more.</p>
                                                <a href="#"><button class="btn grey-cararra font-dark">Learn More</button></a>
                                            </div>
                                        </div>
                                        <div class="c-container bg-grey-steel">
                                            <div class="c-content-title-1">
                                                <h3 class="uppercase">Have a question?</h3>
                                                <div class="c-line-left bg-dark"></div>
                                                <form action="#">
                                                    <div class="input-group input-group-lg c-square">
                                                        <input type="text" class="form-control c-square" placeholder="Ask a question" />
                                                        <span class="input-group-btn">
                                                            <button class="btn uppercase" type="button">Go!</button>
                                                        </span>
                                                    </div>
                                                </form>
                                                <p>Ask away and let our dedicated customer service help you get your questions answered!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="c-contact">
                                            <div class="c-content-title-1">
                                                <h3 class="uppercase">Keep in touch</h3>
                                                <div class="c-line-left bg-dark"></div>
                                                <p class="c-font-lowercase">Our helpline is always open to receive any inquiry or feedback. Please feel free to drop us an email from the form below and we will get back to you as soon as we can.</p>
                                            </div>
                                            <form method="post" action="contactus.php">
                                                <div class="form-group">
                                                    <input type="text" name="client_name" placeholder="Your Name" class="form-control input-md"> </div>
                                                <div class="form-group">
                                                    <input type="email" name="client_email" placeholder="Your Email" class="form-control input-md"> </div>
                                                <div class="form-group">
                                                    <input type="text" name="client_phone" placeholder="Contact Phone" class="form-control input-md"> </div>
                                                <div class="form-group">
                                                    <textarea rows="8" name="client_message" placeholder="Write comment here ..." class="form-control input-md"></textarea>
                                                </div>
                                                <input type="submit" class="btn grey"/>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- END PAGE CONTENT INNER -->
                    </div>
                </div>
                <!-- END PAGE CONTENT BODY -->
                <!-- END CONTENT BODY -->
            </div>
            <!-- END CONTENT -->
        </div>
        <!-- END CONTAINER -->
        <!-- BEGIN FOOTER -->
        <!-- BEGIN PRE-FOOTER -->
        <div class="page-prefooter">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-sm-6 col-xs-12 footer-block">
                        <h2>About</h2>
                        <p> Bros. before those! (other sites)</p>
                    </div>
                    <div class="col-md-3 col-sm-6 col-xs-12 footer-block">
                        <h2>Follow Us On</h2>
                        <ul class="social-icons">
                            <li>
                                <a href="javascript:;" data-original-title="twitter" class="twitter"></a>
                            </li>
                            <li>
                                <a href="javascript:;" data-original-title="googleplus" class="googleplus"></a>
                            </li>
                            <li>
                                <a href="javascript:;" data-original-title="linkedin" class="linkedin"></a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-3 col-sm-6 col-xs-12 footer-block">
                        <h2>Contacts</h2>
                        <address class="margin-bottom-40"> Phone: 216 555 4564
                            <br> Email:
                            <a href="mailto:support@brogrammers.com">support@brogrammers.com</a>
                        </address>
                    </div>
                </div>
            </div>
        </div>
        <!-- END PRE-FOOTER -->
        <!-- BEGIN INNER FOOTER -->
        <div class="page-footer">
            <div class="container"> 2015 © Brogrammers Inc.
            </div>
        </div>
        <div class="scroll-to-top">
            <i class="icon-arrow-up"></i>
        </div>
        <!-- END INNER FOOTER -->
        <!-- END FOOTER -->
        <!-- BEGIN CORE PLUGINS -->
        <script src="../theme/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
        <script src="../theme/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="../theme/assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>
        <script src="../theme/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
        <script src="../theme/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
        <script src="../theme/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
        <script src="../theme/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
        <script src="../theme/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
        <!-- END CORE PLUGINS -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>
        <script src="../theme/assets/global/plugins/gmaps/gmaps.min.js" type="text/javascript"></script>
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
        <script src="../theme/assets/global/scripts/app.min.js" type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->
        <!-- BEGIN PAGE LEVEL SCRIPTS -->
        <script src="js/contact.min.js" type="text/javascript"></script>
        <!-- END PAGE LEVEL SCRIPTS -->
        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <script src="../theme/assets/layouts/layout3/scripts/layout.min.js" type="text/javascript"></script>
        <script src="../theme/assets/layouts/layout3/scripts/demo.min.js" type="text/javascript"></script>
        <script src="../theme/assets/layouts/global/scripts/quick-sidebar.min.js" type="text/javascript"></script>
        <!-- END THEME LAYOUT SCRIPTS -->
    </body>

</html>