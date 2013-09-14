<?php
	$errors = array(
		'400' => 'The request cannot be fulfilled due to bad syntax.',
		'403' => 'Sorry, this page is not for you.',
		'404' => 'The page you are looking for is not here.',
		'500' => 'Sorry, somebody spilled coffee on the server.'
	);
	
	$code = '666';
	$text = 'Baby did a bad, bad thing.';
	
	if( isset($_REQUEST['e']) )
	{
		switch ($_REQUEST['e']) {
			case 400:
			case 403:
			case 404:
			case 500:
				$code = $_REQUEST['e'];
				$text = $errors[$_REQUEST['e']];
				break;
		}
	}

?><!DOCTYPE html>
<html>
	<head>
		<title><?php echo $code ?> - <?php echo $text ?></title>
		<meta charset="utf-8"/>		
		<link rel="stylesheet" media="all" href="/errors/css/styles.css" />
	<body>
		<h1><?php echo $code ?></h1>
		<p><?php echo $text ?></p>
	</body>
</html>