<?php

class Session extends Base {
    private $token;
    private $question_set_id;
    private $owner_id;
    
    function __construct() {
        parent::__construct();
    }
    
    public function getToken() {
        return $this->token;
    }
    
    public function setToken($token) {
        $this->token = $token;
    }
    
    public function getQuestionSetId() {
        return $this->question_set_id;
    }
    
    public function setQuestionSetId($id) {
        $this->question_set_id = $id;
    }
    
    public function getOwnerId() {
        return $this->owner_id;
    }
    
    public function setOwnerId($id) {
        $this->owner_id = $id;
    }
}