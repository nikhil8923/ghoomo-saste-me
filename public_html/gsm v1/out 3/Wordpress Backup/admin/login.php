<?php
session_start();

// If already logged in, redirect to dashboard
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header("Location: dashboard.php");
    exit();
}

// Check login form submission
if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Replace these with your actual database credentials
    $valid_username = "admin"; // Change this to your admin username
    $valid_password = "admin123"; // Change this to your admin password

    if ($username === $valid_username && $password === $valid_password) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        header("Location: dashboard.php");
        exit();
    } else {
        $error = "Invalid username or password!";
    }
}
?>

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
    <title>Ghoomo saste me </title>
    <style>

    </style>
</head>

<body>
    <div class="login-page" style="background-image: repeating-radial-gradient(black,#FFDE5B 1%);">
        <div class="login-from-wrap main">
            <form class="login-from" method="POST" action="login.php">
                <h1 class="site-title">
                    <a href="#">
                        <img src="assets/images/logo.png" width="100px" alt="">
                    </a>
                </h1>
                <?php if (isset($error)) {
                    echo "<p style='color:red;'>$error</p>";
                } ?>
                <div class="form-group">
                    <label>User Name</label>
                    <input type="text" name="username" class="validate" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="password" class="validate" required>
                </div>
                <div class="form-group">
                    <button class="button-primary" type="submit" name="login">Login</button>
                </div>
            </form>
        </div>
    </div>

    <!-- *Scripts* -->
    <script src="assets/js/jquery-3.2.1.min.js"></script>
    <script src="../../../../cdn.jsdelivr.net/npm/popper.js%401.16.0/dist/umd/popper.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/canvasjs.min.js"></script>
    <script src="assets/js/counterup.min.js"></script>
    <script src="assets/js/jquery.slicknav.js"></script>
    <script src="assets/js/dashboard-custom.js"></script>
</body>

</html>