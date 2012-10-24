<?php
$dbhost= 'db412114946.db.1and1.com'; // type here your database host
$dbname= 'db412114946'; // type here your database name
$dbuname= 'dbo412114946'; // type here your database username
$dbpass= 'hans1245'; // type here your database password

$connection= @mysql_connect($dbhost, $dbuname, $dbpass);
$db= mysql_select_db($dbname, $connection);
$folder_query= mysql_query('SELECT * FROM tb_folder');
$folder_count= mysql_num_rows($folder_query);
?>