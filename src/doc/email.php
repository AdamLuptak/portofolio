<?php
header('Access-Control-Allow-Origin: *');
if((isset($_POST['call-name']))&&(isset($_POST['phone'])&&$_POST['phone']!="")){
  $to = 'adamluptakosice@gmail.com';
  $subject = 'Callback';
  $message = '
        <html>
            <head>
                <title>Call me back</title>
            </head>
            <body>
                <p><b>Name:</b> '.$_POST['call-name'].'</p>
                <p><b>Phonenum:</b> '.$_POST['phone'].'</p>
            </body>
        </html>';
  $headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: Site <info@mail.com>\r\n";
mail($to, $subject, $message, $headers);

  echo json_encode(array('status' => 'success'));
} else {
  echo json_encode(array('status' => 'error'));
} ?>
