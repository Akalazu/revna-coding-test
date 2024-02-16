<?php
require 'db.php';
// echo 'mfelwfm';
// $connection = new PDO('database/product.sqlite');
// print_r($connection);

// backend API
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}, Content-Type");

    exit(0);
}


// Endpoint for adding a new product
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $price = $data['price'];
    $quantity = $data['quantity'];

    $db = new PDO('sqlite:./database/product.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    print_r($db);

    $stmt = $db->prepare("INSERT INTO products (title, price, quantity) VALUES (:title, :price, :quantity)");
    $stmt->bindValue(':title', $name);
    $stmt->bindValue(':price', $price);
    $stmt->bindValue(':quantity', $quantity);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Product added successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to add product']);
    }
}

// Endpoint for viewing all products
// if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//     $stmt = $connection->prepare('SELECT * FROM product');
//     $result = $stmt->execute();
//     $products = [];
//     while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
//         $products[] = $row;
//     }
//     echo json_encode($products);
// }
