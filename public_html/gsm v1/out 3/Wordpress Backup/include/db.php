<?php
// include/db.php

$servername = "localhost";
$username = "u339031250_akshaytripwale";           // default for XAMPP
$password = "Ghoomosasteme@2000";               // default for XAMPP
$dbname = "u339031250_ghoomosasteme";        // change this to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// Optional: Set character set
$conn->set_charset("utf8");
