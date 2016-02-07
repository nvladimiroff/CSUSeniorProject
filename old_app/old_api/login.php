<?php
include_once '../pre.php';

session_start(); // Starting Session
$user = $INPUT['user'];
$pass = $INPUT['pass'];
if (isset($user) && isset($pass)) {
    $obj = new User();
    $userId = $obj->login($user, $pass);
    if (isset($userId)) {
        $_SESSION['loggedIn'] = 1;
        $_SESSION['username'] = $user;
        $_SESSION['userId'] = $userId;
        echo "success";
    } else {
        echo "error";
    }
}