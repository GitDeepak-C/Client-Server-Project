-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 03, 2020 alle 20:01
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
CREATE DATABASE IF NOT EXISTS `elencocase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `elencocase`;

-- --------------------------------------------------------

--
-- Struttura della tabella `proprieta`
--

CREATE TABLE `proprieta` (
  `idProprieta` int(11) NOT NULL,
  `Indirizzo` varchar(255) NOT NULL,
  `Tipo` varchar(255) NOT NULL,
  `Piano` int(11) NOT NULL,
  `Prezzo` float NOT NULL,
  `Posti Auto` int(11) NOT NULL,
  `Acquistata` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `proprieta`
--

INSERT INTO `proprieta` (`idProprieta`, `Indirizzo`, `Tipo`, `Piano`, `Prezzo`, `Posti Auto`, `Acquistata`) VALUES
(1, 'Via Buenos Aires 96, Torino', 'Trilocale', 5, 138000, 1, 1),
(2, 'Via Plava 163, Torino', 'Quadrilocale', 4, 85000, 2, 0),
(3, 'Via San Marino 92, Torino', 'Trilocale', 6, 155000, 0, 0),
(4, 'Via Santa Maria Mazzarello 86, Torino', 'Bilocale', 7, 105000, 1, 0),
(5, 'Corso Monte Cucco 130, Torino', 'Quadrilocale', 6, 650, 1, 0),
(6, 'Via Guido Reni 139, Torino', 'Quadrilocale', 2, 135000, 1, 0),
(7, 'Via Tolmino 43, Torino', 'Trilocale', 8, 165000, 1, 0),
(8, 'Via Chambéry 61, Torino', 'Bilocale', 1, 420000, 0, 0),
(9, 'Via Vandalino 106, Torino', 'Garage', 0, 13000, 3, 0),
(10, 'Via Goffredo Casalis, 73, Torino', 'Garage', 0, 29000, 5, 0),
(11, 'Corso Cesare Correnti 77, Torino', 'Garage', 0, 15000, 4, 0),
(12, 'Via Barletta 107, Torino', 'Garage', 0, 22000, 4, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
--

CREATE TABLE `user` (
  `cUser` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nProprieta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `user`
--

INSERT INTO `user` (`cUser`, `username`, `nome`, `cognome`, `password`, `nProprieta`) VALUES
(1, 'admin', '', '', '21232f297a57a5a743894a0e4a801fc3', 0),
(14, 'deepak.chopra', 'Deepak', 'Chopra', '5f4dcc3b5aa765d61d8327deb882cf99', 0),
(15, 'Barby', 'Albert', 'Barbero', '487f7b22f68312d2c1bbc93b1aea445b', 0),
(45, 'jumbo', 'jumboNome', 'jumboCognome', '5f4dcc3b5aa765d61d8327deb882cf99', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `vendite`
--

CREATE TABLE `vendite` (
  `cVendita` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Cognome` varchar(255) NOT NULL,
  `Indirizzo` varchar(255) NOT NULL,
  `idProprieta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `vendite`
--

INSERT INTO `vendite` (`cVendita`, `username`, `Nome`, `Cognome`, `Indirizzo`, `idProprieta`) VALUES
(11, 'deepak.chopra', 'Deepak', 'Chopra', 'Via Buenos Aires 96, Torino', 1);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `proprieta`
--
ALTER TABLE `proprieta`
  ADD UNIQUE KEY `cCasa` (`idProprieta`);

--
-- Indici per le tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`cUser`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indici per le tabelle `vendite`
--
ALTER TABLE `vendite`
  ADD PRIMARY KEY (`cVendita`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `proprieta`
--
ALTER TABLE `proprieta`
  MODIFY `idProprieta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT per la tabella `user`
--
ALTER TABLE `user`
  MODIFY `cUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT per la tabella `vendite`
--
ALTER TABLE `vendite`
  MODIFY `cVendita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
