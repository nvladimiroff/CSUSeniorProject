<?php
date_default_timezone_set('America/New_York');

function my_autoloader($class_name) {
    $root = ini_get('doc_root');
    strlen($root) < 1 ? $root = $_SERVER['DOCUMENT_ROOT'] : $root = $root;
    if(file_exists("$root/class/$class_name.php")) {
        include "$root/class/$class_name".'.php';
        //require("class/$class_name".'.php');
    }
}

spl_autoload_register('my_autoloader');
/*
function RecipeParser_Autoload($class_name) {
    $root = ini_get('doc_root');
    strlen($root) < 1 ? $root = $_SERVER['DOCUMENT_ROOT'] : $root = $root;
    if (!class_exists($class_name, false)) {
        $class_file_path = str_replace('_', '/', $class_name) . '.php';
        //require("$root/lib/$class_file_path");
        require("lib/$class_file_path");
    }
}

spl_autoload_register('RecipeParser_Autoload');*/

session_start();
if(!empty($_SESSION['username'])) {
    $tmp__user = new User();
    $tmp__user->find($_SESSION['userId']);
    $_user = $tmp__user;
} else $_user = null;

function mypr($some) {
    $html = "<pre>";
    if(is_array($some))$html .=  print_r($some, true);
    if(is_object($some))$html .= print_r(get_object_vars($some), true);
    $html .= "</pre>";
    return $html;
}

function isNullOrEmptyString($question){
    return (!isset($question) || trim($question)==='');
}

// set the host name based on the server it is hosted on 
$_host = gethostname();

/**
 *@method utf-8 converted string convertUtf8() converts string to utf-8 for inserting into mongo
 *
 *@param string $string string to be converted
 *
*/
function convertUtf8($string)
{
    $newstring = mb_convert_encoding($string, 'UTF-8');
    return $newstring;
}

$INPUT = array();

if(isset($_GET))
{
    foreach($_GET as $key => $val)
    {
        $INPUT[$key] = $val;
    } 
}

if(isset($_REQUEST))
{
    foreach($_REQUEST as $key => $val)
    {
        $INPUT[$key] = $val;
    } 
}

if(isset($_POST))
{
    foreach($_POST as $key => $val)
    {
        $INPUT[$key] = $val;
    } 
}

function getRealIpAddr()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    {
	$ip = $_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    {
	$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
	$ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

function debug_string_backtrace()
{ 
    ob_start(); 
    debug_print_backtrace(); 
    $trace = ob_get_contents(); 
    ob_end_clean(); 
    // Remove first item from backtrace as it's this function which 
    // is redundant. 
    $trace = preg_replace ('/^#0\s+' . __FUNCTION__ . "[^\n]*\n/", '', $trace, 1); 
    // Renumber backtrace items. 
    $trace = preg_replace ('/^#(\d+)/me', '\'#\' . ($1 - 1)', $trace); 
    return $trace; 
} 

function send($to, $subject, $message, $headers = null)
{
    mail($to, $subject, $message, $headers);
    /*$db = new DB('email');
    $to = $db->escape($to);
    $subject = $db->escape($subject);
    $message = $db->escape($message);
    $headers = $db->escape($headers);
    $backtrace = debug_string_backtrace();
    $backtrace = $db->escape($backtrace);
    $sql = "insert into emails (`id`, `to`, `subject`, `message`, `headers`, `backtrace`, `host`, `sent`, `sent_ts`) VALUES (null, '$to', '$subject', '$message', '$headers', '$backtrace', '$host', 1, now())";
    $db->query($sql);*/
}

function red_or_grn($threshold, $value)
{
    if($value <= $threshold)
    {
	    return 'tdsubtitlered';
    }
    else
    {
	    return 'tdsubtitlealt';
    }
}

function grn_or_red($threshold, $value)
{
	if($value >= $threshold)
	{
		return 'tdsubtitlered';
	}
	else
	{
		return 'tdsubtitlealt';
	}
}

function preDump() {    //  use string "noEcho" to just get a string return only
    $args = func_get_args();
    $doEcho = TRUE; $sb;
    if ($args) {
        $sb = '<div style="margin: 1em 0;"><fieldset style="display:inline-block;padding:0em 3em 1em 1em;"><legend><b>preDump: '.count($args).' Parameters Found.</b></legend>';
        foreach (func_get_args() as $arg) {
            if (gettype($arg) == 'string') if ($arg == 'noEcho') { $doEcho = FALSE; $sb = preg_replace('/(preDump: )[0-9]+/', 'preDump: '.(count($args)-1), $sb); continue; }
            $sb .= '<pre data-type="'.gettype($arg).'"';
            switch (gettype($arg)) {
                case "boolean":
                case "integer":
                    $sb .= ' data-dump="json_encode"><p style="border-bottom:1px solid;margin:0;padding:0 0 0 1em;"><b>gettype('.gettype($arg).')</b></p><p>';
                    $sb .= json_encode($arg);
                    break;
                case "string":
                    $sb .= ' data-dump="echo"><p style="border-bottom:1px solid;margin:0;padding:0 0 0 1em;"><b>gettype('.gettype($arg).')</b></p><p>';
                    $sb .= $arg;
                    break;
                default:
                    $sb .= ' data-dump="var_dump"';
                    if (is_object($arg)) $sb .= 'data-class="'.get_class($arg).'"';
                    $sb .= '><p style="border-bottom:1px solid;margin:0;padding:0 0 0 1em;"><b>gettype('.gettype($arg).')';
                    if (is_object($arg)) $sb .= ' ['.get_class($arg).']';
                    $sb .= '</b></p><p>';
                    ob_start();
                    var_dump($arg);
                    $sb .= ob_get_clean();
                    if (ob_get_length()) ob_end_clean();
            }
            $sb .= '</p></pre>';
        }
        $sb .= '</fieldset></div>';
    }
    else {
        $sb = '<div style="margin: 1em 0;"><fieldset style="display:inline-block;"><legend><b>preDump: [ERROR]</b></legend><h3>No Parameters Found</h3></fieldset></div>';
    }
    if ($doEcho) echo($sb);
    return $sb;
}
?>
