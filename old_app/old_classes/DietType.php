<?php
class DietType {
    public $name;
    public $display_name;
    public $description;
    public $created;
    public $modified;
    public $status;
    
    public function getAll() {
        $arr = array();
        $db = new DB('whats_cookin');
        $sql = "Select * from diet_types where status = 1";
        $result = $db->query($sql);
        while($row = $result->fetch_assoc()) {
            $arr[] = $this->build($row);
        }
        return $arr;
    }
    
    private function build($row) {
        $obj = new DietType();
        
        $obj->setCreated($row['created']);
        $obj->setDescription($row['description']);
        $obj->setId($row['id']);
        $obj->setModified($row['modified']);
        $obj->setName($row['name']);
        $obj->setDisplay_name($row['display_name']);
        $obj->setStatus($row['status']);
        
        return $obj;
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
    
    public function getDisplay_name(){
        return $this->display_name;
    }

    public function setDisplay_name($display_name){
        $this->display_name = $display_name;
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