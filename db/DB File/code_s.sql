-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2022 at 06:36 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `code_s`
--

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `id` bigint(10) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `password` varchar(240) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `suspicious` varchar(20) DEFAULT NULL,
  `deleted` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`, `suspicious`, `deleted`) VALUES
(1, 'Test ', 'Test@gmail.com', '$2a$10$dTtHyMjy2/.tuOrhq3QkwOkU8an2DUX12Q9U/euUc/.H8IFRmCl4a', NULL, NULL, NULL, NULL),
(2, 'Test ', 'Test1@gmail.com', '$2a$10$BC/Fii4coMGe09KpB1n/Mu2q8rBhwXs8IGyCwXXNTHbOqaQFt1NJ6', '2022-12-19', NULL, NULL, NULL),
(3, 'Raju Powar ', 'RajuPowar@gmail.com', '$2a$10$AFGi45GQLNEsFAYLWDVSAO5OF4PwZaI2Ic9tolItHJAw8DH0zTAlS', '2022-12-19', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_master`
--

CREATE TABLE `user_master` (
  `id` bigint(10) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` bigint(12) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `designation` longtext,
  `is_default` tinyint(4) DEFAULT '0',
  `is_on` tinyint(4) DEFAULT '1',
  `is_active` tinyint(4) DEFAULT '1',
  `created_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `delete_remark` varchar(200) DEFAULT NULL,
  `last_changed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_master`
--

INSERT INTO `user_master` (`id`, `name`, `email`, `phone`, `password`, `designation`, `is_default`, `is_on`, `is_active`, `created_date`, `created_by`, `modified_date`, `modified_by`, `deleted_date`, `deleted_by`, `delete_remark`, `last_changed`) VALUES
(1, 'OmkarMane', 'OmkarMane@gamil.com', 7020898810, '$2a$10$KZXh6.Xggn9HqA5JuX40NOJtD.nIzI0qh2NGk19bXGTkqnhccC.WW', 'OmkarMane1@gamil.com', 0, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-18 06:32:29'),
(2, 'Raju', 'OmkarMane1@gamil.com', 7020898820, '$2a$10$X/8lVeDxudArruj6XY8IoOYfIy7hyRF0CVGq9XInQaB69mEMT0V.a', 'HIi raju  i am form Kolhaour', 0, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-18 06:33:01'),
(3, 'Omkar', 'OmkarMane2@gamil.com', 7020898857, '$2a$10$49TmO5fhj4e1hPcOnMm2LuieEuzVS3SA2RCtxGo1tg6btB8d3p.KS', 'OmkarMane@gamil.com', 0, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-18 06:33:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_master`
--
ALTER TABLE `user_master`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_master`
--
ALTER TABLE `user_master`
  MODIFY `id` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
