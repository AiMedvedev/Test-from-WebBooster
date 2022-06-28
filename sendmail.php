<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpMailer/src/Exception.php';
	require 'phpMailer/src/PHPMailer.php';

	$email = new phpMailer(true);
	$email->CharSet = 'UTF-8';
	$email->setLanguage('ru', 'phpMailer/language/');
	$email->IsHTML(true);

	$email->setForm('forcablaugrana@gmail.com', 'Для Алекса');
	$email->addAddress('forcablaugrana@gmail.com');
	$email->Subject('Новый заказ');

	$body = '<h1>Есть новый заказ!</h1>'
	$body.= '<p><strong>Имя: </strong> ' .$_POST['name'].'</p>';
	$body.= '<p><strong>Телефон: </strong> ' .$_POST['phone'].'</p>';
	$body.= '<p><strong>Товар: </strong> ' .$_POST['chosenGood'].'</p>';

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