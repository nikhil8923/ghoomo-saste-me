<?php include("./header.php"); ?>
<?php include("../include/db.php"); // Database connection 
?>

<div class="db-info-wrap db-booking">
    <div class="dashboard-box table-opp-color-box">
        <h4>Recent Bookings</h4>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Travelers</th>
                        <th>Travel Date</th>
                        <th>Package</th>
                        <th>Notes</th>
                        <th>Transaction ID</th>
                        <th>UPI ID</th>
                        <th>UPI Mobile</th>
                        <th>Booking Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $query = "SELECT * FROM bookings ORDER BY booking_time DESC";
                    $result = mysqli_query($conn, $query);

                    if ($result && mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            echo "<tr>";
                            echo "<td>{$row['id']}</td>";
                            echo "<td>" . htmlspecialchars($row['first_name']) . "</td>";
                            echo "<td>" . htmlspecialchars($row['last_name']) . "</td>";
                            echo "<td>" . htmlspecialchars($row['email']) . "</td>";
                            echo "<td>" . htmlspecialchars($row['phone']) . "</td>";
                            echo "<td>" . htmlspecialchars($row['num_travelers']) . "</td>";
                            echo "<td>" . htmlspecialchars($row['travel_date']) . "</td>";
                            echo "<td>" . htmlspecialchars($row['package_name']) . "</td>";
                            echo "<td>" . htmlspecialchars($row['additional_notes']) . "</td>";
                            echo "<td>" . htmlspecialchars($row['transaction_id']) . "</td>";
                            echo "<td>" . htmlspecialchars($row['upi_id']) . "</td>";
                            echo "<td>" . htmlspecialchars($row['upi_mobile']) . "</td>";
                            echo "<td>" . htmlspecialchars($row['booking_time']) . "</td>";
                            echo "<td class='d-flex' style='gap:10px'>
                                    <a href='edit-booking.php?id={$row['id']}' class='badge badge-success text-light'><i class='far fa-edit'></i></a>
                                    <a href='delete-booking.php?id={$row['id']}' class='badge badge-danger text-light' onclick='return confirm(\"Are you sure you want to delete this booking?\")'><i class='far fa-trash-alt'></i></a>
                                  </td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='14'>No bookings found.</td></tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="copyrights">
    Copyright © 2025 Codewebzz. All rights reserved.
</div>

<script src="assets/js/jquery-3.2.1.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/dashboard-custom.js"></script>
</body>

</html>