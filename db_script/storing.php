<?php

use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hms";

function uploadData($data)
{
    $conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Define the expected keys and set default values to NULL for missing keys
    $expectedKeys = array(
        "generic_name",
        "brand_name",
        "manufacturer_id",
        "dosage_form_id",
        "strength",
        "dosage_unit",
        "prescription_required",
        "description"
    );

    foreach ($expectedKeys as $key) {
        if (!isset($data[$key]) || $data[$key] === '') {
            $data[$key] = 0; // Set to 0 if the value is empty
        }
    }

    // Check if the manufacturer_id exists in the manufacturers table
    $manufacturerId = (int)$data['manufacturer_id'];
    $result = $conn->query("SELECT id FROM manufacturers WHERE id = $manufacturerId");
    if ($result->num_rows === 0) {
        echo "Error: Invalid manufacturer_id. The manufacturer_id must exist in the manufacturers table. Invalid value: " . $data['manufacturer_id'];
        $conn->close();
        return;
    }

    // Prepare the SQL query using prepared statements for security
    $sql = "INSERT INTO `medicines` (generic_name, brand_name, manufacturer_id, dosage_form_id, strength, dosage_unit, prescription_required, description) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssiiisss", $data['generic_name'], $data['brand_name'], $data['manufacturer_id'], $data['dosage_form_id'], $data['strength'], $data['dosage_unit'], $data['prescription_required'], $data['description']);

    if ($stmt->execute()) {
        echo "Data uploaded successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $stmt->close();
    $conn->close();
}


// Process the uploaded file
if (isset($_POST["submit"])) {
    $file = $_FILES["file"]["tmp_name"]; // File path of the uploaded Excel file

    require_once 'vendor/autoload.php';
    try {
        $reader = IOFactory::createReaderForFile($file);
        $spreadsheet = $reader->load($file);
    } catch (Exception $e) {
        die('Error loading file: ' . $e->getMessage());
    }

    $worksheet = $spreadsheet->getActiveSheet();
    $highestRow = $worksheet->getHighestRow();
    $highestColumn = $worksheet->getHighestColumn();
    $highestColumnIndex = Coordinate::columnIndexFromString($highestColumn);

    $mapping = array(
        "generic_name",
        "brand_name",
        "manufacturer_id",
        "dosage_form_id",
        "strength",
        "dosage_unit",
        "prescription_required",
        "description"
    );

    for ($row = 2; $row <= $highestRow; ++$row) {
        $rowData = array();
        for ($col = 0; $col < $highestColumnIndex; ++$col) {
            $index = $col + 1;
            $cellValue = $worksheet->getCell(Coordinate::stringFromColumnIndex($index) . $row)->getValue();
            $rowData[$mapping[$col]] = $cellValue;
        }
        if ($rowData) {
            uploadData($rowData);
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Upload Excel Data to Database</title>
</head>
<body>
    <h2>Upload Excel Data</h2>
    <form action="" method="post" enctype="multipart/form-data">
        <input type="file" name="file" />
        <input type="submit" name="submit" value="Upload" />
    </form>
</body>
</html>
