<?php

class QuestionSet extends Base {
    private $owner_id;
    
    
    function __construct() {
        parent::__construct();
    }
    
    public function create($name, $description, $user_id) {
        $name = $this->db->real_escape_string($name);
        $description = $this->db->real_escape_string($description);
        $user_id = $this->db->real_escape_string($user_id);
        
        $sql = "INSERT INTO question_sets (name,description,owner_id,modified) VALUES ('$name','$description',$user_id,now())";
        if ($this->db->query($sql)) {
            return $this->db->insert_id;
        }
        return false;
    }
    
    public function getOwnerId() {
        return $this->owner_id;
    }
    
    public function setOwnerId($id) {
        $this->owner_id = $id;
    }
}