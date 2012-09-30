<?
# Load element and build valid box 
include('globals.inc.php');
$folder_id= str_replace('folder_','',$_GET['folder_id']);
$element_id= $_GET['element_id'];
$move_to= str_replace('folder_','',$_GET['move_to']);
$move= mysql_query('UPDATE tb_element SET folder_id='.$move_to.' WHERE id='.$element_id.'');
$element_query= mysql_query('SELECT * FROM tb_element WHERE folder_id='.$move_to.'');
$element_count= mysql_num_rows($element_query);
showElement($element_count,$folder_id,$element_id,$move_to);
?>