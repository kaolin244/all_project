<?php
if(!empty($_SESSION['uid']))
{
    $session_uid = $_SESSION['uid'];
    include('class/displayPanel.php');
    $userClass = new displayPanel();
}
/*if(empty($session_uid))
{
    $url=BASE_URL.'index.php';
    header("Location: $url");
}*/
?>