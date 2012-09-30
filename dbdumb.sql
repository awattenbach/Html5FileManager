
-- dbdumb with test-data

-- Author: Alexander Wattenbach <a.wattenbach@pd-sound-lights.de>

-- 
-- Tablestructure for table `tb_folder`
-- 

CREATE TABLE `tb_element` (
  `id` int(13) NOT NULL auto_increment,
  `folder_id` int(13) NOT NULL,
  `name` varchar(255) collate latin1_german2_ci NOT NULL,
  `image_name` varchar(255) collate latin1_german2_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci AUTO_INCREMENT=9 ;

-- 
-- Data for table `tb_element`
-- 

INSERT INTO `tb_element` VALUES (1, 3, 'Image 1', 'image1');
INSERT INTO `tb_element` VALUES (2, 3, 'Image 2', 'image2');
INSERT INTO `tb_element` VALUES (3, 3, 'Image 3', 'image3');
INSERT INTO `tb_element` VALUES (4, 3, 'Image 4', 'image4');
INSERT INTO `tb_element` VALUES (5, 3, 'Image 5', 'image5');
INSERT INTO `tb_element` VALUES (6, 4, 'Element 1', 'element1');
INSERT INTO `tb_element` VALUES (7, 4, 'Element 2', 'element2');
INSERT INTO `tb_element` VALUES (8, 2, 'Element 3', 'element3');

-- --------------------------------------------------------

-- 
-- Tablestructure for table `tb_folder`
-- 

CREATE TABLE `tb_folder` (
  `id` int(13) NOT NULL auto_increment,
  `name` varchar(255) collate latin1_german2_ci NOT NULL,
  `description` text collate latin1_german2_ci NOT NULL,
  `movement` varchar(255) collate latin1_german2_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci AUTO_INCREMENT=5 ;

-- 
-- Data for table `tb_folder`
-- 

INSERT INTO `tb_folder` VALUES (1, 'Lightbox', 'Here you can find unsorted elements. Over the "movement-controlls" you can sort them into other folders.', 'right-2;bottom-3');
INSERT INTO `tb_folder` VALUES (2, 'PDF-Documents', 'Folder for PDF Documents.', 'left-1;bottom-4');
INSERT INTO `tb_folder` VALUES (3, 'Images', 'Folder for images.', 'right-4;top-1');
INSERT INTO `tb_folder` VALUES (4, 'Documents', 'Other documents', 'left-3;top-2');
