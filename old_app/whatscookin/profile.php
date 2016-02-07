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
    header("Location: index.php");
  }
  
  
?>
<!--[if IE 8]> 
<html lang="en" class="ie8 no-js">
  <![endif]-->
<!--[if IE 9]> 
<html lang="en" class="ie9 no-js">
  <![endif]-->
  <!--[if !IE]><!-->
  <html lang="en">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->
    <head>
      <meta charset="utf-8" />
      <title>What's Cookin | Profile</title>
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
      <link href="../theme/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
      <link href="../theme/assets/global/plugins/fancybox/source/jquery.fancybox.css" rel="stylesheet" type="text/css" />
      <link href="../theme/assets/global/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet" type="text/css" />
      <link href="../theme/assets/global/plugins/typeahead/typeahead.css" rel="stylesheet" type="text/css" />
      <link href="../theme/assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.css" rel="stylesheet" type="text/css" />
      <link href="../theme/assets/global/plugins/ion.rangeslider/css/ion.rangeSlider.skinFlat.css" rel="stylesheet" type="text/css" />
      <link href="../theme/assets/global/plugins/jquery-notific8/jquery.notific8.min.css" rel="stylesheet" type="text/css" />
      <!-- END PAGE LEVEL PLUGINS -->
      <!-- BEGIN PAGE LEVEL STYLES -->
      <link href="../theme/assets/pages/css/profile.min.css" rel="stylesheet" type="text/css" />
      <!-- END PAGE LEVEL STYLES -->
      <!-- BEGIN THEME GLOBAL STYLES -->
      <link href="../theme/assets/global/css/components-rounded.min.css" rel="stylesheet" id="style_components" type="text/css" />
      <link href="../theme/assets/global/css/plugins.min.css" rel="stylesheet" type="text/css" />
      <!-- END THEME GLOBAL STYLES -->
      <!-- BEGIN PAGE LEVEL STYLES -->
      <link href="../theme/assets/pages/css/about.min.css" rel="stylesheet" type="text/css" />
      <link href="../theme/assets/pages/css/search.min.css" rel="stylesheet" type="text/css" />
      <link rel="stylesheet" href="css/star-rating.css" media="all" rel="stylesheet" type="text/css"/>
      <!-- END PAGE LEVEL STYLES -->
      <!-- BEGIN THEME LAYOUT STYLES -->
      <link href="../theme/assets/layouts/layout3/css/layout.min.css" rel="stylesheet" type="text/css" />
      <link href="../theme/assets/layouts/layout3/css/themes/default.min.css" rel="stylesheet" type="text/css" id="style_color" />
      <link href="../theme/assets/layouts/layout3/css/custom.min.css" rel="stylesheet" type="text/css" />
      <!-- END THEME LAYOUT STYLES -->
      <link rel="shortcut icon" href="favicon.ico" />
    </head>
    <!-- END HEAD -->
    <body class="page-container-bg-solid page-boxed" onload="getRecipesForUser()">
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
            <!-- DOC: Apply "hor-menu-light" class after the "hor-menu" class below to have a horizontal menu with white background -->
            <!-- DOC: Remove data-hover="dropdown" and data-close-others="true" attributes below to disable the dropdown opening on mouse hover -->
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
                <li class="menu-dropdown classic-menu-dropdown">
                  <a href="contact.php">
                  <i class="fa fa-phone-square"></i> Contact
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
              <!-- BEGIN PAGE BREADCRUMBS -->
              <ul class="page-breadcrumb breadcrumb">
                <li>
                  <a href="index.php"> Home</a>
                  <i class="fa fa-circle"></i>
                </li>
                <li>
                  <span>Profile</span>
                </li>
              </ul>
              <!-- END PAGE BREADCRUMBS -->
              <!-- BEGIN PAGE CONTENT INNER -->
              <div class="page-content-inner">
                <div class="row">
                  <div class="col-md-12">
                      <!-- BEGIN PROFILE SIDEBAR -->
                      <div class="profile-sidebar">
                          <!-- PORTLET MAIN -->
                          <div class="portlet light profile-sidebar-portlet ">
                              <!-- SIDEBAR USERPIC -->
                              <div class="profile-userpic">
                                  <img src="images/icon-user-default.png" class="img-responsive" alt=""> </div>
                              <!-- END SIDEBAR USERPIC -->
                              <!-- SIDEBAR USER TITLE -->
                              <div class="profile-usertitle">
                                  <div class="profile-usertitle-name"> <?php echo $_user->getName();?> </div>
                                  <div class="profile-usertitle-job"> <?php echo $_user->getEmail();?> </div>
                              </div>
                              <!-- END SIDEBAR USER TITLE -->
                              <!-- SIDEBAR MENU -->
                              <div class="profile-usermenu">
                                  <ul class="nav">
                                      <li class="active">
                                          <a href="#" class="display_recipe_portlet" onclick="return false;">
                                              <i class="fa fa-star"></i> Saved Recipes </a>
                                      </li>
                                      <li>
                                          <a href="#" class="display_grocery_portlet" onclick="return false;">
                                              <i class="fa fa-list-alt"></i> Grocery List </a>
                                      </li>
                                  </ul>
                              </div>
                              <!-- END MENU -->
                          </div>
                          <!-- END PORTLET MAIN -->
                      </div>
                      <!-- END BEGIN PROFILE SIDEBAR -->
                      <!-- BEGIN PROFILE CONTENT -->
                      <div class="profile-content">
                          <div class="row" id="recipeRow">
                              <div class="col-md-8">
                                  <!-- BEGIN PORTLET -->
                                  <div class="portlet light " id="recipePortlet">
                                      <div class="portlet-title">
                                          <div class="caption caption-md">
                                              <span class="caption-subject font-blue-madison bold uppercase">Saved Recipes</span>
                                          </div>
                                      </div>
                                      <div class="portlet-body">
                                          <div class="scroller" style="height: 305px;" data-always-visible="1" data-rail-visible1="0" data-handle-color="#D7DCE2">
                                              <div class="general-item-list" id="userRecipeContent"></div>
                                          </div>
                                      </div>
                                  </div>
                                  <!-- END PORTLET -->
                              </div>
                          </div>
                          <div class="row" id="groceryRow" style="display: none;">
                              <div class="col-md-8">
                                  <!-- BEGIN PORTLET -->
                                  <div class="portlet light " id="groceryPortlet">
                                      <div class="portlet-title">
                                          <div class="caption caption-md">
                                              <span class="caption-subject font-blue-madison bold uppercase">Grocery List</span>
                                          </div>
                                      </div>
                                      <div class="portlet-body">
                                          <div class="scroller" style="height: 305px;" data-always-visible="1" data-rail-visible1="0" data-handle-color="#D7DCE2">
                                              <div class="general-item-list" id="userGroceryContent"></div>
                                          </div>
                                      </div>
                                  </div>
                                  <!-- END PORTLET -->
                              </div>
                          </div>
                      </div>
                      <!-- END PROFILE CONTENT -->
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
      <input type="hidden" id="isLoggedIn" value="<?php echo $isLoggedIn;?>" />
      <a id="notifier" href="javascript:;" style="display: none;"></a>
      <!-- Modal Button -->
      <a style="display: none;" id="modalBtn" class="btn green btn-outline sbold" data-toggle="modal" href="#draggable"></a>
      <!-- BEGIN MODALS -->
      <div class="modal fade draggable-modal" id="draggable" tabindex="-1" role="basic" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
              <h3 class="modal-title">Recipe Information</h3>
            </div>
            <div class="modal-body" id="modalBodyContent">  </div>
            <div class="modal-footer">
              <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- END MODALS -->
      <!-- BEGIN FOOTER -->
      <!-- BEGIN PRE-FOOTER -->
      <div class="page-prefooter">
        <div class="container">
          <div class="row">
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
                <a href="mailto:devglen@icloud.com">support@brogrammers.com</a>
              </address>
            </div>
          </div>
        </div>
      </div>
      <!-- END PRE-FOOTER -->
      <!-- BEGIN INNER FOOTER -->
      <div class="page-footer">
        <div class="container">
          2015 &copy; Brogrammers Inc.
        </div>
      </div>
      <div class="scroll-to-top">
        <i class="icon-arrow-up"></i>
      </div>
      <!-- END INNER FOOTER -->
      <!-- END FOOTER -->
      <!--[if lt IE 9]>
      <script src="../theme/assets/global/plugins/respond.min.js"></script>
      <script src="../theme/assets/global/plugins/excanvas.min.js"></script> 
      <![endif]-->
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
      <script src="../theme/assets/global/plugins/bootstrap-tagsinput/bootstrap-tagsinput.min.js" type="text/javascript"></script>
      <script src="../theme/assets/global/plugins/typeahead/handlebars.min.js" type="text/javascript"></script>
      <script src="../theme/assets/global/plugins/typeahead/typeahead.bundle.min.js" type="text/javascript"></script>
      <script src="../theme/assets/global/plugins/ion.rangeslider/js/ion.rangeSlider.min.js" type="text/javascript"></script>
      <script src="../theme/assets/global/plugins/jquery-notific8/jquery.notific8.min.js" type="text/javascript"></script>
      <!-- END PAGE LEVEL PLUGINS -->
      <!-- BEGIN THEME GLOBAL SCRIPTS -->
      <script src="../theme/assets/global/scripts/app.min.js" type="text/javascript"></script>
      <!-- END THEME GLOBAL SCRIPTS -->
      <!-- BEGIN PAGE LEVEL SCRIPTS -->
      <script src="../theme/assets/pages/scripts/components-bootstrap-tagsinput.min.js" type="text/javascript"></script>
      <script src="../theme/assets/global/plugins/bootstrap-confirmation/bootstrap-confirmation.min.js" type="text/javascript"></script>
      <!-- END PAGE LEVEL SCRIPTS -->
      <!-- BEGIN PAGE LEVEL SCRIPTS -->
      <script src="../theme/assets/pages/scripts/profile.min.js" type="text/javascript"></script>
      <script src="../theme/assets/pages/scripts/timeline.min.js" type="text/javascript"></script>
      <!-- END PAGE LEVEL SCRIPTS -->
      <!-- BEGIN THEME LAYOUT SCRIPTS -->
      <script src="../theme/assets/layouts/layout3/scripts/layout.min.js" type="text/javascript"></script>
      <script src="../theme/assets/layouts/layout3/scripts/demo.min.js" type="text/javascript"></script>
      <script src="../theme/assets/layouts/global/scripts/quick-sidebar.min.js" type="text/javascript"></script>
      <!-- END THEME LAYOUT SCRIPTS -->
      <script src="js/custom_script.js" type="text/javascript"></script>
      <script type="text/javascript">
        $(document).ready(function(){
          
        });
      </script>
    </body>
  </html>