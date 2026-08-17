-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 17, 2026 at 12:30 AM
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
(50, 'invoice', 2, 'Payment recorded', 'green', 'Deepak Kashyap', '2026-08-16 23:19:01');

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
(1, 'Digital Hikers', 'Deepak Kumar', 'deepakku639@gmail.com', '07050697074', 'House no. 76, Chhota Kharikabad, Bhuli', '', '', 'Retainer', '0000-00-00', 'Active', '', 0, '2026-08-15 14:12:56'),
(2, 'Forest Interective', 'Deepak Kumar', 'dk@digitalhikers.in', '5479982838', '23a,', '', '', 'Retainer', '2026-08-01', 'Active', '', 0, '2026-08-15 17:34:14');

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
(2, 2, 'Deepak Kumar', 'Primary Contact', 'dk@digitalhikers.in', '5479982838');

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
  `filename` varchar(80) NOT NULL,
  `size` int(11) NOT NULL DEFAULT 0,
  `mime` varchar(80) DEFAULT NULL,
  `uploaded_by` varchar(120) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `name`, `cat`, `filename`, `size`, `mime`, `uploaded_by`, `created_at`) VALUES
(1, 'Digital Hikers Udyam Registration Certificate.pdf', 'Legal', 'a48b0b42c397d695c8e405949c43ad6e.pdf', 281537, 'application/pdf', 'Deepak Kashyap', '2026-08-15 15:22:09'),
(2, 'Full Udyam Registration Certificate (4 Page).pdf', 'Legal', '93e22e4e70156570f3963428350b402e.pdf', 348015, 'application/pdf', 'Deepak Kashyap', '2026-08-15 18:45:48'),
(3, 'Digital Hikers IEC.pdf', 'Legal', '887dbc8219bd701f2e92610422697002.pdf', 62581, 'application/pdf', 'Deepak Kashyap', '2026-08-15 18:45:55');

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
(1, 'Deepak Kumar', 'info@digitalhikers.in', '07979982838', 'App Developer', 'Development', 50000.00, 'Monthly', 20, '2026-08-15', '23a,', '', '', 'Active', '2026-08-15 14:47:45');

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
  `status` varchar(20) NOT NULL DEFAULT 'Draft',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `no`, `client_id`, `invoice_date`, `due_date`, `terms`, `currency`, `discount`, `notes`, `status`, `created_at`) VALUES
(1, 'INV-2026-001', 1, '2026-08-15', '2026-08-30', 'Net 15', 'INR', 0.00, '', 'Paid', '2026-08-15 18:10:58'),
(2, 'INV-2026-002', 1, '2026-08-15', '2026-08-30', 'Net 15', 'INR', 0.00, '', 'Paid', '2026-08-15 18:11:55');

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
(94, 1, 'test', 1.00, 5000.00, 0),
(99, 2, 'Ads', 1.00, 10000.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `amt` decimal(12,2) NOT NULL,
  `paid_on` date NOT NULL,
  `method` varchar(40) DEFAULT NULL,
  `ref` varchar(80) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `invoice_id`, `amt`, `paid_on`, `method`, `ref`, `note`, `created_at`) VALUES
(1, 2, 10000.00, '2026-08-15', 'UPI', '', '', '2026-08-15 18:12:06'),
(2, 2, 10000.00, '2026-08-15', 'Bank Transfer', '', '', '2026-08-15 18:12:21'),
(3, 2, 20000.00, '2026-08-15', 'Bank Transfer', '', '', '2026-08-15 18:14:19'),
(4, 2, 50000.00, '2026-08-16', 'Bank Transfer', '', '', '2026-08-16 23:00:20'),
(5, 2, 10000.00, '2026-08-16', 'Bank Transfer', '', '', '2026-08-16 23:19:01');

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
('company_bank', 'HDFC Bank · A/C 50100XXXXXXX · IFSC HDFC0000XXX'),
('company_email', 'info@digitalhikers.in'),
('company_gstin', ''),
('company_name', 'Digital Hikers'),
('company_pan', ''),
('company_phone', '+91 7979982838'),
('company_tagline', 'Digital marketing & AI automation'),
('company_website', ''),
('invoice_currency', 'INR'),
('invoice_footer', 'Thank you for your business.'),
('invoice_prefix', 'INV'),
('invoice_terms', 'Net 15'),
('salary_pay_date', '20');

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
  ADD KEY `idx_cat` (`cat`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `client_contacts`
--
ALTER TABLE `client_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `client_notes`
--
ALTER TABLE `client_notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `invoice_items`
--
ALTER TABLE `invoice_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `payroll`
--
ALTER TABLE `payroll`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
