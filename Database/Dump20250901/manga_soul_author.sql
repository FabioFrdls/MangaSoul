-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: manga_soul
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `birthdate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'Kentaro Miura','1966-07-11'),(2,'Naoki Urasawa','1960-01-02'),(3,'Khoei Horikoshi','1986-11-20'),(4,'Yūki Tabata','1984-07-30'),(5,'Eiichirō Oda','1975-01-01'),(6,'Hiromu Arakawa','1973-05-08'),(7,'Yoshihiro Togashi','1966-04-27'),(8,'Masashi Kishimoto','1974-11-08'),(9,'Tite Kubo','1977-06-26'),(10,'Daiki Kobayashi','1991-09-23'),(11,'Aka Akasaka','1988-08-29'),(12,'One','1986-10-28'),(13,'Hiro Mashima','1977-05-03'),(14,'Hajime Isayama','1986-08-29'),(15,'Shinobu Ōtaka','1983-05-09'),(16,'Osamu Tezuka','1928-11-03'),(17,'Yu Aida','1977-11-08'),(18,'Yana Toboso','1984-01-24'),(19,'Rei Hiroe','1972-12-05'),(20,'Kazuki Takahashi','1961-10-04'),(21,'Gō Nagai','1945-09-06'),(22,'Atsushi Ōkubo','1979-09-20'),(23,'Makoto Yukimura','1976-05-08'),(24,'Tatsuki Fujimoto','1993-10-10'),(25,'Yūji Kaku','1984-12-20'),(26,'Junji Itō','1963-07-31'),(27,'Gege Akutami','1992-02-26'),(28,'Hirohiko Araki','1960-06-07'),(29,'Katsuhiro Ōtomo','1954-04-15'),(30,'Akira Toriyama','1955-04-05');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-01 23:27:33
