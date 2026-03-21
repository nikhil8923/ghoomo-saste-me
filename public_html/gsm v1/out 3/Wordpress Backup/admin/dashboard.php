<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.php");
    exit();
}

require_once '../include/db.php';

// Total Contact Views (sum from two tables)
$contact_sql = "
    SELECT 
        (SELECT COUNT(*) FROM front_inquiries) + 
        (SELECT COUNT(*) FROM contact_messages) AS total_contacts
";
$contact_result = $conn->query($contact_sql);
$contact_data = $contact_result->fetch_assoc();
$today_views = $contact_data['total_contacts'] ?? 0;

// Total Travelers (sum from bookings)
$traveler_sql = "SELECT SUM(num_travelers) AS total_travelers FROM bookings";
$traveler_result = $conn->query($traveler_sql);
$traveler_data = $traveler_result->fetch_assoc();
$total_travelers = $traveler_data['total_travelers'] ?? 0;

// Total Users
$user_sql = "SELECT COUNT(*) AS total_users FROM service_questions";
$user_result = $conn->query($user_sql);
$user_data = $user_result->fetch_assoc();
$users = $user_data['total_users'] ?? 0;

// Total Enquiries
$enquiry_sql = "SELECT COUNT(*) AS total_enquiries FROM contact_messages";
$enquiry_result = $conn->query($enquiry_sql);
$enquiry_data = $enquiry_result->fetch_assoc();
$enquiries = $enquiry_data['total_enquiries'] ?? 0;
?>

<?php include("./header.php") ?>

<style>
    .db-info-list {
        min-height: 150px;
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .dashboard-stat-icon {
        width: 60px;
        height: 60px;
        font-size: 28px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dashboard-stat-content h4 {
        margin: 0 0 5px;
        font-weight: 600;
    }

    .dashboard-stat-content h5 {
        margin: 0;
        font-size: 22px;
        font-weight: 700;
    }
</style>

<div class="db-info-wrap">
    <div class="row">
        <!-- Total Views -->
        <div class="col-xl-3 col-sm-6">
            <div class="db-info-list">
                <div class="dashboard-stat-icon bg-blue">
                    <i class="far fa-chart-bar"></i>
                </div>
                <div class="dashboard-stat-content">
                    <h4>Total Views</h4>
                    <h5><?= htmlspecialchars($today_views) ?></h5>
                </div>
            </div>
        </div>

        <!-- Total Travelers -->
        <div class="col-xl-3 col-sm-6">
            <div class="db-info-list">
                <div class="dashboard-stat-icon bg-green">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="dashboard-stat-content">
                    <h4>Total Travelers</h4>
                    <h5><?= htmlspecialchars($total_travelers) ?></h5>
                </div>
            </div>
        </div>

        <!-- Total Users -->
        <div class="col-xl-3 col-sm-6">
            <div class="db-info-list">
                <div class="dashboard-stat-icon bg-purple">
                    <i class="fas fa-users"></i>
                </div>
                <div class="dashboard-stat-content">
                    <h4>Users</h4>
                    <h5><?= htmlspecialchars($users) ?></h5>
                </div>
            </div>
        </div>

        <!-- Total Enquiries -->
        <div class="col-xl-3 col-sm-6">
            <div class="db-info-list">
                <div class="dashboard-stat-icon bg-red">
                    <i class="far fa-envelope-open"></i>
                </div>
                <div class="dashboard-stat-content">
                    <h4>Total Enquiries</h4>
                    <h5><?= htmlspecialchars($enquiries) ?></h5>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Copyright -->
<div class="copyrights">
    Copyright © 2025 Codewebzz. All rights reserved.
</div>

<!-- Scripts -->
<script src="assets/js/jquery-3.2.1.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/canvasjs.min.js"></script>
<script src="assets/js/chart.js"></script>
<script src="assets/js/counterup.min.js"></script>
<script src="assets/js/jquery.slicknav.js"></script>
<script src="assets/js/dashboard-custom.js"></script>
</body>

</html>