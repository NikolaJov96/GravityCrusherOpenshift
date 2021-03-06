CREATE DATABASE  IF NOT EXISTS `psi` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `psi`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: psi
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `const123` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1),(2);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cosmic_object`
--

DROP TABLE IF EXISTS `cosmic_object`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cosmic_object` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `map_id` int(11) NOT NULL,
  `position_x` float NOT NULL,
  `position_y` float NOT NULL,
  `velocity_x` float NOT NULL,
  `velocity_y` float NOT NULL,
  `mass` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_map_idx` (`map_id`),
  CONSTRAINT `id_map` FOREIGN KEY (`map_id`) REFERENCES `game_map` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosmic_object`
--

LOCK TABLES `cosmic_object` WRITE;
/*!40000 ALTER TABLE `cosmic_object` DISABLE KEYS */;
INSERT INTO `cosmic_object` VALUES (1,1,30,40,10,15,300),(2,1,20,30,40,5,20),(3,1,20,40,10,15,40),(4,2,30,40,100,150,500),(5,2,80,80,100,150,4000),(6,2,350,350,100,450,500),(7,2,20,40,10,15,300),(8,3,30,50,100,15,100),(9,3,30,40,20,120,200),(10,3,30,400,250,250,350),(11,3,350,450,150,10,800),(12,3,300,400,100,150,200);
/*!40000 ALTER TABLE `cosmic_object` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_map`
--

DROP TABLE IF EXISTS `game_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_map`
--

LOCK TABLES `game_map` WRITE;
/*!40000 ALTER TABLE `game_map` DISABLE KEYS */;
INSERT INTO `game_map` VALUES (3,'Apolo'),(2,'Galaxy'),(1,'Sirius');
/*!40000 ALTER TABLE `game_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statistics` (
  `user_id` int(11) NOT NULL,
  `games_played_count` int(11) NOT NULL DEFAULT '0',
  `games_won_count` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `id_user_stat` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
INSERT INTO `statistics` VALUES (1,0,0),(2,10,8),(3,8,8),(4,9,3),(5,10,9),(6,5,4),(7,7,1),(8,6,3);
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token_valid_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `token_code` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`token_code`),
  KEY `id_user_idx` (`user_id`),
  CONSTRAINT `id_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (1,1,'2018-06-06 09:35:03','aaabbbcccddda'),(2,2,'2018-06-06 09:35:03','aaabbbcccdddb'),(3,3,'2018-06-06 09:35:03','aaabbbcccdddc'),(4,1,'2018-06-06 09:35:03','aaabbbcccdddd'),(5,2,'2018-06-06 09:35:03','aaabbbcccddde'),(6,4,'2018-06-06 09:35:04','aaabbbcccdddf'),(7,5,'2018-06-06 09:35:04','aaabbbcccdddg'),(8,6,'2018-06-06 09:35:04','aaabbbcccdddh'),(9,7,'2018-06-06 09:35:04','aaabbbcccdddi'),(10,4,'2018-06-06 09:35:04','aaabbbcccdddj'),(11,7,'2018-06-06 09:35:04','aaabbbcccdddk'),(12,8,'2018-06-06 09:35:04','aaabbbcccdddl'),(13,9,'2018-06-06 09:35:04','aaabbbcccdddm');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  `password_salt` varchar(256) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar` varchar(40) NOT NULL DEFAULT 'default',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Filip','filipmandic80@gmail.com','32f5481ff3e97ac727154adf90e7a90acce61ec07a4d8b6d5831b8597acad9c3ed899de42df6953387b3ae24474527ef62ee168b63528624489eeb7556776c25','f62fc60bc4bcbb3436112fe8f2ca11e450e939114b4a93500ec2bbecd825e138ef1eb39cd70e9f69233618e9b69aeccc0a9bc0bdfd362611edf1cd51f77d6f9be31ce333b6bb9a59134a2fe9d9333e04516502619646d3350d40c33ed6a4ac26d41aec1452d893a2a183e2c368f471be09ab53a4ebac84f6d57b6b6f2a898b94','2018-06-06 09:35:02','default'),(2,'Andrija','andrija6@gmail.com','32f5481ff3e97ac727154adf90e7a90acce61ec07a4d8b6d5831b8597acad9c3ed899de42df6953387b3ae24474527ef62ee168b63528624489eeb7556776c25','f62fc60bc4bcbb3436112fe8f2ca11e450e939114b4a93500ec2bbecd825e138ef1eb39cd70e9f69233618e9b69aeccc0a9bc0bdfd362611edf1cd51f77d6f9be31ce333b6bb9a59134a2fe9d9333e04516502619646d3350d40c33ed6a4ac26d41aec1452d893a2a183e2c368f471be09ab53a4ebac84f6d57b6b6f2a898b94','2018-06-06 09:35:03','default'),(3,'Nikola','nikola6@gmail.com','32f5481ff3e97ac727154adf90e7a90acce61ec07a4d8b6d5831b8597acad9c3ed899de42df6953387b3ae24474527ef62ee168b63528624489eeb7556776c25','f62fc60bc4bcbb3436112fe8f2ca11e450e939114b4a93500ec2bbecd825e138ef1eb39cd70e9f69233618e9b69aeccc0a9bc0bdfd362611edf1cd51f77d6f9be31ce333b6bb9a59134a2fe9d9333e04516502619646d3350d40c33ed6a4ac26d41aec1452d893a2a183e2c368f471be09ab53a4ebac84f6d57b6b6f2a898b94','2018-06-06 09:35:03','default'),(4,'Nemanja','nemanja6@gmail.com','32f5481ff3e97ac727154adf90e7a90acce61ec07a4d8b6d5831b8597acad9c3ed899de42df6953387b3ae24474527ef62ee168b63528624489eeb7556776c25','f62fc60bc4bcbb3436112fe8f2ca11e450e939114b4a93500ec2bbecd825e138ef1eb39cd70e9f69233618e9b69aeccc0a9bc0bdfd362611edf1cd51f77d6f9be31ce333b6bb9a59134a2fe9d9333e04516502619646d3350d40c33ed6a4ac26d41aec1452d893a2a183e2c368f471be09ab53a4ebac84f6d57b6b6f2a898b94','2018-06-06 09:35:03','default'),(5,'Jovan','jovan6@gmail.com','dcdcdcdccdc4dc45d564','12346579898451','2018-06-06 09:35:03','default'),(6,'Jelena','jelena6@gmail.com','dc48d4c9c4d4cd484bbb','abababaababababababababbababaab','2018-06-06 09:35:03','default'),(7,'Milica','milica6@gmail.com','4b84b65b651b556b151','aaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbb','2018-06-06 09:35:03','default'),(8,'Petar','petar6@gmail.com','54f54f4f645f4f4f56','dfdfdfffddffddfdfdfdfdfdfdfdfd','2018-06-06 09:35:03','default'),(9,'Marko','marko6@gmail.com','111111111111111aaaaa111111','fffffffffffffffffffffffffffffff','2018-06-06 09:35:03','default');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_banned`
--

DROP TABLE IF EXISTS `user_banned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_banned` (
  `user_id` int(11) NOT NULL,
  `bann_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `id_bann` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_banned`
--

LOCK TABLES `user_banned` WRITE;
/*!40000 ALTER TABLE `user_banned` DISABLE KEYS */;
INSERT INTO `user_banned` VALUES (5,'2018-06-06 09:35:03'),(8,'2018-06-06 09:35:03');
/*!40000 ALTER TABLE `user_banned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_disabled`
--

DROP TABLE IF EXISTS `user_disabled`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_disabled` (
  `user_id` int(11) NOT NULL,
  `disable_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `id_disable` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_disabled`
--

LOCK TABLES `user_disabled` WRITE;
/*!40000 ALTER TABLE `user_disabled` DISABLE KEYS */;
INSERT INTO `user_disabled` VALUES (6,'2018-06-06 09:35:03'),(7,'2018-06-06 09:35:03');
/*!40000 ALTER TABLE `user_disabled` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_not_confirmed`
--

DROP TABLE IF EXISTS `user_not_confirmed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_not_confirmed` (
  `user_id` int(11) NOT NULL,
  `confirm_code` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `id_not_cofirmed` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_not_confirmed`
--

LOCK TABLES `user_not_confirmed` WRITE;
/*!40000 ALTER TABLE `user_not_confirmed` DISABLE KEYS */;
INSERT INTO `user_not_confirmed` VALUES (9,'aapotvrdimarkosvojnalog686868');
/*!40000 ALTER TABLE `user_not_confirmed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_password_reset`
--

DROP TABLE IF EXISTS `user_password_reset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_password_reset` (
  `user_id` int(11) NOT NULL,
  `reset_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `confirm_code` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `confirm_code_UNIQUE` (`confirm_code`),
  CONSTRAINT `id_user_password` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_password_reset`
--

LOCK TABLES `user_password_reset` WRITE;
/*!40000 ALTER TABLE `user_password_reset` DISABLE KEYS */;
INSERT INTO `user_password_reset` VALUES (5,'2018-06-06 09:35:03','jovanresetujesvojusifru'),(6,'2018-06-06 09:35:03','jelenaresetujesvojusifru'),(8,'2018-06-06 09:35:03','petarresetujesvojusifru');
/*!40000 ALTER TABLE `user_password_reset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'psi'
--
/*!50003 DROP PROCEDURE IF EXISTS `clear_database` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `clear_database`()
BEGIN

DELETE FROM user
WHERE id <= 10000;

DELETE FROM user_banned
WHERE user_id <= 10000;

DELETE FROM user_disabled
WHERE user_id <= 10000;

DELETE FROM user_not_confirmed
WHERE user_id <= 10000;

DELETE FROM user_password_reset
WHERE user_id <= 10000;

DELETE FROM statistics
WHERE user_id < 10000;

DELETE FROM game_map
WHERE id <= 10000;

DELETE FROM cosmic_object
WHERE id <= 10000;

DELETE FROM token
WHERE id <= 10000;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `fill_statistics_table` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `fill_statistics_table`()
BEGIN

UPDATE statistics
SET games_played_count = 10,
	games_won_count = 8
WHERE user_id = 2;

UPDATE statistics
SET games_played_count = 8,
	games_won_count = 8
WHERE user_id = 3;

UPDATE statistics
SET games_played_count = 9,
	games_won_count = 3
WHERE user_id = 4;

UPDATE statistics
SET games_played_count = 10,
	games_won_count = 9
WHERE user_id = 5;

UPDATE statistics
SET games_played_count = 5,
	games_won_count = 4
WHERE user_id = 6;

UPDATE statistics
SET games_played_count = 7,
	games_won_count = 1
WHERE user_id = 7;

UPDATE statistics
SET games_played_count = 6,
	games_won_count = 3
WHERE user_id = 8;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_maps_and_objects` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_maps_and_objects`()
BEGIN

INSERT INTO game_map(name) VALUES ("Sirius");
INSERT INTO game_map(name) VALUES ("Galaxy");
INSERT INTO game_map(name) VALUES ("Apolo");

INSERT INTO cosmic_object(map_id, position_x, position_y, velocity_x, velocity_y, mass)
VALUES(1, 30, 40, 10, 15, 300);

INSERT INTO cosmic_object(map_id, position_x, position_y, velocity_x, velocity_y, mass)
VALUES(1, 20, 30, 40, 5, 20);

INSERT INTO cosmic_object(map_id, position_x, position_y, velocity_x, velocity_y, mass)
VALUES(1, 20, 40, 10, 15, 40);

INSERT INTO cosmic_object(map_id, position_x, position_y, velocity_x, velocity_y, mass)
VALUES(2, 30, 40, 100, 150, 500);

INSERT INTO cosmic_object(map_id, position_x, position_y, velocity_x, velocity_y, mass)
VALUES(2, 80, 80, 100, 150, 4000);

INSERT INTO cosmic_object(map_id, position_x, position_y, velocity_x, velocity_y, mass)
VALUES(2, 350, 350, 100, 450, 500);

INSERT INTO cosmic_object(map_id, position_x, position_y, velocity_x, velocity_y, mass)
VALUES(2, 20, 40, 10, 15, 300);

INSERT INTO cosmic_object(map_id, position_x, position_y, velocity_x, velocity_y, mass)
VALUES(3, 30, 50, 100, 15, 100);

INSERT INTO cosmic_object(map_id, position_x, position_y, velocity_x, velocity_y, mass)
VALUES(3, 30, 40, 20, 120, 200);

INSERT INTO cosmic_object(map_id, position_x, position_y, velocity_x, velocity_y, mass)
VALUES(3, 30, 400, 250, 250, 350);

INSERT INTO cosmic_object(map_id, position_x, position_y, velocity_x, velocity_y, mass)
VALUES(3, 350, 450, 150, 10, 800);

INSERT INTO cosmic_object(map_id, position_x, position_y, velocity_x, velocity_y, mass)
VALUES(3, 300, 400, 100, 150, 200);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_other_users_tables` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_other_users_tables`()
BEGIN

INSERT INTO user_banned(user_id) VALUES(5);
INSERT INTO user_banned(user_id) VALUES(8);

INSERT INTO user_disabled(user_id) VALUES(6);
INSERT INTO user_disabled(user_id) VALUES(7);


INSERT INTO user_not_confirmed(user_id, confirm_code) VALUES(9, "aapotvrdimarkosvojnalog686868");

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_pass_reset` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_pass_reset`()
BEGIN

INSERT INTO user_password_reset(user_id, confirm_code)
VALUES(5, "jovanresetujesvojusifru");

INSERT INTO user_password_reset(user_id, confirm_code)
VALUES(6, "jelenaresetujesvojusifru");

INSERT INTO user_password_reset(user_id, confirm_code)
VALUES(8, "petarresetujesvojusifru");

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_tokens` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_tokens`()
BEGIN

INSERT INTO token(user_id, token_code) VALUES (1, "aaabbbcccddda");
INSERT INTO token(user_id, token_code) VALUES (2, "aaabbbcccdddb");
INSERT INTO token(user_id, token_code) VALUES (3, "aaabbbcccdddc");
INSERT INTO token(user_id, token_code) VALUES (1, "aaabbbcccdddd");
INSERT INTO token(user_id, token_code) VALUES (2, "aaabbbcccddde");
INSERT INTO token(user_id, token_code) VALUES (4, "aaabbbcccdddf");
INSERT INTO token(user_id, token_code) VALUES (5, "aaabbbcccdddg");
INSERT INTO token(user_id, token_code) VALUES (6, "aaabbbcccdddh");
INSERT INTO token(user_id, token_code) VALUES (7, "aaabbbcccdddi");
INSERT INTO token(user_id, token_code) VALUES (4, "aaabbbcccdddj");
INSERT INTO token(user_id, token_code) VALUES (7, "aaabbbcccdddk");
INSERT INTO token(user_id, token_code) VALUES (8, "aaabbbcccdddl");
INSERT INTO token(user_id, token_code) VALUES (9, "aaabbbcccdddm");

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_users` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_users`()
BEGIN

INSERT INTO user(username, email, password_hash, password_salt) 
VALUES("Filip", 
		"filipmandic80@gmail.com", 
        "32f5481ff3e97ac727154adf90e7a90acce61ec07a4d8b6d5831b8597acad9c3ed899de42df6953387b3ae24474527ef62ee168b63528624489eeb7556776c25", 
        "f62fc60bc4bcbb3436112fe8f2ca11e450e939114b4a93500ec2bbecd825e138ef1eb39cd70e9f69233618e9b69aeccc0a9bc0bdfd362611edf1cd51f77d6f9be31ce333b6bb9a59134a2fe9d9333e04516502619646d3350d40c33ed6a4ac26d41aec1452d893a2a183e2c368f471be09ab53a4ebac84f6d57b6b6f2a898b94");

INSERT INTO statistics(user_id) VALUES (1);


INSERT INTO user(username, email, password_hash, password_salt) 
VALUES("Andrija",
		"andrija6@gmail.com", 
		"32f5481ff3e97ac727154adf90e7a90acce61ec07a4d8b6d5831b8597acad9c3ed899de42df6953387b3ae24474527ef62ee168b63528624489eeb7556776c25",
		"f62fc60bc4bcbb3436112fe8f2ca11e450e939114b4a93500ec2bbecd825e138ef1eb39cd70e9f69233618e9b69aeccc0a9bc0bdfd362611edf1cd51f77d6f9be31ce333b6bb9a59134a2fe9d9333e04516502619646d3350d40c33ed6a4ac26d41aec1452d893a2a183e2c368f471be09ab53a4ebac84f6d57b6b6f2a898b94");

INSERT INTO statistics(user_id) VALUES (2);


INSERT INTO user(username, email, password_hash, password_salt) 
VALUES("Nikola", 
		"nikola6@gmail.com", 
        "32f5481ff3e97ac727154adf90e7a90acce61ec07a4d8b6d5831b8597acad9c3ed899de42df6953387b3ae24474527ef62ee168b63528624489eeb7556776c25", 
        "f62fc60bc4bcbb3436112fe8f2ca11e450e939114b4a93500ec2bbecd825e138ef1eb39cd70e9f69233618e9b69aeccc0a9bc0bdfd362611edf1cd51f77d6f9be31ce333b6bb9a59134a2fe9d9333e04516502619646d3350d40c33ed6a4ac26d41aec1452d893a2a183e2c368f471be09ab53a4ebac84f6d57b6b6f2a898b94");

INSERT INTO statistics(user_id) VALUES (3);


INSERT INTO user(username, email, password_hash, password_salt) 
VALUES("Nemanja", 
		"nemanja6@gmail.com", 
        "32f5481ff3e97ac727154adf90e7a90acce61ec07a4d8b6d5831b8597acad9c3ed899de42df6953387b3ae24474527ef62ee168b63528624489eeb7556776c25", 
        "f62fc60bc4bcbb3436112fe8f2ca11e450e939114b4a93500ec2bbecd825e138ef1eb39cd70e9f69233618e9b69aeccc0a9bc0bdfd362611edf1cd51f77d6f9be31ce333b6bb9a59134a2fe9d9333e04516502619646d3350d40c33ed6a4ac26d41aec1452d893a2a183e2c368f471be09ab53a4ebac84f6d57b6b6f2a898b94");

INSERT INTO statistics(user_id) VALUES (4);


INSERT INTO user(username, email, password_hash, password_salt) 
VALUES("Jovan", "jovan6@gmail.com", "dcdcdcdccdc4dc45d564", "12346579898451");

INSERT INTO statistics(user_id) VALUES (5);

INSERT INTO user(username, email, password_hash, password_salt) 
VALUES("Jelena", "jelena6@gmail.com", "dc48d4c9c4d4cd484bbb", "abababaababababababababbababaab");

INSERT INTO statistics(user_id) VALUES (6);


INSERT INTO user(username, email, password_hash, password_salt) 
VALUES("Milica", "milica6@gmail.com", "4b84b65b651b556b151", "aaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbb");

INSERT INTO statistics(user_id) VALUES (7);


INSERT INTO user(username, email, password_hash, password_salt) 
VALUES("Petar", "petar6@gmail.com", "54f54f4f645f4f4f56", "dfdfdfffddffddfdfdfdfdfdfdfdfd");

INSERT INTO statistics(user_id) VALUES (8);


INSERT INTO user(username, email, password_hash, password_salt) 
VALUES("Marko", "marko6@gmail.com", "111111111111111aaaaa111111", "fffffffffffffffffffffffffffffff");

INSERT INTO admin VALUES (1);
INSERT INTO admin VALUES (2);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `restart_database` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `restart_database`()
BEGIN

CALL clear_database();

CALL restart_sequence();

CALL insert_users();
CALL fill_statistics_table();
CALL insert_other_users_tables();
CALL insert_pass_reset();
CALL insert_tokens();
CALL insert_maps_and_objects();

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `restart_sequence` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `restart_sequence`()
BEGIN

ALTER TABLE user AUTO_INCREMENT = 1;

ALTER TABLE cosmic_object AUTO_INCREMENT = 1;

ALTER TABLE game_map AUTO_INCREMENT = 1;

ALTER TABLE token AUTO_INCREMENT = 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-06 11:37:20
