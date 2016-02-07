<?php
class ForgotPassword {
    public $id;
    public $user_id;
    public $email;
    public $created;
    public $modified;
    public $status;
    
    public static function logForgottenPassword($email) {
        $userId = User::getUserIdFromEmail($email);
        if (isset($userId)) {
            $db = new DB('whats_cookin');
            $sql = "INSERT INTO forgot_pass_log (`user_id`,`email`,`created`,`modified`) VALUES('".$db->real_escape_string($email)."', $userId, now(), now())";
            if ($db->query($sql)) return true;
            else return false;
        } else return false;
    }
}