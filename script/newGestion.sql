CREATE DATABASE  IF NOT EXISTS `gestion` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `gestion`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gestion
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `asignaciones`
--

DROP TABLE IF EXISTS `asignaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaciones` (
  `id_asignaciones` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT current_timestamp(),
  `repartidor_id` int(11) DEFAULT NULL,
  `estudiante_id` int(11) DEFAULT NULL,
  `id_material` int(11) DEFAULT NULL,
  `estado_material` enum('Entregado','No Entregado') NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_asignaciones`),
  KEY `fk_asignaciones_usuarios1_idx` (`repartidor_id`),
  KEY `fk_asignaciones_materiales1_idx` (`id_material`),
  KEY `fk_asignaciones_usuarios2_idx` (`estudiante_id`),
  CONSTRAINT `fk_asignaciones_materiales1` FOREIGN KEY (`id_material`) REFERENCES `materiales` (`id_material`),
  CONSTRAINT `fk_asignaciones_usuarios1` FOREIGN KEY (`repartidor_id`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `fk_asignaciones_usuarios2` FOREIGN KEY (`estudiante_id`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaciones`
--

LOCK TABLES `asignaciones` WRITE;
/*!40000 ALTER TABLE `asignaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `asignaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materiales`
--

DROP TABLE IF EXISTS `materiales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materiales` (
  `id_material` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion_material` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id_material`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materiales`
--

LOCK TABLES `materiales` WRITE;
/*!40000 ALTER TABLE `materiales` DISABLE KEYS */;
INSERT INTO `materiales` VALUES (1,'Cuaderno','Cuaderno Argollado Norma'),(2,'Lapiz','Lapiz B2'),(3,'Reloj','Reloj de Mano'),(4,'Regla','Regla de Ben 10'),(5,'Color Rojo','Color Rojo Norma'),(6,'Color Verde','Color Verde Norma'),(7,'Cuaderno Pequeño','De ben 10'),(8,'Teclado','Negro'),(9,'Iphone','11'),(10,'Andoid','Samsung'),(11,'Andoid','Samsung'),(12,'Andoid','Samsung'),(13,'Andoid','Samsung'),(14,'Pc','pc'),(15,'Lapiz','dfsdf'),(16,'Lapiz','asfasf'),(17,'Lapiz','asfasf'),(18,'Lapiz','Uno nuevo'),(19,'Lapiz','fsafas'),(20,'Casa de Papel','Es de Papel');
/*!40000 ALTER TABLE `materiales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulos`
--

DROP TABLE IF EXISTS `modulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modulos` (
  `id_modulo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_modulo` varchar(60) NOT NULL,
  `descripcion_modulo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_modulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulos`
--

LOCK TABLES `modulos` WRITE;
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */;
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(60) NOT NULL,
  `descripcion_rol` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador','Encargado de gestionar usuarios y crear materiales'),(2,'Repartidor','Encargado de gestionar materiales a los estudiantes'),(3,'Estudiante','Rol al que se le asignan maaeriales');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolesxmodulos`
--

DROP TABLE IF EXISTS `rolesxmodulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolesxmodulos` (
  `id_rol` int(11) NOT NULL,
  `id_modulo` int(11) NOT NULL,
  KEY `fk_rolesxmodulos_roles1_idx` (`id_rol`),
  KEY `fk_rolesxmodulos_modulos1_idx` (`id_modulo`),
  CONSTRAINT `fk_rolesxmodulos_modulos1` FOREIGN KEY (`id_modulo`) REFERENCES `modulos` (`id_modulo`),
  CONSTRAINT `fk_rolesxmodulos_roles1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolesxmodulos`
--

LOCK TABLES `rolesxmodulos` WRITE;
/*!40000 ALTER TABLE `rolesxmodulos` DISABLE KEYS */;
/*!40000 ALTER TABLE `rolesxmodulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombres_usuario` varchar(45) NOT NULL,
  `apellidos_usuario` varchar(45) NOT NULL,
  `email_usuario` varchar(60) NOT NULL,
  `password_usuario` varchar(120) NOT NULL,
  `roles_id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_usuarios_roles_idx` (`roles_id_rol`),
  CONSTRAINT `fk_usuarios_roles` FOREIGN KEY (`roles_id_rol`) REFERENCES `roles` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Aldair','AY DOO','aldair@gmail.com','$2b$10$D3U9zU3J8tk1CfE7gQ0PvOf2TkLtmU.eGPgDb/4G80HBH838cTUKm',1),(2,'Aldair','Aldair','aldair@gmail.com','$2b$10$sS5N5Ds.UR/Ng6A6PIvzOuoweB7IdT3XKtQXXTF8VwkYiFozqG2em',2),(3,'Jose ','Angulo','jose@gmail.com','$2b$10$4HHgW1M8NWzbAyU0.qdDUu7ixXExQqo4vxWov70Z0yM6jjm8tleiS',1),(4,'Camila','camila','camila@gmail.com','$2b$10$nbo8OA/lvaLWdXCLbTne7eHMfr8qxf7ZNAFlDBGt1saZnNC9I0cOu',3);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'gestion'
--

--
-- Dumping routines for database 'gestion'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-26 18:04:53
