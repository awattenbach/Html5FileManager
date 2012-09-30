<?

$dbhost= '***'; // type here your database host
$dbname= '***'; // type here your database name
$dbuname= '***'; // type here your database username
$dbpass= '***'; // type here your database password

$connection= @mysql_connect($dbhost, $dbuname, $dbpass);
$db= mysql_select_db($dbname, $connection);
$folder_query= mysql_query('SELECT * FROM tb_folder');
$folder_count= mysql_num_rows($folder_query);

function showElement($element_key, $folder_id, $element_id, $move_to="") {
	$element_array= mysql_fetch_assoc(mysql_query('SELECT * FROM tb_element WHERE id='.$element_id.' LIMIT 1'));
	if ($move_to) $folder_id= $move_to;
	$folder_array= mysql_fetch_assoc(mysql_query('SELECT movement FROM tb_folder WHERE id='.$folder_id.' LIMIT 1'));
	echo "<article class=\"element_container\" id=\"container_folder_".$folder_id."_".$element_key."\">
<a href=\"#\"><img src=\"images/layout/elements/".$element_array[image_name].".png\" class=\"element_image\" alt=\"\" /></a>";
$movement_arr= explode(';',$folder_array[movement]);
$movement_array[]= explode('-',$movement_arr[0]);
$movement_array[]= explode('-',$movement_arr[1]);
$movement_arr2[$movement_array[0][0]]= $movement_array[0][1];
$movement_arr2[$movement_array[1][0]]= $movement_array[1][1];
#print_r($movement_arr2);
echo "<div class=\"movement_controlls\">Move:";
foreach ($movement_arr2 as $key => $value) {
	echo "<span class=\"move_".$key."\"><a href=\"javascript:MoveElement('".$key."', 'container_folder_".$folder_id."_".$element_key."','folder_".$value."','folder_".$folder_id."','".$element_id."');\">move ".$key."</a></span>";
}
echo "</div>
</article>";
}
?>