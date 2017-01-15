<?php
header('Access-Control-Allow-Origin: *');
if((isset($_POST['inputName']))&&(isset($_POST['subject']))&&(isset($_POST['email']))&&(isset($_POST['comments']))){
  $to = 'adamluptakosice@gmail.com';
  $subject = $_POST['subject'];
  $message = '
        <html>
            <head>
                <title>Call me back</title>
            </head>
            <body>
                <p><b>Name:</b> '.$_POST['inputName'].'</p>
                <p><b>Subject:</b> '.$_POST['subject'].'</p>
                <p><b>Email:</b> '.$_POST['email'].'</p>
                <p><b>Comments:</b> '.$_POST['comments'].'</p>
            </body>
        </html>';
  $headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: Site <info@mail.com>\r\n";
mail($to, $subject, $message, $headers);

  echo json_encode(array('status' => 'success'));
} else {
  echo json_encode(array('status' => 'error'));
} ?>