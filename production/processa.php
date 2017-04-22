<?php
	$nome = $_POST['nome'];
	$email = $_POST['email'];
	
	$para = "rogersmuk@gmail.com";
	$assunto = "Cadastro promoções";
	$msg = "
		<b>Nome:</b> $nome<br />
		<b>E-mail:</b> $email<br />
	";
	
	$header = "From: $email \r\n";
	$header .= "Content-Type: text/html; charset=utf-8 \r\n";
	
	mail($para,$assunto,$msg,$header);
?>
