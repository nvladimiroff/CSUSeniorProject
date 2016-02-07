<?php

class User extends Base {
    private $username;
    private $firstName;
    private $lastName;
    private $role;
    private $password;
    private $email;
    
    function __construct($username = null) {
        parent::__construct();
        if (!empty($username)) {
            $this->find($username);
        }
    }
    
    public function find($username) {
        $sql = "Select * from users where `username` = '$username'";
        if ($result = $this->db->query($sql)) {
            return $this->getUserObject($result->fetch_assoc()); 
        }
        print "Error: ".$this->db->error;
    }
    
    public function login($username, $password) {
        $sql = "Select * from users where username = '".$this->db->real_escape_string($username). "' AND password = password('".$this->db->real_escape_string($password)."')";
        if($result = $this->db->query($sql)) {
            $row = $result->fetch_assoc();
            if (isset($row['username']) && !empty($row['username'])) {
                return $row['username'];
            }
        }
        return null;
    }
    
    public static function isUsernameExisting($username) {
        $sql = "SELECT username from users where username = '".$this->db->real_escape_string(trim($username))."'";
        if($result = $this->db->query($sql)) {
            $row = $result->fetch_assoc();
            if (isset($row['username']) && !empty($row['username'])) {
                return true;
            }
        }
        return false;
    }
    
    public static function createUser($firstname, $lastname, $email, $username, $password, $role) {
        $firstname = $this->db->real_escape_string($firstname);
        $lastname = $this->db->real_escape_string($lastname);
        $email = $this->db->real_escape_string($email);
        $username = $this->db->real_escape_string($username);
        $password = $this->db->real_escape_string($password);
        $role = $this->db->real_escape_string($role);
        
        $sql = "INSERT INTO users (`username`,`firstname`,`lastname`,`role`,`created`,`modified`,`password`,`email`)
                VALUES('$username','$firstname','$lastname','$role',now(),now(),password('$password'),'$email')";
        if ($this->db->query($sql)) {
            return true;
        }
        return false;
    }
    
    public static function getUserUsernameFromEmail($email) {
        $sql = "select username from users where email = '".$this->db->real_escape_string($email)."'";
        $result = $this->db->query($sql);
        $row = $result->fetch_assoc();
        if (isset($row['email']) && !empty($row['email'])) return $row['email'];
        else return null;
    }
    
    public function getUserObject($row) {
        $this->setUsername($row['username']);
        $this->setFirstName($row['firstname']);
        $this->setLastName($row['lastname']);
        $this->setRole($row['role']);
        $this->setCreated($row['created']);
        $this->setModified($row['modified']);
        $this->setPassword($row['password']);
        $this->setEmail($row['email']);
        $this->setStatus($row['status']);
        $this->setImage($row['img']);
    }
    
    public function getUsername() {
        return $this->username;
    }
    
    public function setUsername($username) {
        $this->username = $username;
    }
    
    public function getFirstName() {
        return $this->firstName;
    }
    
    public function setFirstName($firstName) {
        $this->firstName = $firstName;
    }
    
    public function getLastName() {
        return $this->lastName;
    }
    
    public function setLastName($lastName) {
        $this->lastName = $lastName;
    }
    
    public function getRole() {
        return $this->role;
    }
    
    public function setRole($role) {
        $this->role = $role;
    }
    
    public function getPassword() {
        return $this->password;
    }
    
    public function setPassword($password) {
        $this->password = $password;
    }
    
    public function getEmail() {
        return $this->email;
    }
    
    public function setEmail($email) {
        $this->email = $email;
    }
    
    public function getName() {
        return $this->firstName." ".$this->lastName;
    }
}
