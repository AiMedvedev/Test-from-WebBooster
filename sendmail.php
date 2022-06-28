<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require './phpMailer/src/Exception.php';
	require './phpMailer/src/PHPMailer.php';

	$mail = new phpMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', './phpMailer/language/');
	$mail->IsHTML(true);

	$mail->setFrom('forcablaugrana@gmail.com', 'Для Алекса');
	$mail->addAddress('forcablaugrana@gmail.com');
	$mail->Subject = 'Новый заказ';

	$body = '<h1>Есть новый заказ!</h1>';
	$body.= '<p><strong>Имя: </strong> ' .$_POST['name'].'</p>';
	$body.= '<p><strong>Телефон: </strong> ' .$_POST['phone'].'</p>';
	//$body.= '<p><strong>Товар: </strong> ' .$_POST['chosenGood'].'</p>';

	$mail->Body = $body;	
	
	
	if (!$mail->send()) {
		$message = 'Ошибка!';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
	?>