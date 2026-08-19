-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 19, 2026 at 06:19 AM
-- Server version: 11.8.8-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u845575121_ceo`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
  `id` int(11) NOT NULL,
  `entity` varchar(30) NOT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `body` varchar(255) NOT NULL,
  `tone` varchar(20) DEFAULT 'indigo',
  `author` varchar(120) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `activity_log`
--

INSERT INTO `activity_log` (`id`, `entity`, `entity_id`, `body`, `tone`, `author`, `created_at`) VALUES
(1, 'client', 1, 'Client created', 'indigo', 'Deepak Kashyap', '2026-08-15 14:12:56'),
(2, 'employee', 1, 'Employee added', 'indigo', 'Deepak Kashyap', '2026-08-15 14:47:45'),
(3, 'document', 1, 'Document uploaded: Digital Hikers Udyam Registration Certificate.pdf', 'blue', 'Deepak Kashyap', '2026-08-15 15:22:09'),
(4, 'invoice', 2147483647, 'Invoice INV-2026-001 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 17:05:51'),
(5, 'invoice', 2147483647, 'Invoice INV-2026-001 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 17:06:14'),
(6, 'invoice', 2147483647, 'Status changed to Sent', 'amber', 'Deepak Kashyap', '2026-08-15 17:06:18'),
(7, 'invoice', 2147483647, 'Status changed to Pending', 'amber', 'Deepak Kashyap', '2026-08-15 17:06:22'),
(8, 'invoice', 2147483647, 'Invoice INV-2026-001 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 17:13:03'),
(9, 'invoice', 2147483647, 'Invoice INV-2026-001 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 17:13:59'),
(10, 'invoice', 2147483647, 'Status changed to Cancelled', 'amber', 'Deepak Kashyap', '2026-08-15 17:14:02'),
(11, 'invoice', 2147483647, 'Invoice INV-2026-001 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 17:33:21'),
(12, 'client', 2, 'Client created', 'indigo', 'Deepak Kashyap', '2026-08-15 17:34:14'),
(13, 'invoice', 2147483647, 'Invoice INV-2026-001 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 17:39:39'),
(14, 'invoice', 1, 'Invoice INV-2026-001 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 18:10:58'),
(15, 'invoice', 1, 'Status changed to Sent', 'amber', 'Deepak Kashyap', '2026-08-15 18:11:07'),
(16, 'invoice', 1, 'Status changed to Pending', 'amber', 'Deepak Kashyap', '2026-08-15 18:11:08'),
(17, 'invoice', 1, 'Status changed to Overdue', 'amber', 'Deepak Kashyap', '2026-08-15 18:11:17'),
(18, 'invoice', 1, 'Invoice INV-2026-001 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 18:11:27'),
(19, 'invoice', 2, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 18:11:55'),
(20, 'invoice', 2, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-15 18:12:06'),
(21, 'invoice', 2, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-15 18:12:21'),
(22, 'invoice', 2, 'Status changed to Sent', 'amber', 'Deepak Kashyap', '2026-08-15 18:13:05'),
(23, 'invoice', 2, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 18:13:41'),
(24, 'invoice', 2, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 18:14:02'),
(25, 'invoice', 2, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-15 18:14:19'),
(26, 'invoice', 1, 'Invoice INV-2026-001 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 18:15:29'),
(27, 'invoice', 2, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 18:44:45'),
(28, 'document', 2, 'Document uploaded: Full Udyam Registration Certificate (4 Page).pdf', 'blue', 'Deepak Kashyap', '2026-08-15 18:45:48'),
(29, 'document', 3, 'Document uploaded: Digital Hikers IEC.pdf', 'blue', 'Deepak Kashyap', '2026-08-15 18:45:55'),
(30, 'settings', NULL, 'Settings updated', 'amber', 'Deepak Kashyap', '2026-08-15 18:48:16'),
(31, 'invoice', 2, 'Status changed to Overdue', 'amber', 'Deepak Kashyap', '2026-08-15 18:48:48'),
(32, 'invoice', 2, 'Status changed to Pending', 'amber', 'Deepak Kashyap', '2026-08-15 18:48:50'),
(33, 'invoice', 2, 'Status changed to Sent', 'amber', 'Deepak Kashyap', '2026-08-15 18:48:51'),
(34, 'invoice', 2, 'Status changed to Draft', 'amber', 'Deepak Kashyap', '2026-08-15 18:48:52'),
(35, 'settings', NULL, 'Settings updated', 'amber', 'Deepak Kashyap', '2026-08-15 19:43:48'),
(36, 'settings', NULL, 'Settings updated', 'amber', 'Deepak Kashyap', '2026-08-15 19:43:50'),
(37, 'settings', NULL, 'Settings updated', 'amber', 'Deepak Kashyap', '2026-08-15 19:43:51'),
(38, 'settings', NULL, 'Settings updated', 'amber', 'Deepak Kashyap', '2026-08-15 19:44:44'),
(39, 'invoice', 2, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-15 19:46:08'),
(40, 'invoice', 2, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-16 22:57:59'),
(41, 'invoice', 2, 'Status changed to Draft', 'amber', 'Deepak Kashyap', '2026-08-16 22:58:01'),
(42, 'invoice', 2, 'Status changed to Sent', 'amber', 'Deepak Kashyap', '2026-08-16 22:58:02'),
(43, 'invoice', 2, 'Status changed to Pending', 'amber', 'Deepak Kashyap', '2026-08-16 22:58:05'),
(44, 'invoice', 2, 'Status changed to Sent', 'amber', 'Deepak Kashyap', '2026-08-16 22:58:06'),
(45, 'invoice', 2, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-16 22:58:26'),
(46, 'invoice', 2, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-16 23:00:20'),
(47, 'invoice', 2, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-16 23:17:28'),
(48, 'invoice', 2, 'Status changed to Draft', 'amber', 'Deepak Kashyap', '2026-08-16 23:18:45'),
(49, 'invoice', 2, 'Status changed to Sent', 'amber', 'Deepak Kashyap', '2026-08-16 23:18:47'),
(50, 'invoice', 2, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-16 23:19:01'),
(51, 'invoice', 2, 'Status changed to Sent', 'amber', 'Deepak Kashyap', '2026-08-17 01:39:54'),
(52, 'invoice', 3, 'Invoice INV-2026-003 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 01:40:48'),
(53, 'invoice', 3, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-17 01:41:30'),
(54, 'invoice', 3, 'Invoice INV-2026-003 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 01:41:51'),
(55, 'invoice', 3, 'Status changed to Draft', 'amber', 'Deepak Kashyap', '2026-08-17 01:42:08'),
(56, 'invoice', 3, 'Status changed to Sent', 'amber', 'Deepak Kashyap', '2026-08-17 01:42:09'),
(57, 'invoice', 3, 'Invoice INV-2026-003 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 01:42:21'),
(58, 'invoice', 3, 'Invoice INV-2026-003 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 06:23:34'),
(59, 'invoice', 3, 'Status changed to Draft', 'amber', 'Deepak Kashyap', '2026-08-17 06:23:44'),
(60, 'invoice', 2, 'Status changed to Pending', 'amber', 'Deepak Kashyap', '2026-08-17 06:24:31'),
(61, 'invoice', 3, 'Status changed to Pending', 'amber', 'Deepak Kashyap', '2026-08-17 06:24:38'),
(62, 'employee', 1, 'Employee updated', 'amber', 'Deepak Kashyap', '2026-08-17 06:52:47'),
(63, 'invoice', 3, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-17 08:27:46'),
(64, 'client', 1, 'Client deleted', 'red', 'Deepak Kashyap', '2026-08-17 08:27:54'),
(65, 'invoice', 2, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-17 08:28:06'),
(66, 'client', 3, 'Client created', 'indigo', 'Deepak Kashyap', '2026-08-17 08:36:12'),
(67, 'client', 3, 'Client archived', 'red', 'Deepak Kashyap', '2026-08-17 11:11:12'),
(68, 'invoice', 4, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 11:11:43'),
(69, 'employee', 1, 'Employee removed', 'red', 'Deepak Kashyap', '2026-08-17 11:11:55'),
(70, 'invoice', 4, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-17 11:12:24'),
(71, 'employee', 2, 'Employee added', 'indigo', 'Deepak Kashyap', '2026-08-17 11:20:52'),
(72, 'employee', 3, 'Employee added', 'indigo', 'Deepak Kashyap', '2026-08-17 11:22:09'),
(73, 'employee', 2, 'Employee updated', 'amber', 'Deepak Kashyap', '2026-08-17 11:22:21'),
(74, 'payroll', 1, 'Salary slip generated', 'indigo', 'Deepak Kashyap', '2026-08-17 11:22:40'),
(75, 'payroll', 1, 'Salary marked as paid', 'green', 'Deepak Kashyap', '2026-08-17 11:23:05'),
(76, 'payroll', 1, 'Salary marked as paid', 'green', 'Deepak Kashyap', '2026-08-17 11:23:21'),
(77, 'payroll', 2, 'Salary slip generated', 'indigo', 'Deepak Kashyap', '2026-08-17 11:23:36'),
(78, 'payroll', 2, 'Salary marked as paid', 'green', 'Deepak Kashyap', '2026-08-17 11:23:49'),
(79, 'invoice', 4, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 12:01:59'),
(80, 'invoice', 4, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 12:02:16'),
(81, 'invoice', 4, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 12:07:41'),
(82, 'invoice', 4, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 12:07:53'),
(83, 'invoice', 4, 'Status changed to Sent', 'amber', 'Deepak Kashyap', '2026-08-17 12:08:13'),
(84, 'invoice', 4, 'Status changed to Pending', 'amber', 'Deepak Kashyap', '2026-08-17 12:08:14'),
(85, 'invoice', 4, 'Status changed to Overdue', 'amber', 'Deepak Kashyap', '2026-08-17 12:08:15'),
(86, 'invoice', 4, 'Status changed to Cancelled', 'amber', 'Deepak Kashyap', '2026-08-17 12:08:16'),
(87, 'invoice', 5, 'Invoice INV-2026-003 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 12:09:38'),
(88, 'invoice', 5, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-17 12:09:45'),
(89, 'invoice', 6, 'Invoice INV-2026-004 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 12:50:14'),
(90, 'invoice', 6, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-17 12:50:34'),
(91, 'client', 4, 'Client created', 'indigo', 'Deepak Kashyap', '2026-08-17 12:51:19'),
(92, 'invoice', 7, 'Invoice INV-2026-005 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 12:52:49'),
(93, 'invoice', 7, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-17 12:59:16'),
(94, 'settings', NULL, 'Settings updated', 'amber', 'Deepak Kashyap', '2026-08-17 13:01:23'),
(95, 'invoice', 8, 'Invoice INV-2026-006 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 13:02:08'),
(96, 'invoice', 8, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-17 13:02:26'),
(97, 'payroll', 3, 'Salary slip generated', 'indigo', 'Deepak Kashyap', '2026-08-17 13:03:30'),
(98, 'payroll', 3, 'Salary marked as paid', 'green', 'Deepak Kashyap', '2026-08-17 13:03:37'),
(99, 'payroll', 4, 'Salary slip generated', 'indigo', 'Deepak Kashyap', '2026-08-17 13:03:49'),
(100, 'payroll', 4, 'Salary marked as paid', 'green', 'Deepak Kashyap', '2026-08-17 13:03:52'),
(101, 'invoice', 4, 'Status changed to Pending', 'amber', 'Deepak Kashyap', '2026-08-17 13:04:47'),
(102, 'invoice', 4, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 13:05:08'),
(103, 'invoice', 4, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-17 13:05:11'),
(104, 'employee', 2, 'Employee removed', 'red', 'Deepak Kashyap', '2026-08-17 16:41:03'),
(105, 'client', 4, 'Client archived', 'red', 'Deepak Kashyap', '2026-08-17 16:42:39'),
(106, 'invoice', 7, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-17 16:51:51'),
(107, 'employee', 4, 'Employee added', 'indigo', 'Deepak Kashyap', '2026-08-17 16:53:31'),
(108, 'invoice', 10, 'Invoice INV-2026-007 saved', 'indigo', 'Deepak Kashyap', '2026-08-17 23:49:57'),
(109, 'document', 3, 'Document deleted: Digital Hikers IEC.pdf', 'red', 'Deepak Kashyap', '2026-08-17 23:59:37'),
(110, 'document', 2, 'Document deleted: Full Udyam Registration Certificate (4 Page).pdf', 'red', 'Deepak Kashyap', '2026-08-17 23:59:41'),
(111, 'document', 1, 'Document deleted: Digital Hikers Udyam Registration Certificate.pdf', 'red', 'Deepak Kashyap', '2026-08-17 23:59:44'),
(112, 'document', 4, 'Document uploaded: Telco Business Research.pdf', 'blue', 'Deepak Kashyap', '2026-08-17 23:59:54'),
(113, 'client', 2, 'Document uploaded: Telco Business Research.pdf', 'blue', 'Deepak Kashyap', '2026-08-18 09:29:36'),
(114, 'employee', 3, 'Document uploaded: Telco Business Research.pdf', 'blue', 'Deepak Kashyap', '2026-08-18 09:29:57'),
(115, 'document', 6, 'Document deleted: Telco Business Research.pdf', 'red', 'Deepak Kashyap', '2026-08-18 09:30:07'),
(116, 'client', 5, 'Client created', 'indigo', 'Deepak Kashyap', '2026-08-18 10:17:36'),
(117, 'client', 6, 'Client created', 'indigo', 'Deepak Kashyap', '2026-08-18 10:17:46'),
(118, 'employee', 5, 'Employee added', 'indigo', 'Deepak Kashyap', '2026-08-18 10:19:24'),
(119, 'invoice', 12, 'Invoice INV-2026-008 saved', 'indigo', 'Deepak Kashyap', '2026-08-18 10:21:50'),
(120, 'invoice', 12, 'Invoice INV-2026-008 saved', 'indigo', 'Deepak Kashyap', '2026-08-18 10:24:51'),
(121, 'invoice', 12, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-18 10:25:01'),
(122, 'invoice', 14, 'Invoice INV-2026-009 saved', 'indigo', 'Deepak Kashyap', '2026-08-18 10:33:27'),
(123, 'invoice', 14, 'Invoice INV-2026-009 saved', 'indigo', 'Deepak Kashyap', '2026-08-18 10:33:57'),
(124, 'invoice', 14, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-18 10:34:00'),
(125, 'settings', NULL, 'Settings updated', 'amber', 'Deepak Kashyap', '2026-08-18 10:36:18'),
(126, 'invoice', 16, 'Invoice INV-2026-010 saved', 'indigo', 'Deepak Kashyap', '2026-08-18 10:36:31'),
(127, 'invoice', 16, 'Invoice INV-2026-010 saved', 'indigo', 'Deepak Kashyap', '2026-08-18 11:51:02'),
(128, 'invoice', 16, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-18 11:51:13'),
(129, 'invoice', 14, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-18 11:54:55'),
(130, 'employee', 3, 'Employee removed', 'red', 'Deepak Kashyap', '2026-08-19 04:33:07'),
(131, 'invoice', 10, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-19 04:33:13'),
(132, 'invoice', 18, 'Invoice INV-2026-009 saved', 'indigo', 'Deepak Kashyap', '2026-08-19 04:33:35'),
(133, 'invoice', 21, 'Invoice INV-2026-011 saved', 'indigo', 'Deepak Kashyap', '2026-08-19 06:06:47'),
(134, 'invoice', 21, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-19 06:07:36'),
(135, 'invoice', 5, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-19 06:08:25'),
(136, 'invoice', 6, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-19 06:08:28'),
(137, 'invoice', 4, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-19 06:08:31'),
(138, 'invoice', 8, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-19 06:08:34'),
(139, 'invoice', 16, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-19 06:08:37'),
(140, 'invoice', 12, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-19 06:08:41'),
(141, 'invoice', 21, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-19 06:08:55'),
(142, 'invoice', 22, 'Invoice INV-2026-003 saved', 'indigo', 'Deepak Kashyap', '2026-08-19 06:09:26'),
(143, 'invoice', 22, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-19 06:09:58'),
(144, 'invoice', 1, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-19 06:10:14'),
(145, 'invoice', 18, 'Invoice deleted', 'red', 'Deepak Kashyap', '2026-08-19 06:10:50'),
(146, 'invoice', 22, 'Invoice INV-2026-003 saved', 'indigo', 'Deepak Kashyap', '2026-08-19 06:11:04'),
(147, 'settings', NULL, 'Settings updated', 'amber', 'Deepak Kashyap', '2026-08-19 06:12:01'),
(148, 'invoice', 23, 'Invoice INV-2026-002 saved', 'indigo', 'Deepak Kashyap', '2026-08-19 06:17:25'),
(149, 'invoice', 23, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-19 06:17:40');

-- --------------------------------------------------------

--
-- Table structure for table `bank_accounts`
--

CREATE TABLE `bank_accounts` (
  `id` int(11) NOT NULL,
  `label` varchar(120) NOT NULL,
  `bank_name` varchar(160) DEFAULT NULL,
  `account_no` varchar(80) DEFAULT NULL,
  `ifsc` varchar(60) DEFAULT NULL,
  `branch` varchar(120) DEFAULT NULL,
  `swift` varchar(60) DEFAULT NULL,
  `extra` varchar(200) DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `bank_accounts`
--

INSERT INTO `bank_accounts` (`id`, `label`, `bank_name`, `account_no`, `ifsc`, `branch`, `swift`, `extra`, `is_default`, `created_at`) VALUES
(1, 'Primary (INR)', 'HDFC Bank', '50100XXXXXXX', 'HDFC0000XXXBranch', 'Dhanbad', 'HDF00XXXX', '', 1, '2026-08-18 10:12:40'),
(2, 'Indian Clients BOB', 'Bank OF Broda', '465131365165', 'BOB565456', 'Dhanbad', 'BOB001215', '', 0, '2026-08-18 10:17:02');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `company` varchar(160) NOT NULL,
  `contact` varchar(120) DEFAULT NULL,
  `email` varchar(160) DEFAULT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `gstin` varchar(30) DEFAULT NULL,
  `service` varchar(160) DEFAULT NULL,
  `type` varchar(40) DEFAULT 'Retainer',
  `since` date DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `notes` text DEFAULT NULL,
  `archived` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `company`, `contact`, `email`, `phone`, `address`, `gstin`, `service`, `type`, `since`, `status`, `notes`, `archived`, `created_at`) VALUES
(1, 'Digital Hikers', 'Deepak Kumar', 'deepakku639@gmail.com', '07050697074', 'House no. 76, Chhota Kharikabad, Bhuli', '', '', 'Retainer', '0000-00-00', 'Active', '', 1, '2026-08-15 14:12:56'),
(2, 'Forest Interective', 'Deepak Kumar', 'dk@digitalhikers.in', '5479982838', '23a,', '', '', 'Retainer', '2026-08-01', 'Active', '', 0, '2026-08-15 17:34:14'),
(3, 'Digital HIkers', 'Deepak kumar', 'digitalhikers.net@gmail.com', '07979982838', '76, chhota Kharikabad', '', '', 'Retainer', '2026-08-01', 'Active', '', 1, '2026-08-17 08:36:12'),
(4, 'Digital HIkers', 'Deepak kumar', 'digitalhikers.net@gmail.com', '07979982838', '76, chhota Kharikabad', '', '', 'Retainer', '0000-00-00', 'Active', '', 1, '2026-08-17 12:51:19'),
(5, 'Digital HIkers', 'Deepak kumar', 'digitalhikers.net@gmail.com', '07979982838', '76, chhota Kharikabad', '', 'Website', 'Retainer', '2026-08-01', 'Active', '', 0, '2026-08-18 10:17:36'),
(6, 'Digital HIkers', 'Deepak kumar', 'digitalhikers.net@gmail.com', '07979982838', '76, chhota Kharikabad', '', '', 'Retainer', '0000-00-00', 'Active', '', 0, '2026-08-18 10:17:46');

-- --------------------------------------------------------

--
-- Table structure for table `client_contacts`
--

CREATE TABLE `client_contacts` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `role` varchar(80) DEFAULT NULL,
  `email` varchar(160) DEFAULT NULL,
  `phone` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `client_contacts`
--

INSERT INTO `client_contacts` (`id`, `client_id`, `name`, `role`, `email`, `phone`) VALUES
(1, 1, 'Deepak Kumar', 'Primary Contact', 'deepakku639@gmail.com', '07050697074'),
(2, 2, 'Deepak Kumar', 'Primary Contact', 'dk@digitalhikers.in', '5479982838'),
(3, 3, 'Deepak kumar', 'Primary Contact', 'digitalhikers.net@gmail.com', '07979982838'),
(4, 4, 'Deepak kumar', 'Primary Contact', 'digitalhikers.net@gmail.com', '07979982838'),
(5, 5, 'Deepak kumar', 'Primary Contact', 'digitalhikers.net@gmail.com', '07979982838'),
(6, 6, 'Deepak kumar', 'Primary Contact', 'digitalhikers.net@gmail.com', '07979982838');

-- --------------------------------------------------------

--
-- Table structure for table `client_notes`
--

CREATE TABLE `client_notes` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `body` text NOT NULL,
  `author` varchar(120) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `cat` varchar(40) NOT NULL DEFAULT 'Other',
  `client_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `filename` varchar(80) NOT NULL,
  `size` int(11) NOT NULL DEFAULT 0,
  `mime` varchar(80) DEFAULT NULL,
  `uploaded_by` varchar(120) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `name`, `cat`, `client_id`, `employee_id`, `filename`, `size`, `mime`, `uploaded_by`, `created_at`) VALUES
