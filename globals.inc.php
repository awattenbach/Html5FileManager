<?php
# Include db config
include_once('config/mysql.inc.php');

function showElement($element_key, $folder_id, $element_id, $move_to="") {
	$element_array= mysql_fetch_assoc(mysql_query('SELECT * FROM tb_element WHERE id='.$element_id.' LIMIT 1'));
	if ($move_to) $folder_id= $move_to;
	echo "
				<article class=\"element_container\" id=\"container_".$element_array['id']."\" style=\"display: none;\">
					<a href=\"#\"><img src=\"images/layout/elements/".$element_array['image_name'].".png\" class=\"element_image\" alt=\"\" /></a>
					<div class=\"movement_controlls\">";
	loadMovementControlls($folder_id, $element_id);
	echo "
					</div>
				</article>";
}
function loadMovementControlls($folder_id, $element_id) {
	$folder_array= mysql_fetch_assoc(mysql_query('SELECT movement FROM tb_folder WHERE id='.$folder_id.' LIMIT 1'));
	$movement_arr= explode(';',$folder_array['movement']);
	$movement_array[]= explode('-',$movement_arr[0]);
	$movement_array[]= explode('-',$movement_arr[1]);
	$movement_arr2[$movement_array[0][0]]= $movement_array[0][1];
	$movement_arr2[$movement_array[1][0]]= $movement_array[1][1];
	#print_r($movement_arr2);
echo "
						Move:";
foreach ($movement_arr2 as $key => $value) {
	echo "
						<span class=\"move_".$key."\"><a href=\"javascript:moveElementWithArrows('".$key."', 'container_".$element_id."','folder_".$value."','folder_".$folder_id."','".$element_id."');\">move ".$key."</a></span>";
}	
}
?>