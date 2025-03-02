-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: wdcpa
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `wdcpa`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `wdcpa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `wdcpa`;

--
-- Table structure for table `animalType`
--

DROP TABLE IF EXISTS `animalType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animalType` (
  `typeID` smallint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animalType`
--

LOCK TABLES `animalType` WRITE;
/*!40000 ALTER TABLE `animalType` DISABLE KEYS */;
INSERT INTO `animalType` VALUES (1,'dog'),(2,'cat'),(3,'bunny');
/*!40000 ALTER TABLE `animalType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animals`
--

DROP TABLE IF EXISTS `animals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals` (
  `animalID` smallint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `age` varchar(30) NOT NULL,
  `animalTypeID` smallint unsigned NOT NULL,
  `personality` text NOT NULL,
  `locationID` smallint unsigned NOT NULL,
  `breed` varchar(50) DEFAULT NULL,
  `currFostered` tinyint(1) NOT NULL,
  `gender` varchar(10) NOT NULL,
  PRIMARY KEY (`animalID`),
  KEY `FK_animals_location` (`locationID`),
  KEY `FK_animals_animalType` (`animalTypeID`),
  CONSTRAINT `FK_animals_animalType` FOREIGN KEY (`animalTypeID`) REFERENCES `animalType` (`typeID`),
  CONSTRAINT `FK_animals_location` FOREIGN KEY (`locationID`) REFERENCES `location` (`locationID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animals`
--

LOCK TABLES `animals` WRITE;
/*!40000 ALTER TABLE `animals` DISABLE KEYS */;
INSERT INTO `animals` VALUES (1,'Sunny','12 months',1,'Silly',1,'Golden Retriever',0,'Male'),(2,'Cotton','7 months',3,'Jumpy',2,'Rabbit',1,'Female'),(3,'Mango','2 years',2,'Playful',3,'Shorthair',0,'Female'),(4,'Snowy','16 months',1,'Smart',1,'Terrier',1,'Male'),(5,'Jellie','12 years',2,'Polite',2,'Tabby',1,'Female');
/*!40000 ALTER TABLE `animals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventType`
--

DROP TABLE IF EXISTS `eventType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventType` (
  `eventTypeID` smallint unsigned NOT NULL AUTO_INCREMENT,
  `eventType` varchar(100) NOT NULL,
  PRIMARY KEY (`eventTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventType`
--

LOCK TABLES `eventType` WRITE;
/*!40000 ALTER TABLE `eventType` DISABLE KEYS */;
INSERT INTO `eventType` VALUES (1,'All Day'),(2,'Multi-Day'),(3,'Start Time to End Time');
/*!40000 ALTER TABLE `eventType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `eventID` smallint unsigned NOT NULL AUTO_INCREMENT,
  `dateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `locationID` smallint unsigned NOT NULL,
  `eventTypeID` smallint unsigned NOT NULL,
  `description` text NOT NULL,
  `rsvpRequired` tinyint(1) NOT NULL,
  `eventName` varchar(40) NOT NULL,
  PRIMARY KEY (`eventID`),
  KEY `FK_events_location` (`locationID`),
  KEY `FK_events_eventType` (`eventTypeID`),
  CONSTRAINT `FK_events_eventType` FOREIGN KEY (`eventTypeID`) REFERENCES `eventType` (`eventTypeID`),
  CONSTRAINT `FK_events_location` FOREIGN KEY (`locationID`) REFERENCES `location` (`locationID`),
  CONSTRAINT `CK_events_str` CHECK (((`eventName` <> _utf8mb4'') and (`description` <> _utf8mb4'')))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (4,'2024-06-20 14:30:00',1,1,'Come adopt a dog with us',0,'Adopt a Dog Day'),(5,'2024-07-12 10:30:00',2,1,'Come adopt a cat with us',0,'Adopt a Cat Day'),(6,'2024-08-07 10:00:00',3,1,'Come adopt a bunny with us',0,'Adopt a Bunny Day'),(7,'2024-07-25 13:00:00',1,3,'Adopt a furry friend',1,'Adopt a Dog Day');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foster`
--

DROP TABLE IF EXISTS `foster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foster` (
  `fosterID` smallint unsigned NOT NULL AUTO_INCREMENT,
  `userID` smallint unsigned NOT NULL,
  `animalID` smallint unsigned NOT NULL,
  `startTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL,
  `endTime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`fosterID`),
  KEY `FK_foster_user` (`userID`),
  KEY `FK_foster_animals` (`animalID`),
  CONSTRAINT `FK_foster_animals` FOREIGN KEY (`animalID`) REFERENCES `animals` (`animalID`),
  CONSTRAINT `FK_foster_user` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foster`
--

LOCK TABLES `foster` WRITE;
/*!40000 ALTER TABLE `foster` DISABLE KEYS */;
/*!40000 ALTER TABLE `foster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `locationID` smallint unsigned NOT NULL AUTO_INCREMENT,
  `location` varchar(30) NOT NULL,
  `streetNumber` smallint NOT NULL,
  `streetName` varchar(30) NOT NULL,
  `suburb` varchar(30) NOT NULL,
  `state` varchar(40) NOT NULL,
  `city` varchar(40) NOT NULL,
  PRIMARY KEY (`locationID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Northern Adelaide Shelter',7,'John Road','North Adelaide','South Australia','Adelaide'),(2,'Chatswood Shelter',98,'Fleet Street','Chatswood','New South Wales','Sydney'),(3,'Marborough Shelter',32,'Pat Circuit','Marborough','Victoria','Melbourne');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pos`
--

DROP TABLE IF EXISTS `pos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pos` (
  `posID` smallint unsigned NOT NULL AUTO_INCREMENT,
  `pos` varchar(50) NOT NULL,
  PRIMARY KEY (`posID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pos`
--

LOCK TABLES `pos` WRITE;
/*!40000 ALTER TABLE `pos` DISABLE KEYS */;
INSERT INTO `pos` VALUES (1,'admin'),(2,'manager'),(3,'volunteer');
/*!40000 ALTER TABLE `pos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `postID` smallint unsigned NOT NULL AUTO_INCREMENT,
  `dateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `message` text NOT NULL,
  `postTitle` varchar(255) NOT NULL,
  `userID` smallint unsigned NOT NULL,
  `private` tinyint(1) NOT NULL,
  PRIMARY KEY (`postID`),
  KEY `FK_post_user` (`userID`),
  CONSTRAINT `FK_post_user` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`),
  CONSTRAINT `CK_post_str` CHECK (((`postTitle` <> _utf8mb4'') and (`message` <> _utf8mb4'')))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (5,'2024-06-13 10:22:27','This is the first post on WDCPA!','First post!',6,0);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rsvp`
--

DROP TABLE IF EXISTS `rsvp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rsvp` (
  `rspvID` smallint unsigned NOT NULL AUTO_INCREMENT,
  `userID` smallint unsigned NOT NULL,
  `eventID` smallint unsigned NOT NULL,
  PRIMARY KEY (`rspvID`),
  KEY `FK_rsvp_user` (`userID`),
  KEY `FK_rsvp_event` (`eventID`),
  CONSTRAINT `FK_rsvp_event` FOREIGN KEY (`eventID`) REFERENCES `events` (`eventID`),
  CONSTRAINT `FK_rsvp_user` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rsvp`
--

LOCK TABLES `rsvp` WRITE;
/*!40000 ALTER TABLE `rsvp` DISABLE KEYS */;
INSERT INTO `rsvp` VALUES (2,6,5);
/*!40000 ALTER TABLE `rsvp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('D0GCXS3yTOSFMWvdIIHqJqMI78LNc_-R',1718411901,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-06-15T00:36:18.459Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribe`
--

DROP TABLE IF EXISTS `subscribe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscribe` (
  `subscribeID` smallint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`subscribeID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribe`
--

LOCK TABLES `subscribe` WRITE;
/*!40000 ALTER TABLE `subscribe` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscribe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userID` smallint unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `locationID` smallint unsigned NOT NULL,
  `phone` char(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `bio` text,
  `currFoster` tinyint(1) NOT NULL DEFAULT '0',
  `posID` smallint unsigned NOT NULL DEFAULT '3',
  `hash` char(60) NOT NULL,
  PRIMARY KEY (`userID`),
  KEY `FK_user_location` (`locationID`),
  KEY `FK_user_pos` (`posID`),
  CONSTRAINT `FK_user_location` FOREIGN KEY (`locationID`) REFERENCES `location` (`locationID`),
  CONSTRAINT `FK_user_pos` FOREIGN KEY (`posID`) REFERENCES `pos` (`posID`),
  CONSTRAINT `CHK_all` CHECK (((`firstName` <> _utf8mb4'') and (`lastName` <> _utf8mb4'') and (`phone` <> _utf8mb4'') and (`email` <> _utf8mb4'') and (`hash` <> _utf8mb4''))),
  CONSTRAINT `chk_email` CHECK ((`email` like _utf8mb4'%_@__%.__%'))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'John','Smith',1,'0412345678','johnsmith@email.com',NULL,0,3,'$2b$10$P/vOA2QN3uo1si1iKE5ba.vwBWfDx8o3ZcTclzOzul2iACYgeUGMq'),(9,'Amy','Willis',2,'0412345678','amywill@email.com',NULL,0,1,'$2b$10$6d.hlnC3ntbBk.Y/jKS1QumAP7PrauKMGDRV..NLwMVildPmy8sOO'),(10,'Jenny','Penny',1,'0512345678','jenpen@email.com',NULL,0,3,'$2b$10$xptEtAiVmudd4hPs21lavuLR4AIGIxDRlXoNBLWfW/Qh52dH37hrK');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-14  0:38:34
