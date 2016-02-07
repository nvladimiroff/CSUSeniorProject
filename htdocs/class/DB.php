<?php

class DB extends mysqli {
    function __construct($db_name) {
        parent::__construct("localhost", "root", "root", $db_name);
        //parent::__construct("localhost", "1050429", "g45l20en", "1050429");
        //parent::__construct("sql5.freemysqlhosting.net", "sql596730", "aZ9!uD1%", "sql596730");
        if (mysqli_connect_error()) {
            die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
        }
    }
}
