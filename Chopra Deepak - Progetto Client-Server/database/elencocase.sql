-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 26, 2020 alle 22:04
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elencocase`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `garage`
--

CREATE TABLE IF NOT EXISTS `garage` (
  `cGarage` int(11) NOT NULL AUTO_INCREMENT,
  `Indirizzo` varchar(255) NOT NULL,
  `Tipo` varchar(255) NOT NULL,
  `Prezzo` float NOT NULL,
  `Posti Auto` int(11) NOT NULL,
  PRIMARY KEY (`cGarage`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `garage`
--

INSERT INTO `garage` (`cGarage`, `Indirizzo`, `Tipo`, `Prezzo`, `Posti Auto`) VALUES
(1, 'Via Vandalino 106, Torino', 'Box o garage', 13000, 3),
(2, 'Via Goffredo Casalis, 73, Torino', 'Garage', 29000, 5),
(3, 'Corso Cesare Correnti 77, Torino', 'Garage', 15000, 4),
(4, 'Via Barletta 107, Torino', 'Box o garage', 22000, 4);

-- --------------------------------------------------------

--
-- Struttura della tabella `homes`
--

CREATE TABLE IF NOT EXISTS `homes` (
  `cCasa` int(11) NOT NULL AUTO_INCREMENT,
  `Indirizzo` varchar(255) NOT NULL,
  `Tipo` varchar(255) NOT NULL,
  `Piano` int(11) NOT NULL,
  `Prezzo` float NOT NULL,
  `Posti Auto` int(11) NOT NULL,
  UNIQUE KEY `cCasa` (`cCasa`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `homes`
--

INSERT INTO `homes` (`cCasa`, `Indirizzo`, `Tipo`, `Piano`, `Prezzo`, `Posti Auto`) VALUES
(1, 'Via Buenos Aires 96, Torino', 'Trilocale', 5, 138000, 1),
(2, 'Via Plava 163, Torino', 'Appartamento', 4, 85000, 2),
(4, 'Via San Marino 92, Torino', 'Trilocale', 6, 155000, 0),
(5, 'Via Santa Maria Mazzarello 86, Torino', 'Bilocale', 7, 105000, 1),
(8, 'Corso Monte Cucco 130, Torino', 'Quadrilocale', 6, 650, 1),
(9, 'Via Guido Reni 139, Torino', 'Quadrilocale', 2, 135000, 1),
(10, 'Via Tolmino 43, Torino', 'Trilocale', 8, 165000, 1),
(11, 'Via Chambéry 61, Torino', 'Bilocale', 1, 420000, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
