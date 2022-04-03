-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Czas generowania: 27 Mar 2022, 11:21
-- Wersja serwera: 10.5.12-MariaDB
-- Wersja PHP: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `id18518892_monetki`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `flagi`
--

CREATE TABLE `flagi` (
  `id_flagi` int(11) NOT NULL,
  `sciezka_flagi` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `flagi`
--

INSERT INTO `flagi` (`id_flagi`, `sciezka_flagi`) VALUES
(3, 'Albania.jpg'),
(6, 'Algieria.jpg'),
(7, 'Australia.jpg'),
(8, 'Barbados.jpg'),
(11, 'Belgia.jpg'),
(12, 'Belize.jpg'),
(15, 'Bermudy.jpg'),
(16, 'Bhutan.jpg'),
(17, 'Boliwia.jpg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `main`
--

CREATE TABLE `main` (
  `id` int(11) NOT NULL,
  `id_flagi` int(11) NOT NULL,
  `nominal` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `nr_kat` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `id_stopu` int(11) NOT NULL,
  `rok` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `main`
--

INSERT INTO `main` (`id`, `id_flagi`, `nominal`, `nr_kat`, `id_stopu`, `rok`) VALUES
(1, 3, 'lek', 'km#75', 1, 1996),
(3, 6, 'centine', 'km#94', 1, 1964);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `materiały`
--

CREATE TABLE `materiały` (
  `id_materialu` int(11) NOT NULL,
  `material` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `materiały`
--

INSERT INTO `materiały` (`id_materialu`, `material`) VALUES
(1, 'copper'),
(2, 'alumiunum'),
(3, 'alumiunum-bronze'),
(6, 'bronze'),
(7, 'copper plated zink'),
(10, 'copper-nickel'),
(12, 'gold'),
(13, 'nickel bonded steel'),
(15, 'nickel clad steel'),
(16, 'silver'),
(17, 'stainless steel'),
(18, 'zinc');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `flagi`
--
ALTER TABLE `flagi`
  ADD PRIMARY KEY (`id_flagi`);

--
-- Indeksy dla tabeli `main`
--
ALTER TABLE `main`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_s` (`id_stopu`),
  ADD KEY `id_flagi` (`id_flagi`);

--
-- Indeksy dla tabeli `materiały`
--
ALTER TABLE `materiały`
  ADD PRIMARY KEY (`id_materialu`);

--
-- AUTO_INCREMENT dla tabel zrzutów
--

--
-- AUTO_INCREMENT dla tabeli `flagi`
--
ALTER TABLE `flagi`
  MODIFY `id_flagi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT dla tabeli `main`
--
ALTER TABLE `main`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `materiały`
--
ALTER TABLE `materiały`
  MODIFY `id_materialu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `main`
--
ALTER TABLE `main`
  ADD CONSTRAINT `main_ibfk_1` FOREIGN KEY (`id_stopu`) REFERENCES `materiały` (`id_materialu`),
  ADD CONSTRAINT `main_ibfk_2` FOREIGN KEY (`id_flagi`) REFERENCES `flagi` (`id_flagi`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
