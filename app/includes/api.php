<?php
// backend API

// Connection to database
require 'db.php';

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
    $name = strtolower($data['name']);
    $price = $data['price'];
    $quantity = $data['quantity'];

    $db = new PDO('sqlite:./database/product.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if product with the same title already exists
    $stmt_check = $db->prepare('SELECT * FROM products WHERE title = :title');
    $stmt_check->bindValue(':title', $name);
    $stmt_check->execute();
    $row = $stmt_check->fetchAll(PDO::FETCH_OBJ);

    if (count($row) > 0) {
        // Product with the same title already exists
        echo json_encode(['message' => false]);
    } else if (empty($price) || empty($quantity)) {
        echo json_encode(['message' => "error"]);
    } else {
        $stmt = $db->prepare("INSERT INTO products (title, price, quantity) VALUES (:title, :price, :quantity)");
        $stmt->bindValue(':title', $name);
        $stmt->bindValue(':price', $price);
        $stmt->bindValue(':quantity', $quantity);

        if ($stmt->execute()) {
            echo json_encode(['message' => true]);
        } else {
            echo json_encode(['message' => false]);
        }
    }
}

// Endpoint for viewing all products
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $db = new PDO('sqlite:./database/product.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->query('SELECT * FROM products');

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $products[] = $row;
    }
    echo json_encode($products);
}
