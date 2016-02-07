<?php
$name= $_POST['client_name'];
$email= $_POST['client_email'];
$phone= $_POST['client_phone'];
$msg= $_POST['client_message'];
$email_content= 'Greetings '. $name .', ' . '\\n\\nWe have recveived your comment: \\n\\n' .$msg . '\\n\\n We will respond via:\\n\\n' . 
				'Email: ' .$email . '\\nText: ' . $phone . '\\n\\n\\nRegards,\\n\\n\\nBrogrammers, Inc.';
if(mail($email, 'Registration', $email_content))
{
	echo "<b>Thank you for your comment!</b><br /> <a href='contact.html' >Click to Go back</a>";
}
else
{
	echo "<b>Error</b> <br /> <a href='contact.html' >Click to Go back</a>";
}
?>