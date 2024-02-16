// backend/api.php
<?php

require_once 'db.php';

header('Content-Type: application/json');

// Endpoint for adding a new product
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'];
    $price = $data['price'];
    $quantity = $data['quantity'];

    $stmt = $connection->prepare('INSERT INTO products (name, price, quantity) VALUES (:nm, :pr, :qn)');
    $stmt->bindValue(':nm', $name);
    $stmt->bindValue(':pr', $price);
    $stmt->bindValue(':qn', $quantity);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Product added successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to add product']);
    }
}

// Endpoint for viewing all products
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $connection->prepare('SELECT * FROM products');
    $result = $stmt->execute();
    $products = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $products[] = $row;
    }
    echo json_encode($products);
}