(4, 'Telco Business Research.pdf', 'Legal', NULL, NULL, 'd3695db8527a1d4a1097312053d79a58.pdf', 2764872, 'application/pdf', 'Deepak Kashyap', '2026-08-17 23:59:54'),
(5, 'Telco Business Research.pdf', 'Legal', 2, NULL, '21e4e2684b06c71ae76e527c56c82a22.pdf', 2764872, 'application/pdf', 'Deepak Kashyap', '2026-08-18 09:29:36');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `email` varchar(160) DEFAULT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `role` varchar(120) DEFAULT NULL,
  `dept` varchar(80) DEFAULT NULL,
  `salary` decimal(12,2) NOT NULL DEFAULT 0.00,
  `salary_type` varchar(30) DEFAULT 'Monthly',
  `pay_date` tinyint(4) DEFAULT 20,
  `join_date` date DEFAULT NULL,
  `address` text DEFAULT NULL,
  `bank` varchar(120) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `email`, `phone`, `role`, `dept`, `salary`, `salary_type`, `pay_date`, `join_date`, `address`, `bank`, `notes`, `status`, `created_at`) VALUES
(4, 'Deepak Kumar', 'info@digitalhikers.in', '07979982838', '', 'Marketing', 0.00, 'Monthly', 20, '2026-08-15', '23a,', '', '', 'Active', '2026-08-17 16:53:31'),
(5, 'Deepak kumar', 'digitalhikers.net@gmail.com', '07979982838', 'll', 'Design', 0.00, 'Monthly', 20, '2026-08-18', '76, chhota Kharikabad', '', '', 'Active', '2026-08-18 10:19:24');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `no` varchar(40) NOT NULL,
  `client_id` int(11) NOT NULL,
  `invoice_date` date NOT NULL,
  `due_date` date DEFAULT NULL,
  `terms` varchar(30) DEFAULT 'Net 15',
  `currency` varchar(5) NOT NULL DEFAULT 'INR',
  `discount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `notes` text DEFAULT NULL,
  `bank_account_id` int(11) DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Draft',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `no`, `client_id`, `invoice_date`, `due_date`, `terms`, `currency`, `discount`, `notes`, `bank_account_id`, `status`, `created_at`) VALUES
(22, 'INV-2026-003', 5, '2026-08-18', '2026-08-25', 'Net 7', 'USD', 0.00, '', 1, 'Paid', '2026-08-19 06:09:26'),
(23, 'INV-2026-002', 5, '2026-08-19', '2026-09-03', 'Net 15', 'USD', 0.00, '', 1, 'Paid', '2026-08-19 06:17:25');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_items`
--

