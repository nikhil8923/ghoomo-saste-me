<!doctype html>
<html lang="en">


<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- favicon -->
    <link rel="icon" type="image/png" href="../assets/images/favicon.png">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css" media="all">
    <!-- Fonts Awesome CSS -->
    <link rel="stylesheet" type="text/css" href="assets/css/all.min.css">
    <!-- google fonts -->
    <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&amp;family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&amp;display=swap"
        rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>ghoomosasteme </title>
</head>

<body>

    <!-- start Container Wrapper -->
    <div id="container-wrapper">
        <!-- Dashboard -->
        <div id="dashboard" class="dashboard-container">
            <div class="dashboard-header sticky-header">
                <div class="content-left  logo-section pull-left">
                    <h1><a href="../index.php"><img width="50px" src="assets/images/logo.png" alt=""></a></h1>
                </div>
                <div class="heaer-content-right pull-right">
                    <div class="search-field">
                        <form>
                            <div class="form-group">
                                <input type="text" class="form-control" id="search" placeholder="Search Now">
                                <a href="#"><span class="search_btn"><i class="fa fa-search"
                                            aria-hidden="true"></i></span></a>
                            </div>
                        </form>
                    </div>


                    <div class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <div class="dropdown-item profile-sec">
                                <img src="assets/images/logo.png" alt="">
                                <span>Admin </span>
                                <i class="fas fa-caret-down"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="dashboard-navigation">
                <!-- Responsive Navigation Trigger -->
                <div id="dashboard-Navigation" class="slick-nav"></div>
                <div id="navigation" class="navigation-container">
                    <ul>
                        <li class="active-menu"><a href="dashboard.php"><i class="far fa-chart-bar"></i> Dashboard</a>
                        </li>
                        <li><a><i class="fas fa-user"></i>Users</a>
                            <ul>
                                <li>
                                    <a href="user.php">Front Form Client</a>
                                </li>
                                <li>
                                    <a href="user2.php">Client query</a>
                                </li>
                                <li>
                                    <a href="user3.php">Contact page User</a>
                                </li>

                            </ul>
                        </li>
                        <!-- <li><a href="db-add-package.php"><i class="fas fa-umbrella-beach"></i>packages</a></li> -->
                        <li>
                            <a><i class="fas fa-hotel"></i></i>packages</a>
                            <ul>
                                <li><a href="db-add-package.php">Add Package</a></li>
                                <li><a href="db-package-list.php">Package List</a></li>
                            </ul>
                        </li>

                        <li>
                            <a><i class="fas fa-hotel"></i></i>Post</a>
                            <ul>
                                <li><a href="recentpost.php">Add Post</a></li>
                                <li><a href="recent-post-list.php">List Post</a></li>
                            </ul>
                        </li>

                        <li>
                            <a><i class="fas fa-hotel"></i></i>Gallery</a>
                            <ul>
                                <li><a href="db-add-gallery.php">Add Gallery</a></li>
                                <li><a href="gellery-list.php">List Gallery</a></li>
                            </ul>
                        </li>

                        <li>
                            <a><i class="fas fa-hotel"></i></i>Host</a>
                            <ul>
                                <li><a href="./db-add-host.php">Add Host</a></li>
                                <li><a href="./db-host-list.php">List Host</a></li>
                            </ul>
                        </li>

                        <li >
                            <a><i class="fas fa-hotel"></i></i>Testimonial</a>
                            <ul>
                                <li><a href="./db-add-testimonial.php">Add Testimonial</a></li>
                                <li><a href="./list-testimonial.php">List Testimonial</a></li>
                            </ul>
                        </li>

                        <li  class="active-menu"><a href="db-booking.php"><i class="fas fa-ticket-alt"></i> Booking & Enquiry</a></li>


                        <li><a href="login.php"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                    </ul>
                </div>
            </div>