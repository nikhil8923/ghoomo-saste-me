<?php
include("../include/db.php");

// Get booking id from URL
if (!isset($_GET['id'])) {
    die("Booking ID not specified.");
}

$id = (int)$_GET['id'];

// Fetch booking data
$sql = "SELECT * FROM bookings WHERE id = $id";
$result = $conn->query($sql);

if (!$result || $result->num_rows == 0) {
    die("Booking not found.");
}

$row = $result->fetch_assoc();

// Assign variables for the form
$customer_name = $row['customer_name'];
$email = $row['email'];
$phone = $row['phone'];
$check_in_date = $row['check_in_date'];
$check_out_date = $row['check_out_date'];
$guests_count = $row['guests_count'];
$room_type = $row['room_type'];
$price = $row['price'];
$special_requests = $row['special_requests'];
$image = $row['image'];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Edit Booking</title>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
    <style>
        .button-primary {
            background-color: #007bff;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .button-primary:hover {
            background-color: #0056b3;
        }

        .upload-btn {
            display: inline-block;
            padding: 6px 12px;
            background-color: #6c757d;
            color: white;
            border-radius: 4px;
            cursor: pointer;
        }

        .upload-input input[type="file"] {
            display: none;
        }

        .form-group {
            margin-bottom: 1rem;
        }
    </style>
</head>

<body>

    <div class="container mt-4 db-info-wrap">
        <h4>Edit Booking</h4>
        <form class="form-horizontal" method="post" enctype="multipart/form-data" action="update-booking.php">
            <input type="hidden" name="id" value="<?php echo $id; ?>" />
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Customer Name</label>
                        <input name="customer_name" class="form-control" type="text" value="<?php echo htmlspecialchars($customer_name); ?>" required>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Email</label>
                        <input name="email" class="form-control" type="email" value="<?php echo htmlspecialchars($email); ?>" required>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Phone</label>
                        <input name="phone" class="form-control" type="tel" value="<?php echo htmlspecialchars($phone); ?>" required>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Check-in Date</label>
                        <input name="check_in_date" class="form-control" type="date" value="<?php echo htmlspecialchars($check_in_date); ?>" required>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Check-out Date</label>
                        <input name="check_out_date" class="form-control" type="date" value="<?php echo htmlspecialchars($check_out_date); ?>" required>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Guests</label>
                        <input name="guests_count" class="form-control" type="number" min="1" value="<?php echo (int)$guests_count; ?>" required>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Room Type</label>
                        <input name="room_type" class="form-control" type="text" value="<?php echo htmlspecialchars($room_type); ?>" required>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Price</label>
                        <input name="price" class="form-control" type="number" step="0.01" min="0" value="<?php echo (float)$price; ?>" required>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Special Requests</label>
                        <textarea class="form-control" name="special_requests" rows="4"><?php echo htmlspecialchars($special_requests); ?></textarea>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="upload-input form-group">
                        <span class="upload-btn">Upload an image</span>
                        <input name="image" type="file" accept="image/*" />
                        <?php if (!empty($image)) { ?>
                            <img src="uploads/<?php echo htmlspecialchars($image); ?>" alt="Current Image" style="max-width:50%;margin-top:10px;">
                        <?php } ?>
                    </div>
                </div>
            </div>
            <button type="submit" class="button-primary">Update Booking</button>
        </form>
    </div>

    <script>
        // Simple upload button trigger
        document.querySelector('.upload-btn').addEventListener('click', function() {
            this.nextElementSibling.click();
        });
    </script>

</body>

</html>