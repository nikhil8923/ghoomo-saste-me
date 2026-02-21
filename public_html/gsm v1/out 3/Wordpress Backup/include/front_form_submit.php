<?php
include('db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $destination = mysqli_real_escape_string($conn, $_POST['destination']);
    $pax = intval($_POST['pax']);
    $checkin = mysqli_real_escape_string($conn, $_POST['checkin']);
    $checkout = mysqli_real_escape_string($conn, $_POST['checkout']);
    $mobile = mysqli_real_escape_string($conn, $_POST['mobile']);

    // Validate mobile number - must be 10 digits
    if (!preg_match("/^[6-9]\d{9}$/", $mobile)) {
        echo "<script>alert('Invalid mobile number. It should be 10 digits starting with 6-9.');window.history.back();</script>";
        exit();
    }

    $sql = "INSERT INTO front_inquiries (destination, pax, checkin_date, checkout_date, mobile)
            VALUES ('$destination', '$pax', '$checkin', '$checkout', '$mobile')";

    if ($conn->query($sql) === TRUE) {
        header("Location: ../index.php?status=success");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
} else {
    echo "Invalid request.";
}
