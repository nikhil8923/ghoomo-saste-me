<?php
include("../include/db.php");

if (!isset($_GET['id'])) {
    die("Booking ID not specified.");
}

$id = intval($_GET['id']);

// Fetch existing booking data
$query = "SELECT * FROM bookings WHERE id = $id";
$result = mysqli_query($conn, $query);
if (!$result || mysqli_num_rows($result) == 0) {
    die("Booking not found.");
}
$row = mysqli_fetch_assoc($result);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect and sanitize form inputs
    $first_name = mysqli_real_escape_string($conn, $_POST['first_name']);
    $last_name = mysqli_real_escape_string($conn, $_POST['last_name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $num_travelers = intval($_POST['num_travelers']);
    $travel_date = mysqli_real_escape_string($conn, $_POST['travel_date']);
    $package_name = mysqli_real_escape_string($conn, $_POST['package_name']);
    $additional_notes = mysqli_real_escape_string($conn, $_POST['additional_notes']);
    $transaction_id = mysqli_real_escape_string($conn, $_POST['transaction_id']);
    $upi_id = mysqli_real_escape_string($conn, $_POST['upi_id']);
    $upi_mobile = mysqli_real_escape_string($conn, $_POST['upi_mobile']);

    $updateQuery = "UPDATE bookings SET 
        first_name='$first_name', last_name='$last_name', email='$email', phone='$phone',
        num_travelers=$num_travelers, travel_date='$travel_date', package_name='$package_name',
        additional_notes='$additional_notes', transaction_id='$transaction_id', upi_id='$upi_id',
        upi_mobile='$upi_mobile' WHERE id = $id";

    if (mysqli_query($conn, $updateQuery)) {
        header("Location: db-booking.php?msg=updated");
        exit();
    } else {
        echo "Update failed: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Edit Booking #<?php echo $id; ?></title>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
    <style>
        form {
            max-width: 600px;
            margin: 50px auto;
        }

        input,
        textarea {
            margin-bottom: 10px;
            width: 100%;
            padding: 8px;
        }

        button {
            width: 100%;
            padding: 10px;
        }
    </style>
</head>

<body>

    <div class="container">
        <h2 class="text-center">Edit Booking</h2>
        <form method="post" action="">
            <input type="text" name="first_name" placeholder="First Name" required value="<?php echo htmlspecialchars($row['first_name']); ?>" />
            <input type="text" name="last_name" placeholder="Last Name" required value="<?php echo htmlspecialchars($row['last_name']); ?>" />
            <input type="email" name="email" placeholder="Email" required value="<?php echo htmlspecialchars($row['email']); ?>" />
            <input type="text" name="phone" placeholder="Phone" required value="<?php echo htmlspecialchars($row['phone']); ?>" />
            <input type="number" name="num_travelers" placeholder="Number of Travelers" required value="<?php echo htmlspecialchars($row['num_travelers']); ?>" />
            <input type="date" name="travel_date" placeholder="Travel Date" required value="<?php echo htmlspecialchars($row['travel_date']); ?>" />
            <input type="text" name="package_name" placeholder="Package Name" required value="<?php echo htmlspecialchars($row['package_name']); ?>" />
            <textarea name="additional_notes" placeholder="Additional Notes"><?php echo htmlspecialchars($row['additional_notes']); ?></textarea>
            <input type="text" name="transaction_id" placeholder="Transaction ID" value="<?php echo htmlspecialchars($row['transaction_id']); ?>" />
            <input type="text" name="upi_id" placeholder="UPI ID" value="<?php echo htmlspecialchars($row['upi_id']); ?>" />
            <input type="text" name="upi_mobile" placeholder="UPI Mobile" value="<?php echo htmlspecialchars($row['upi_mobile']); ?>" />
            <button type="submit" class="btn btn-primary">Update Booking</button>
        </form>
    </div>

    <script src="assets/js/jquery-3.2.1.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>

</body>

</html>