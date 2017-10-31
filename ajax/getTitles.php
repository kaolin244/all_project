<?php

include('../config.php');
include('../session.php');
include('../class/displayPanel.php');


$class = new displayPanel();

$titles = $class->getTitles();

$jsonData = '{';
foreach ($titles as $row)
{
    $jsonData .= '"'.$row->id_title.'" : {"name": "'.$row->name.'", ';
    $jsonData .= '"color": "'.$row->color.'"}, ';
}
$jsonData = rtrim($jsonData, ', ');
$jsonData .= '}';

echo $jsonData;