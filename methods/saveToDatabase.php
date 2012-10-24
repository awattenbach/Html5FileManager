<?php
# Include db config
include('../config/mysql.inc.php');
	echo '<b>Debug:</b><br /><br />';
	$newDestParent= str_replace('folder_','',$_GET['destParent']);
	echo 'Target-Folder: <b>'.str_replace('folder_','',$_GET['$newDestParent']).'</b><br /><br />';
	$element_arr= explode(',',$_GET['newOrder']);
	$i= 1;
	foreach($element_arr as $key => $element) {
		if (isset($element)) {
			$element= str_replace('container_folder_','',$element);
			$element= explode('_',$element);
			$oldFolder= $element['0'];
			$oldSort= $element['1'];
			if (isset($element['1'])) {
				print_r($element);
				echo '<br />';
				echo '<b>SQL Statement</b> UPDATE tb_element SET folder_id="'.$newDestParent.'",sort="'.$i.'" WHERE id="'.$element['1'].'"';
				$save= mysql_query('UPDATE tb_element SET folder_id="'.$newDestParent.'",sort="'.$i.'" WHERE id="'.$element['1'].'"');
				echo '<br />';
				$i++;
			}
		}
	}
	echo '<br />';
?>