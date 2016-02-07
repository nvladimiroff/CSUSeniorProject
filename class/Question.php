<?php

class Question extends Base{
    private $question_set_id;
    
    
    function __construct() {
        parent::__construct();
    }
    
    public function create($name, $description, $setId, $img = null) {
        $name = $this->db->real_escape_string($name);
        $description = $this->db->real_escape_string($description);
        $setId = $this->db->real_escape_string($setId);
        if ($img !== null) {
            $img = $this->db->real_escape_string($img);
        }
        
        $sql = "INSERT INTO questions (name,description,question_set_id,modified) VALUES ('$name','$description',$setId,now())";
        if ($this->db->query($sql)) {
            $question_id = $this->db->insert_id;
            if ($img !== null) {
                $sql2 = "UPDATE questions set img = '$img' where id = $question_id";
                if ($this->db->query($sql2)) {
                    return $question_id;
                }
                return false;
            }
            return true;
        }
        return false;
    }
    
    public function getQuestionSetId() {
        return $this->question_set_id;
    }
    
    public function setQuestionSetId($id) {
        $this->question_set_id = $id;
    }
}