CREATE TABLE `invoice_items` (
  `id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `descr` varchar(255) DEFAULT NULL,
  `qty` decimal(10,2) NOT NULL DEFAULT 1.00,
  `rate` decimal(12,2) NOT NULL DEFAULT 0.00,
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `invoice_items`
--

INSERT INTO `invoice_items` (`id`, `invoice_id`, `descr`, `qty`, `rate`, `sort_order`) VALUES
(123, 22, 'a', 1.00, 100.00, 0),
(124, 23, 'WEb', 1.00, 5000.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `amt` decimal(12,2) NOT NULL,
  `inr_amount` decimal(18,2) DEFAULT NULL,
  `paid_on` date NOT NULL,
  `method` varchar(40) DEFAULT NULL,
  `ref` varchar(80) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `invoice_id`, `amt`, `inr_amount`, `paid_on`, `method`, `ref`, `note`, `created_at`) VALUES
(17, 22, 100.00, NULL, '2026-08-18', 'Bank Transfer', '', '', '2026-08-19 06:09:58'),
(18, 23, 5000.00, 500.00, '2026-08-19', 'Bank Transfer', '', '', '2026-08-19 06:17:40');

-- --------------------------------------------------------

--
-- Table structure for table `payroll`
--

CREATE TABLE `payroll` (
  `id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `month` tinyint(4) NOT NULL,
  `year` smallint(6) NOT NULL,
  `basic` decimal(12,2) NOT NULL DEFAULT 0.00,
  `bonus` decimal(12,2) NOT NULL DEFAULT 0.00,
  `deductions` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` enum('Pending','Paid') NOT NULL DEFAULT 'Pending',
  `paid_on` date DEFAULT NULL,
  `method` varchar(40) DEFAULT NULL,
  `ref` varchar(80) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `skey` varchar(60) NOT NULL,
  `sval` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`skey`, `sval`) VALUES
('company_address', '23a, Gurugram, Haryana India 122017'),
('company_bank', 'HDFC Bank · A/C 50100XXXXXXX \nIFSC HDFC0000XXX\nBranch - Dhanbad\nBank - Bank Of Broada'),
('company_email', 'info@digitalhikers.in'),
('company_gstin', ''),
('company_name', 'Digital Hikers'),
('company_pan', ''),
('company_phone', '+91 7979982838'),
('company_tagline', 'Digital marketing & AI automation'),
('company_website', ''),
('invoice_conditions', 'Please send payment within 30 days of receiving this invoice.\nThere will be 10% interest charge per month on late invoice.'),
('invoice_currency', 'INR'),
('invoice_footer', 'Thank you for your business.'),
('invoice_prefix', 'INV'),
('invoice_terms', 'Net 15'),
('salary_pay_date', '20'),
('signatory_name', ''),
('signatory_title', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','member') NOT NULL DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password_hash`, `role`, `created_at`) VALUES
(1, 'Deepak Kashyap', 'digitalhikers', '$2y$10$7GZDeR56BoFPUcPpjShWjekpSjy93oBdPVpZgx0FMC1OmIUqlITTi', 'admin', '2026-08-15 04:02:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_entity` (`entity`,`entity_id`);

--
-- Indexes for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_contacts`
--
ALTER TABLE `client_contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cc_client` (`client_id`);

--
-- Indexes for table `client_notes`
--
ALTER TABLE `client_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cn_client` (`client_id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_cat` (`cat`),
  ADD KEY `idx_doc_client` (`client_id`),
  ADD KEY `idx_doc_employee` (`employee_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `no` (`no`),
  ADD KEY `fk_inv_client` (`client_id`);

--
-- Indexes for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_item_inv` (`invoice_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pay_inv` (`invoice_id`);

--
-- Indexes for table `payroll`
--
ALTER TABLE `payroll`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_slip` (`emp_id`,`month`,`year`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`skey`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `client_contacts`
--
ALTER TABLE `client_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `client_notes`
--
ALTER TABLE `client_notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `invoice_items`
--
ALTER TABLE `invoice_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `payroll`
--
ALTER TABLE `payroll`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `client_contacts`
--
ALTER TABLE `client_contacts`
  ADD CONSTRAINT `fk_cc_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `client_notes`
--
ALTER TABLE `client_notes`
  ADD CONSTRAINT `fk_cn_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `fk_inv_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD CONSTRAINT `fk_item_inv` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_pay_inv` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payroll`
--
ALTER TABLE `payroll`
  ADD CONSTRAINT `fk_pr_emp` FOREIGN KEY (`emp_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
