<?php
class Grocery {
    public $id;
    public $userId;
    public $name;
    public $description;
    public $quantity;
    public $measurement;
    public $weight;
    public $recipeId;
    public $created;
    public $modified;
    public $status;
    
    public static function getListFor($userId) {
        $arr = array();
        $db = new DB('whats_cookin');
        $sql = "Select * from groceries where user_id = $userId and status = 1";
        $result = $db->query($sql);
        while($row = $result->fetch_assoc()) {
            $obj = new Grocery();
            $obj->setCreated($row['created']);
            $obj->setDescription($row['description']);
            $obj->setId($row['id']);
            $obj->setMeasurement($row['measurement']);
            $obj->setModified($row['modified']);
            $obj->setName($row['name']);
            $obj->setQuantity($row['quantity']);
            $obj->setRecipeId($row['recipe_id']);
            $obj->setStatus($row['status']);
            $obj->setUserId($row['user_id']);
            $obj->setWeight($row['weight']);
            
            $arr[] = $obj;
        }
        return $arr;
    }
    
    public static function addGroceryForUser($userId, $name, $description, $quantity, $measurement, $weight, $recipeId) {
        $db = new DB('whats_cookin');
        $sql = "INSERT into groceries (`user_id`,`name`,`description`,`quantity`,`measurement`,`weight`,`recipe_id`,`created`,`modified`)
                VALUES($userId,'".$db->real_escape_string($name)."','".$db->real_escape_string($description)."','".$db->real_escape_string($quantity)."',
                '".$db->real_escape_string($measurement)."','".$db->real_escape_string($weight)."','".$db->real_escape_string($recipeId)."',now(),now())";
        if ($db->query($sql)) {
            return true;
        }
        return false;
    }
    
    public static function isIngredientOnGroceryList($userId, $name, $quantity, $measurement) {
        $db = new DB('whats_cookin');
        $sql = "Select * from groceries where user_id = $userId and name = '".$db->real_escape_string($name)."'
                and measurement = '$measurement' and quantity = '$quantity' and status = 1";
        if ($result = $db->query($sql)) {
            $row = $result->fetch_assoc();
            if (isset($row['name']) && !empty($row)) {
                return true;
            }
        }
        return false;
    }
    
    public static function removeItem($id) {
        $db = new DB('whats_cookin');
        $sql = "UPDATE groceries SET status = 0, modified = now() where id = $id";
        if ($db->query($sql)) {
            return true;
        }
        return false;
    }
    
    public function setId($id) { $this->id = $id; }
    public function getId() { return $this->id; }
    public function setUserId($userId) { $this->userId = $userId; }
    public function getUserId() { return $this->userId; }
    public function setName($name) { $this->name = $name; }
    public function getName() { return $this->name; }
    public function setDescription($description) { $this->description = $description; }
    public function getDescription() { return $this->description; }
    public function setQuantity($quantity) { $this->quantity = $quantity; }
    public function getQuantity() { return $this->quantity; }
    public function setMeasurement($measurement) { $this->measurement = $measurement; }
    public function getMeasurement() { return $this->measurement; }
    public function setWeight($weight) { $this->weight = $weight; }
    public function getWeight() { return $this->weight; }
    public function setRecipeId($recipeId) { $this->recipeId = $recipeId; }
    public function getRecipeId() { return $this->recipeId; }
    public function setCreated($created) { $this->created = $created; }
    public function getCreated() { return $this->created; }
    public function setModified($modified) { $this->modified = $modified; }
    public function getModified() { return $this->modified; }
    public function setStatus($status) { $this->status = $status; }
    public function getStatus() { return $this->status; }
}