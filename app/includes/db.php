<?php
class Database extends SQLite3
{
    public function __construct($db_file)
    {
        // Open SQlite DB Connection
        $this->open($db_file);
    }

    public function createDataBaseTable()
    {
        $query = "CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    price REAL,
    quantity INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
        ";

        $this->exec($query);

        if ($query)
            return true;
        else
            return false;
    }

    public function __destruct()
    {
        // Close SQlite DB Connection
        $this->close();
    }
}


$db_dir = "database/";
// Create directory if not exists
if (!is_dir($db_dir))
    mkdir($db_dir);

// Database pathname
$db_file = $db_dir . "product.db";

// Database Connection
$connection = new Database($db_file);

$connection->createDataBaseTable();
