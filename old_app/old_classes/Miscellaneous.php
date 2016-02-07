<?php
class Miscellaneous {
    public $id;
    public $name;
    public $description;
    public $created;
    public $modified;
    public $status;
    
    function __construct() {
        
    }
    
    public function findSimilar($str) {
        $arr = array();
        $db = new DB('whats_cookin');
        $sql = "select * from miscellaneous where name like '%".$db->real_escape_string($str)."%' and status = 1";
        $result = $db->query($sql);
        while($row = $result->fetch_assoc()) {
            $arr[] = $this->build($row);
        }
        return $arr;
    }
    
    private function build($row) {
        $obj = new Miscellaneous();
        $obj->setCreated($row['created']);
        $obj->setDescription($row['description']);
        $obj->setId($row['id']);
        $obj->setModified($row['modified']);
        $obj->setName($row['name']);
        $obj->setStatus($row['status']);
        
        return $obj;
    }
    
    static function addNewIngredientIfNeeded($ingredients) {
        $newIngredientsAdded = false;
        $db = new DB('whats_cookin');
        $arr = explode(",", $ingredients);
        foreach($arr as $ingredient) {
            $ingredient = $db->real_escape_string(ucwords(strtolower($ingredient)));
            $sql = "Select * from miscellaneous where name = '".$ingredient."' and status = 1";
            if ($result = $db->query($sql)) {
                $row = $result->fetch_assoc();
                if (empty($row)) {
                    $insertSql = "INSERT INTO miscellaneous (`name`,`description`,`created`,`modified`) VALUES('".$ingredient."','".$ingredient."',now(), now())";
                    if ($db->query($insertSql)) $newIngredientsAdded = true;
                }
            }
        }
        return $newIngredientsAdded;
    }
    
    public function getId(){
        return $this->id;
    }

    public function setId($id){
        $this->id = $id;
    }

    public function getName(){
        return $this->name;
    }

    public function setName($name){
        $this->name = $name;
    }

    public function getDescription(){
        return $this->description;
    }

    public function setDescription($description){
        $this->description = $description;
    }

    public function getCreated(){
        return $this->created;
    }

    public function setCreated($created){
        $this->created = $created;
    }

    public function getModified(){
        return $this->modified;
    }

    public function setModified($modified){
        $this->modified = $modified;
    }

    public function getStatus(){
        return $this->status;
    }

    public function setStatus($status){
        $this->status = $status;
    }
}