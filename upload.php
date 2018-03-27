<?php


require_once ('../bootstrap.php');

$my_gid = Core_Array::get($_COOKIE, '_gid');

$curl=curl_init();
$url = 'http://80.93.182.80:8008/l/' . urlencode($my_gid);


curl_setopt($curl,CURLOPT_URL,$url);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");

$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную

$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
curl_close($curl);


header('Content-Type: application/json');
echo json_encode(array('token' => $my_gid, 'api_response' => $code));

exit();
