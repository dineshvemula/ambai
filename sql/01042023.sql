
--
-- Table structure for table `story_episode`
--

CREATE TABLE IF NOT EXISTS `story_episode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `story_id` int(11) NOT NULL,
  `episode_no` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `banner` varchar(100) DEFAULT NULL,
  `content_tamil` text,
  `content_english` text,
  `content_telugu` text,
  `content_kannada` text,
  `content_malayalam` text,
  `content_hindi` text,
  `status_id` int(11) NOT NULL,
  `last_updated_by` int(11) NOT NULL,
  `last_updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;