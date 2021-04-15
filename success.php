<?php
header("Content-Type: text/html; charset=utf-8");
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);
$email = htmlspecialchars($_POST["email"]);
$project = htmlspecialchars($_POST["project"]);
$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
//$myemail = "lestadstudio@gmail.com";
$myemail = "kyryl.zp@gmail.com";
//token = "826557947:AAE7urn2TqD40PAuEU0rIFSgWoeZEX3Lz30";
$token = "";
//$chat_id = "-375234945";
$chat_id = "";
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $tel,
  'Email' => $email,
  'Источник (ссылка):' => $refferer
);

$tema = "НОВЫЙ ЗАКАЗ С САЙТА";
$message_to_myemail = "Текст письма:
<br><br>
Имя: $name<br>
Телефон/Email: $tel $email<br>
$project<br><br>

Источник (ссылка): $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: kyryl <kyrylmall@gmail.com> \r\n Reply-To: Admin \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

$myemail = $email;
mail($myemail, $tema, $message_to_myemail, "From: TTS < > \r\n Reply-To: Admin \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );


$f = fopen("leads.xls", "a+");
fwrite($f," <tr>");    
fwrite($f," <td>$name</td> <td>$tel</td> <td>$date / $time</td>");   
fwrite($f," <td>$refferer</td>");    
fwrite($f," </tr>");  
fwrite($f,"\n ");    
fclose($f);


?>
