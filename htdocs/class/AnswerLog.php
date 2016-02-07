<?php

class AnswerLog extends Base {
    private $session_id;
    private $user_id;
    private $answer_id;
    
    function __construct() {
        parent::__construct();
    }
    
    public function getSessionId() {
        return $this->session_id;
    }
    
    public function setSessionId($id) {
        $this->session_id - $id;
    }
    
    public function getUserId() {
        return $this->user_id;
    }
    
    public function setUserId($id) {
        $this->user_id = $id;
    }
    
    public function getAnswerId() {
        return $this->answer_id;
    }
    
    public function setAnswerId($id) {
        $this->answer_id = $id;
    }
}
