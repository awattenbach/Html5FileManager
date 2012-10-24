<?php
$dbhost= '***'; // type here your database host
$dbname= '***'; // type here your database name
$dbuname= '***'; // type here your database username
$dbpass= '***'; // type here your database password

$connection= @mysql_connect($dbhost, $dbuname, $dbpass);
$db= mysql_select_db($dbname, $connection);
$folder_query= mysql_query('SELECT * FROM tb_folder');
$folder_count= mysql_num_rows($folder_query);
?>