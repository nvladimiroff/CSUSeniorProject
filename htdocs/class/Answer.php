<?php

class Answer extends Base {
    private $question_id;
    private $is_valid;
    
    function __construct() {
        parent::__construct();
    }
    
    public function getQuestionId() {
        return $this->question_id;
    }
    
    public function setQuestionId($id) {
        $this->question_id = $id;
    }
    
    public function isValid() {
        return $this->isValid;
    }
    
    public function setIsValid($valid) {
        $this->isValid = $valid;
    }
}
