<?
# Load element and build valid box 
include('../globals.inc.php');
if (isset($_GET['move_to'])) {
	$folder_id= str_replace('folder_','',$_GET['folder_id']);
	$element_id= $_GET['element_id'];
	$move_to= str_replace('folder_','',$_GET['move_to']);
	$maxSort= mysql_fetch_array(mysql_query('SELECT count(id) FROM tb_element WHERE folder_id='.$move_to.''));
	$move= mysql_query('UPDATE tb_element SET folder_id='.$move_to.',sort='.($maxSort['0']+1).' WHERE id='.$element_id.'');
	$element_query= mysql_query('SELECT * FROM tb_element WHERE folder_id='.$move_to.'');
	$element_count= mysql_num_rows($element_query);
	showElement($element_count,$folder_id,$element_id,$move_to);
}
elseif (isset($_GET['reloadMovementControlls'])) {
	loadMovementControlls($_GET['folder_id'], $_GET['elementID']);
}
?>