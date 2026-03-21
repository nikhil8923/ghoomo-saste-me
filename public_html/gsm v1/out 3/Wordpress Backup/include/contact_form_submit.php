<?php
include('db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = mysqli_real_escape_string($conn, $_POST['name']);
    $email   = mysqli_real_escape_string($conn, $_POST['email']);
    $mobile  = mysqli_real_escape_string($conn, $_POST['mobile']);
    $message = mysqli_real_escape_string($conn, $_POST['message']);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email format.'); window.history.back();</script>";
        exit();
    }

    // Validate mobile
    if (!preg_match("/^[6-9]\d{9}$/", $mobile)) {
        echo "<script>alert('Invalid mobile number. It should be 10 digits starting with 6-9.'); window.history.back();</script>";
        exit();
    }

    $sql = "INSERT INTO contact_messages (name, email, mobile, message)
            VALUES ('$name', '$email', '$mobile', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Message submitted successfully!'); window.location.href='../contact.php';</script>";
        exit();
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
} else {
    echo "Invalid request.";
}
