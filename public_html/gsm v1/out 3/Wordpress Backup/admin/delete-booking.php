<?php
include("../include/db.php");

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $query = "DELETE FROM bookings WHERE id = $id";
    if (mysqli_query($conn, $query)) {
        header("Location: db-booking.php?msg=deleted");
        exit();
    } else {
        echo "Error deleting booking: " . mysqli_error($conn);
    }
} else {
    echo "Invalid request.";
}
