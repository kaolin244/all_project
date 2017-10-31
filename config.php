<?php
session_start();
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_DATABASE', 'all_project');
define("BASE_URL", "http://localhost/all_project/");

function getDB()
{
    $dbHost = DB_SERVER;
    $dbUser = DB_USERNAME;
    $dbPass = DB_PASSWORD;
    $dbName = DB_DATABASE;
    try {
        $dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
        $dbConnection->exec("set names utf8");
        $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbConnection;
    }
    catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }

}