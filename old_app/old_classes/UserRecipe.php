<?php
class UserRecipe {
    public $id;
    public $userId;
    public $recipeId;
    public $recipeName;
    public $imageUrl;
    public $rating;
    public $created;
    public $modified;
    
    public static function getAllForUser($userId) {
        $arr =array();
        $db = new DB('whats_cookin');
        $sql = "Select * from user_recipes where user_id = $userId order by `rating` desc";
        $result = $db->query($sql);
        while($row = $result->fetch_assoc()) {
            $obj = new UserRecipe();
            $obj->setCreated($row['created']);
            $obj->setId($row['id']);
            $obj->setModified($row['modified']);
            $obj->setRating($row['rating']);
            $obj->setRecipeId($row['recipe_id']);
            $obj->setUserId($row['user_id']);
            $obj->setRecipeName($row['recipeName']);
            $obj->setImageUrl($row['imageUrl']);
            
            $arr[] = $obj;
        }
        return $arr;
    }
    
    public static function getRecipeForUserById($userId, $recipeId) {
        $db = new DB('whats_cookin');
        $sql = "Select * from user_recipes where user_id = $userId and recipe_id = '".$db->real_escape_string($recipeId)."'";
        $result = $db->query($sql);
        $row = $result->fetch_assoc();
        if (!empty($row)) {
            $obj = new UserRecipe();
            
            $obj->setCreated($row['created']);
            $obj->setId($row['id']);
            $obj->setModified($row['modified']);
            $obj->setRating($row['rating']);
            $obj->setRecipeId($row['recipe_id']);
            $obj->setUserId($row['user_id']);
            $obj->setRecipeName($row['recipeName']);
            $obj->setImageUrl($row['imageUrl']);
            
            return $obj;
        }
        return null;
    }
    
    public static function addRecipeForUser($userId, $recipeId, $rating, $recipeName, $imageUrl) {
        $db = new DB('whats_cookin');
        $sql = "INSERT INTO user_recipes (`user_id`,`recipe_id`,`recipeName`,`rating`,`imageUrl`,`created`,`modified`)
                VALUES($userId,'".$db->real_escape_string($recipeId)."','".$db->real_escape_string($recipeName)."',$rating,
                '".$db->real_escape_string($imageUrl)."',now(),now())";
        if ($db->query($sql)) {
            return true;
        }
        return false;
    }
    
    public static function updateRecipeByUrId($urId, $rating) {
        $db = new DB('whats_cookin');
        $sql = "UPDATE user_recipes SET rating = $rating, modified = now() WHERE id = $urId";
        if ($db->query($sql)) return true;
        else return false;
    }
    
    public static function removeItem($id) {
        $db = new DB('whats_cookin');
        $sql = "DELETE FROM user_recipes where id = $id";
        if ($db->query($sql)) {
            return true;
        }
        return false;
    }
    
    public function setId($id) { $this->id = $id; }
    public function getId() { return $this->id; }
    public function setUserId($userId) { $this->userId = $userId; }
    public function getUserId() { return $this->userId; }
    public function setRecipeId($recipeId) { $this->recipeId = $recipeId; }
    public function getRecipeId() { return $this->recipeId; }
    public function setRating($rating) { $this->rating = $rating; }
    public function getRating() { return $this->rating; }
    public function setCreated($created) { $this->created = $created; }
    public function getCreated() { return $this->created; }
    public function setModified($modified) { $this->modified = $modified; }
    public function getModified() { return $this->modified; }
    public function setRecipeName($name) { $this->recipeName = $name; }
    public function getRecipeName() { return $this->recipeName; }
    public function setImageUrl($name) { $this->imageUrl = $name; }
    public function getImageUrl() { return $this->imageUrl; }
}