<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// DB Connection
$conn = new mysqli("localhost", "root", "", "ghoomosasteme");
if ($conn->connect_error) {
    die("<script>
        alert('❌ Connection failed: " . addslashes($conn->connect_error) . "');
        window.location.href = 'booking.php';
    </script>");
}

// Get POST Data
$firstName = $_POST['firstname_booking'];
$lastName = $_POST['lastname_booking'];
$email = $_POST['email_booking'];
$phone = $_POST['phone_booking'];
$numTravelers = $_POST['num_travelers'];
$travelDate = $_POST['travel_date'];
$packageName = $_POST['package_name'];
$additionalNotes = $_POST['additional_notes'];
$transactionId = $_POST['transaction_id'];
$upiId = $_POST['upi_id'];
$upiMobile = $_POST['upi_mobile'];

// Check Duplicate Transaction ID
$check = $conn->prepare("SELECT id FROM bookings WHERE transaction_id = ?");
$check->bind_param("s", $transactionId);
$check->execute();
$check->store_result();
if ($check->num_rows > 0) {
    $check->close();
    $conn->close();
    echo "<script>
        alert('❌ Duplicate transaction ID found. Please check your payment details.');
        window.location.href = '../booking.php';
    </script>";
    exit;
}
$check->close();

// Insert into DB
$stmt = $conn->prepare("INSERT INTO bookings (first_name, last_name, email, phone, num_travelers, travel_date, package_name, additional_notes, transaction_id, upi_id, upi_mobile)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("ssssissssss", $firstName, $lastName, $email, $phone, $numTravelers, $travelDate, $packageName, $additionalNotes, $transactionId, $upiId, $upiMobile);

if ($stmt->execute()) {
    echo "<script>
        alert('✅ Booking submitted successfully!');
        window.location.href = '../booking.php';
    </script>";
} else {
    echo "<script>
        alert('❌ Insert failed: " . addslashes($stmt->error) . "');
        window.location.href = '../booking.php';
    </script>";
}

$stmt->close();
$conn->close();
