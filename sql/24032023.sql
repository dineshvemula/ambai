CREATE TABLE IF NOT EXISTS `master_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fName` varchar(50) NOT NULL,
  `lName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `profile_image_src` varchar(100) DEFAULT NULL,
  `role_id` int(11) NOT NULL COMMENT 'Id from master_role table',
  `status_id` int(11) NOT NULL COMMENT 'Id from master_status table',
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime NOT NULL,
  `last_updated_by` int(11) DEFAULT NULL,
  `last_updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='User personal detail' AUTO_INCREMENT=1 ;
