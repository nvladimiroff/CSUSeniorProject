<?php

class Base {
    protected $id;
    protected $name;
    protected $description;
    protected $created;
    protected $modified;
    protected $status;
    protected $img;
    protected $db;
    
    function __construct() {
        $this->db = new DB('clicker');
    }
    
    public function getId() {
        return $this->id;
    }
    
    public function setId($id) {
        $this->id = $id;
    }
    
    public function getName() {
        return $this->name;
    }
    
    public function setName($name) {
        $this->name = $name;
    }
    
    public function getDescription() {
        return $this->description;
    }
    
    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function getCreated() {
        return $this->created;
    }
    
    public function setCreated($created) {
        $this->created = $created;
    }
    
    public function getModified() {
        return $this->modified;
    }
    
    public function setModified($modified) {
        $this->modified = $modified;
    }
    
    public function setSatus($status) {
        $this->status = $status;
    }
    
    public function getStatus() {
        return $this->status;
    }
    
    public function setImage($img) {
        $this->img = $img;
    }
    
    public function getImage() {
        return $this->img;
    }
}