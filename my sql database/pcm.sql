-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 27, 2024 at 03:07 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pcm`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
  `id` bigint UNSIGNED NOT NULL,
  `log_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject_id` bigint UNSIGNED DEFAULT NULL,
  `causer_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `causer_id` bigint UNSIGNED DEFAULT NULL,
  `properties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `batch_uuid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ;

--
-- Dumping data for table `activity_log`
--

INSERT INTO `activity_log` (`id`, `log_name`, `description`, `subject_type`, `event`, `subject_id`, `causer_type`, `causer_id`, `properties`, `batch_uuid`, `created_at`, `updated_at`) VALUES
(1, 'Vehicles', 'You have created Vehicles ', 'App\\Models\\driver', 'created', 2, 'App\\Models\\User', 22789, '{\"attributes\":{\"id\":2,\"companyId\":22789,\"driver_name\":\"Driver Name\",\"driver_cnic_no\":\"232323\",\"driver_mobile_no\":\"23232\",\"driving_licence_no\":\"22323\",\"driver_address\":\"hello\",\"created_at\":\"2024-10-21T15:32:00.000000Z\",\"updated_at\":\"2024-10-21T15:32:00.000000Z\",\"deleted_at\":null}}', NULL, '2024-10-21 15:32:01', '2024-10-21 15:32:01'),
(2, 'Vehicles', 'You have updated Vehicles ', 'App\\Models\\driver', 'updated', 2, 'App\\Models\\User', 22789, '{\"attributes\":{\"id\":2,\"companyId\":22789,\"driver_name\":\"Driver\",\"driver_cnic_no\":\"2323\",\"driver_mobile_no\":\"232\",\"driving_licence_no\":\"223\",\"driver_address\":\"hello\",\"created_at\":\"2024-10-21T15:32:00.000000Z\",\"updated_at\":\"2024-10-21T15:34:44.000000Z\",\"deleted_at\":null},\"old\":{\"id\":2,\"companyId\":22789,\"driver_name\":\"Driver Name\",\"driver_cnic_no\":\"232323\",\"driver_mobile_no\":\"23232\",\"driving_licence_no\":\"22323\",\"driver_address\":\"hello\",\"created_at\":\"2024-10-21T15:32:00.000000Z\",\"updated_at\":\"2024-10-21T15:32:00.000000Z\",\"deleted_at\":null}}', NULL, '2024-10-21 15:34:44', '2024-10-21 15:34:44'),
(4, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22797, 'App\\Models\\User', 22789, '{\"attributes\":{\"id\":22797,\"hms_id\":2,\"branch_id\":null,\"name\":\"imran tyre shop\",\"email\":\"info@imran.com\",\"email_verified_at\":null,\"password\":\"$2y$10$2cSnRAbX2P1ki6tP8ABSAOFrXzolvO\\/iyzBGe8vHaNlKHnP\\/ut63u\",\"mobile_no\":\"03036470365\",\"cnic\":null,\"address\":\"4GXX+CPM, Kot Rab Nawaz Multan, Punjab, Pakistan\",\"role_id\":15,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-10-21T16:01:55.000000Z\",\"updated_at\":\"2024-10-21T16:01:55.000000Z\",\"deleted_at\":null,\"latitude\":\"30.1479731157607\",\"longitude\":\"30.1479731157607\",\"contact_person\":null}}', NULL, '2024-10-21 16:01:55', '2024-10-21 16:01:55'),
(5, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22798, 'App\\Models\\User', 22797, '{\"attributes\":{\"id\":22798,\"hms_id\":2,\"branch_id\":null,\"name\":\"rehan work shop\",\"email\":\"info@rehan.com\",\"email_verified_at\":null,\"password\":\"$2y$10$fW7Yf0yuh3vi2sIeK5fhUen7gq\\/x9Cm4\\/Yc23pxdtJkj1mUrXHI5m\",\"mobile_no\":\"03036470365\",\"cnic\":null,\"address\":\"W5CW+VFC, Mahesro Village, Ghotki, Sindh, Pakistan\",\"role_id\":15,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-10-21T16:25:23.000000Z\",\"updated_at\":\"2024-10-21T16:25:23.000000Z\",\"deleted_at\":null,\"latitude\":\"27.922748549517657\",\"longitude\":\"69.19661521911621\",\"contact_person\":null}}', NULL, '2024-10-21 16:25:23', '2024-10-21 16:25:23'),
(8, 'User', 'You have updated User ', 'App\\Models\\User', 'updated', 22798, 'App\\Models\\User', 22797, '{\"attributes\":{\"id\":22798,\"hms_id\":2,\"branch_id\":null,\"name\":\"rehan work shop\",\"email\":\"info@rehan.com\",\"email_verified_at\":null,\"password\":\"$2y$10$fW7Yf0yuh3vi2sIeK5fhUen7gq\\/x9Cm4\\/Yc23pxdtJkj1mUrXHI5m\",\"mobile_no\":\"03036470365\",\"cnic\":null,\"address\":\"W5CW+VFC, Mahesro Village, Ghotki, Sindh, Pakistan\",\"role_id\":15,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-10-21T16:25:23.000000Z\",\"updated_at\":\"2024-10-21T16:30:34.000000Z\",\"deleted_at\":null,\"latitude\":\"27.92275802929981\",\"longitude\":\"69.19661521911621\",\"contact_person\":null},\"old\":{\"id\":22798,\"hms_id\":2,\"branch_id\":null,\"name\":\"rehan work shop\",\"email\":\"info@rehan.com\",\"email_verified_at\":null,\"password\":\"$2y$10$fW7Yf0yuh3vi2sIeK5fhUen7gq\\/x9Cm4\\/Yc23pxdtJkj1mUrXHI5m\",\"mobile_no\":\"03036470365\",\"cnic\":null,\"address\":\"W5CW+VFC, Mahesro Village, Ghotki, Sindh, Pakistan\",\"role_id\":15,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-10-21T16:25:23.000000Z\",\"updated_at\":\"2024-10-21T16:25:23.000000Z\",\"deleted_at\":null,\"latitude\":\"27.922748549517657\",\"longitude\":\"69.19661521911621\",\"contact_person\":null}}', NULL, '2024-10-21 16:30:34', '2024-10-21 16:30:34'),
(9, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22799, 'App\\Models\\User', 22798, '{\"attributes\":{\"id\":22799,\"hms_id\":2,\"branch_id\":null,\"name\":\"Shop Name\",\"email\":\"info@Shop.com\",\"email_verified_at\":null,\"password\":\"$2y$10$JzgFefoeqFygcbomk5EX2ucPtKjyXni\\/S6NGO8C1pmlOVIKENsuf.\",\"mobile_no\":\"03036470365\",\"cnic\":null,\"address\":\"Chobakan St, Old Town, Gujranwala, Punjab, Pakistan\",\"role_id\":15,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-10-22T16:26:30.000000Z\",\"updated_at\":\"2024-10-22T16:26:30.000000Z\",\"deleted_at\":null,\"latitude\":\"32.15817972415672\",\"longitude\":\"74.18780038411614\",\"contact_person\":null}}', NULL, '2024-10-22 16:26:30', '2024-10-22 16:26:30'),
(10, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22800, 'App\\Models\\User', 22789, '{\"attributes\":{\"id\":22800,\"hms_id\":2,\"branch_id\":null,\"name\":\"imran mahar\",\"email\":\"info@mahar.com\",\"email_verified_at\":null,\"password\":\"$2y$10$ljrNXtdXmqR1Q8kwzrcDyO5Dw1Z8BGnG.4Pr5JGilIzsKsA1fZSRu\",\"mobile_no\":\"1111122222\",\"cnic\":null,\"address\":\"23\",\"role_id\":5,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-10-23T17:15:48.000000Z\",\"updated_at\":\"2024-10-23T17:15:48.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":\"212\"}}', NULL, '2024-10-23 17:15:48', '2024-10-23 17:15:48'),
(11, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22801, 'App\\Models\\User', 22789, '{\"attributes\":{\"id\":22801,\"hms_id\":2,\"branch_id\":22789,\"name\":\"Add Driver Driver Name\",\"email\":\"info@maah.com\",\"email_verified_at\":null,\"password\":\"$2y$10$7jvw3tPvBjFxStlTBX7Nf.b.NMrhWPU8pgwZWOJQw435zoxvNkp0y\",\"mobile_no\":\"03036470365\",\"cnic\":\"2111111\",\"address\":\"Address\",\"role_id\":5,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-10-23T17:46:16.000000Z\",\"updated_at\":\"2024-10-23T17:46:16.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":\"1211211\"}}', NULL, '2024-10-23 17:46:16', '2024-10-23 17:46:16'),
(12, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22802, 'App\\Models\\User', 22789, '{\"attributes\":{\"id\":22802,\"hms_id\":2,\"branch_id\":22789,\"name\":\"Driver Name\",\"email\":\"info@Driver.com\",\"email_verified_at\":null,\"password\":\"$2y$10$cv.YU7AC\\/xnAOW2ag4geo.GjCQYGCW9\\/S6H.6wZ5fRm\\/BWdTiZoiC\",\"mobile_no\":\"121\",\"cnic\":\"12121\",\"address\":\"Address Email\",\"role_id\":5,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-10-25T16:58:02.000000Z\",\"updated_at\":\"2024-10-25T16:58:02.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":\"112\"}}', NULL, '2024-10-25 16:58:03', '2024-10-25 16:58:03'),
(13, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22806, 'App\\Models\\User', 22805, '{\"attributes\":{\"id\":22806,\"hms_id\":2,\"branch_id\":null,\"name\":\"Alyssa Boyd\",\"email\":\"lazimydyd@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$cCHhZ5pZAhqqtQ4gx7X7pO8n9z3mIXP1WAmtAHmomFkmDUYLSw4iG\",\"mobile_no\":\"142\",\"cnic\":null,\"address\":\"Suscipit ut ea et au\",\"role_id\":15,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-12T08:00:18.000000Z\",\"updated_at\":\"2024-12-12T08:00:18.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-12 08:00:18', '2024-12-12 08:00:18'),
(14, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22807, 'App\\Models\\User', 22805, '{\"attributes\":{\"id\":22807,\"hms_id\":2,\"branch_id\":null,\"name\":\"Ginger Faulkner\",\"email\":\"vivuhoq@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$zOauG10nBa0TvmkuKQHY5eTdSScaylNlc1\\/nqgGqbsx.5vpHuGZda\",\"mobile_no\":\"307\",\"cnic\":null,\"address\":\"In quis quisquam nis\",\"role_id\":15,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-12T09:46:31.000000Z\",\"updated_at\":\"2024-12-12T09:46:31.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-12 09:46:31', '2024-12-12 09:46:31'),
(15, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22808, 'App\\Models\\User', 22805, '{\"attributes\":{\"id\":22808,\"hms_id\":2,\"branch_id\":22805,\"name\":\"Gay Avery\",\"username\":\"mezuwyj\",\"email\":\"jyweviqyti@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$x9KoIT\\/RwlCNs5xyozoPBeENSRTSNfAy\\/7tbCZh3zLlbLyk0tML\\/q\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":15,\"shop_id\":2,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-17T08:06:41.000000Z\",\"updated_at\":\"2024-12-17T08:06:41.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-17 08:06:41', '2024-12-17 08:06:41'),
(16, 'User', 'You have updated User ', 'App\\Models\\User', 'updated', 22808, 'App\\Models\\User', 22805, '{\"attributes\":{\"id\":22808,\"hms_id\":2,\"branch_id\":null,\"name\":\"Gay Avery\",\"username\":\"mezuwyj\",\"email\":\"jyweviqyti@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$fpL.kvcZ8I2luB9BUvDsQOsfzS\\/022l5oXE.blE3AMLfes7i\\/XNBS\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":15,\"shop_id\":2,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-17T08:06:41.000000Z\",\"updated_at\":\"2024-12-17T10:00:40.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null},\"old\":{\"id\":22808,\"hms_id\":2,\"branch_id\":22805,\"name\":\"Gay Avery\",\"username\":\"mezuwyj\",\"email\":\"jyweviqyti@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$x9KoIT\\/RwlCNs5xyozoPBeENSRTSNfAy\\/7tbCZh3zLlbLyk0tML\\/q\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":15,\"shop_id\":2,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-17T08:06:41.000000Z\",\"updated_at\":\"2024-12-17T08:06:41.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-17 10:00:40', '2024-12-17 10:00:40'),
(17, 'User', 'You have updated User ', 'App\\Models\\User', 'updated', 22808, 'App\\Models\\User', 22805, '{\"attributes\":{\"id\":22808,\"hms_id\":2,\"branch_id\":null,\"name\":\"Gay Avery\",\"username\":\"mezuwyj\",\"email\":\"jyweviqyti@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$8LoMZh3mTi1Y18zcA1gj3.w43KbKMw3HSvEnOe43HvteC\\/1lTgkNq\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":24,\"shop_id\":2,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-17T08:06:41.000000Z\",\"updated_at\":\"2024-12-17T10:01:02.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null},\"old\":{\"id\":22808,\"hms_id\":2,\"branch_id\":null,\"name\":\"Gay Avery\",\"username\":\"mezuwyj\",\"email\":\"jyweviqyti@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$fpL.kvcZ8I2luB9BUvDsQOsfzS\\/022l5oXE.blE3AMLfes7i\\/XNBS\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":15,\"shop_id\":2,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-17T08:06:41.000000Z\",\"updated_at\":\"2024-12-17T10:00:40.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-17 10:01:02', '2024-12-17 10:01:02'),
(18, 'User', 'You have updated User ', 'App\\Models\\User', 'updated', 22805, 'App\\Models\\User', 22805, '{\"attributes\":{\"id\":22805,\"hms_id\":2,\"branch_id\":null,\"name\":\"Super Admin\",\"username\":\"super_admin\",\"email\":\"admin@example.com\",\"email_verified_at\":null,\"password\":\"$2y$10$yoIMeOSxIKSsWhSUF9ljted8UQYNGEjD2nwmBQw6YpetvwtDwiuya\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":4,\"shop_id\":null,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-12T07:55:11.000000Z\",\"updated_at\":\"2024-12-17T12:03:53.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null},\"old\":{\"id\":22805,\"hms_id\":2,\"branch_id\":null,\"name\":\"Super Admin\",\"username\":\"\",\"email\":\"admin@example.com\",\"email_verified_at\":null,\"password\":\"$2y$12$s0pBT.e5IQFtWnkZXH1\\/vukO6bZ1CFXasbwZI.YVCzZWGYotT01Yy\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":4,\"shop_id\":null,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-12T07:55:11.000000Z\",\"updated_at\":\"2024-12-12T07:57:03.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-17 12:03:53', '2024-12-17 12:03:53'),
(19, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22809, 'App\\Models\\User', 22805, '{\"attributes\":{\"id\":22809,\"hms_id\":2,\"branch_id\":22805,\"name\":\"Hannah Albert\",\"username\":\"bopequ\",\"email\":\"zohuv@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$Psu\\/v8XLAsdD\\/YuisYeUMu0eoJJoA2\\/w3Uc6i\\/vhx9G9gsBli3UWq\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":15,\"shop_id\":3,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-19T06:50:00.000000Z\",\"updated_at\":\"2024-12-19T06:50:00.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-19 06:50:00', '2024-12-19 06:50:00'),
(20, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22810, 'App\\Models\\User', 22805, '{\"attributes\":{\"id\":22810,\"hms_id\":2,\"branch_id\":22805,\"name\":\"Micah Alford\",\"username\":\"jimekifagu\",\"email\":\"vogata@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$vCHSzZFgen16lYpTb3M3KeN5IhDbmudPpdSynWV7AcRM8QL0Fz0Yu\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":30,\"shop_id\":null,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-19T07:19:34.000000Z\",\"updated_at\":\"2024-12-19T07:19:34.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-19 07:19:34', '2024-12-19 07:19:34'),
(21, 'User', 'You have updated User ', 'App\\Models\\User', 'updated', 22809, 'App\\Models\\User', 22809, '{\"attributes\":{\"id\":22809,\"hms_id\":2,\"branch_id\":22805,\"name\":\"Hannah Albert\",\"username\":\"bopequ\",\"email\":\"zohuv@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$b.21asx8WpL365LQkNgzBOauVtnkatptbATGgSWvG8PdhTnS7tnKi\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":15,\"shop_id\":3,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-19T06:50:00.000000Z\",\"updated_at\":\"2024-12-19T13:25:12.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null},\"old\":{\"id\":22809,\"hms_id\":2,\"branch_id\":22805,\"name\":\"Hannah Albert\",\"username\":\"bopequ\",\"email\":\"zohuv@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$Psu\\/v8XLAsdD\\/YuisYeUMu0eoJJoA2\\/w3Uc6i\\/vhx9G9gsBli3UWq\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":15,\"shop_id\":3,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-19T06:50:00.000000Z\",\"updated_at\":\"2024-12-19T06:50:00.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-19 13:25:12', '2024-12-19 13:25:12'),
(22, 'User', 'You have updated User ', 'App\\Models\\User', 'updated', 22805, 'App\\Models\\User', 22805, '{\"attributes\":{\"id\":22805,\"hms_id\":2,\"branch_id\":null,\"name\":\"Super Admin\",\"username\":\"super_admin\",\"email\":\"admin@example.com\",\"email_verified_at\":null,\"password\":\"$2y$10$sxF8bI5OXqxDjp.siGrS\\/ektSXa73qwUm8mWrlvyyFMKyShr7XvVW\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":4,\"shop_id\":null,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-12T07:55:11.000000Z\",\"updated_at\":\"2024-12-23T12:04:35.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null},\"old\":{\"id\":22805,\"hms_id\":2,\"branch_id\":null,\"name\":\"Super Admin\",\"username\":\"super_admin\",\"email\":\"admin@example.com\",\"email_verified_at\":null,\"password\":\"$2y$12$s0pBT.e5IQFtWnkZXH1\\/vukO6bZ1CFXasbwZI.YVCzZWGYotT01Yy\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":4,\"shop_id\":null,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-12T07:55:11.000000Z\",\"updated_at\":\"2024-12-17T12:05:48.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-23 12:04:35', '2024-12-23 12:04:35'),
(23, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22811, 'App\\Models\\User', 22805, '{\"attributes\":{\"id\":22811,\"hms_id\":2,\"branch_id\":22805,\"name\":\"Deborah Kelly\",\"username\":\"jylawaqeg\",\"email\":\"mizifyga@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$oWj9pRnO5YJ\\/\\/Rc7b21Hveemr61JwhBOrXBOThzfpQO.qy46EDXOq\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":30,\"shop_id\":null,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-24T06:55:03.000000Z\",\"updated_at\":\"2024-12-24T06:55:03.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-24 06:55:03', '2024-12-24 06:55:03'),
(24, 'User', 'You have updated User ', 'App\\Models\\User', 'updated', 22811, 'App\\Models\\User', 22811, '{\"attributes\":{\"id\":22811,\"hms_id\":2,\"branch_id\":22805,\"name\":\"Deborah Kelly\",\"username\":\"jylawaqeg\",\"email\":\"mizifyga@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$nPWnywET3oZm0FeA\\/HL83uwMjCfgCEgkwZhlz5mRNizQ.d6P.8Lze\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":31,\"shop_id\":null,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-24T06:55:03.000000Z\",\"updated_at\":\"2024-12-24T06:57:34.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null},\"old\":{\"id\":22811,\"hms_id\":2,\"branch_id\":22805,\"name\":\"Deborah Kelly\",\"username\":\"jylawaqeg\",\"email\":\"mizifyga@mailinator.com\",\"email_verified_at\":null,\"password\":\"$2y$10$oWj9pRnO5YJ\\/\\/Rc7b21Hveemr61JwhBOrXBOThzfpQO.qy46EDXOq\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":30,\"shop_id\":null,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-24T06:55:03.000000Z\",\"updated_at\":\"2024-12-24T06:55:03.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-24 06:57:34', '2024-12-24 06:57:34'),
(25, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22812, 'App\\Models\\User', 22805, '{\"attributes\":{\"id\":22812,\"hms_id\":2,\"branch_id\":22805,\"name\":\"Ali Khan\",\"username\":\"ali_khan\",\"email\":\"alikhan@example.com\",\"email_verified_at\":null,\"password\":\"$2y$10$0qy62rBAPb92RiBSTZx4ou6OB2eGoTFlj73ZIT9vTFOAK2wyRSixq\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":32,\"shop_id\":null,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-24T07:24:11.000000Z\",\"updated_at\":\"2024-12-24T07:24:11.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-24 07:24:11', '2024-12-24 07:24:11'),
(26, 'User', 'You have created User ', 'App\\Models\\User', 'created', 22813, 'App\\Models\\User', 22805, '{\"attributes\":{\"id\":22813,\"hms_id\":2,\"branch_id\":22805,\"name\":\"Admin\",\"username\":\"admin\",\"email\":\"jradmin@example.com\",\"email_verified_at\":null,\"password\":\"$2y$10$t7UjgoqN607CUyFO854mEOzQMK\\/CJWRIKd9s2Xh5CYE7DvdmsP1.q\",\"mobile_no\":null,\"cnic\":null,\"address\":null,\"role_id\":13,\"shop_id\":null,\"profile_image\":\"default.png\",\"status\":\"active\",\"created_at\":\"2024-12-24T09:07:41.000000Z\",\"updated_at\":\"2024-12-24T09:07:41.000000Z\",\"deleted_at\":null,\"latitude\":null,\"longitude\":null,\"contact_person\":null}}', NULL, '2024-12-24 09:07:41', '2024-12-24 09:07:41');

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `id` bigint UNSIGNED NOT NULL,
  `hms_id` bigint UNSIGNED NOT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longitude` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','suspend','in_active') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `default_branch` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `hms_id`, `name`, `city`, `state`, `country`, `email`, `phone`, `address`, `latitude`, `longitude`, `status`, `created_at`, `updated_at`, `default_branch`, `deleted_at`) VALUES
(3, 2, 'Head Quarters Main Branch', 'Dublin', 'Dublin', 'Ireland', 'mruddin@hermitageclinic.ie', '0035316459560', 'Suite 11 Dublin 20', NULL, NULL, 'active', '2024-01-11 23:04:43', '2024-06-05 16:13:29', 1, NULL),
(18, 2, 'Walton', 'Lahore', 'punjab', 'pk', 'pk@surjx.com', '32323232', 'Dublin 1234 76-30', NULL, NULL, 'active', '2024-05-15 17:50:43', '2024-06-05 16:11:26', 0, NULL),
(19, 2, 'DHA ACCUFIX', 'lhr', 'pun', 'pk', 'dha@surjx.com', '0993289832', '3', NULL, NULL, 'active', '2024-05-16 16:09:27', '2024-05-21 14:20:54', 0, NULL),
(20, 2, 'Model Town M Block', 'lahore', 'punjab', 'pakistan', 'pakistan@gmail.com', '03030242733', 'kickstart m block', NULL, NULL, 'active', '2024-05-31 16:18:22', '2024-05-31 16:19:21', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `claims`
--

CREATE TABLE `claims` (
  `id` bigint UNSIGNED NOT NULL,
  `hms_id` bigint UNSIGNED NOT NULL,
  `article_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purchase_date` date NOT NULL,
  `article_price` decimal(10,2) NOT NULL,
  `period` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `customer_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ptcl_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cell` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shop_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `qa_message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `distribution_message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_closed` tinyint(1) NOT NULL DEFAULT '0',
  `proposed_status` tinyint(1) NOT NULL DEFAULT '0',
  `color` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` int DEFAULT NULL,
  `inward_gate_pass` int DEFAULT NULL,
  `is_received` tinyint(1) NOT NULL DEFAULT '0',
  `receiving_remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `received_date_and_time` datetime DEFAULT NULL,
  `invoice_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `claims`
--

INSERT INTO `claims` (`id`, `hms_id`, `article_number`, `name`, `invoice`, `purchase_date`, `article_price`, `period`, `customer_name`, `customer_address`, `customer_email`, `ptcl_number`, `cell`, `shop_id`, `created_at`, `updated_at`, `status`, `message`, `qa_message`, `distribution_message`, `is_closed`, `proposed_status`, `color`, `size`, `inward_gate_pass`, `is_received`, `receiving_remarks`, `received_date_and_time`, `invoice_image`) VALUES
(1, 2, '74', 'Charissa Green', 'Distinctio Eaque ni', '1979-01-01', 575.00, 'Harum consectetur fa', 'Griffith Keiths', 'Et quis dolore amet', 'cemykumot@mailinator.com', '67', 'Qui aut quia sed vol', '2', '2024-12-16 06:54:19', '2024-12-19 13:14:39', 4, 'sfcsafsdf', NULL, NULL, 1, 0, NULL, NULL, NULL, 0, NULL, NULL, NULL),
(2, 2, '120', 'Lev Juarez', 'Aute id ipsa rerum', '2022-10-29', 515.00, 'Quos id quidem vel a', 'Damian Chase', 'Vero ab temporibus a', 'vemucop@mailinator.com', '281', 'Sint quis modi ullam', '1', '2024-12-18 11:15:22', '2024-12-19 12:45:12', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia hendrerit quam eget accumsan. Curabitur consequat venenatis lectus a imperdiet. In hac habitasse platea dictumst. Phasellus commodo orci at nibh tempor, sit amet tincidunt est porta. Quisque eget efficitur urna, eu interdum est. Suspendisse nec nulla elit. Etiam viverra nibh consectetur purus commodo sodales. Nam blandit turpis sed dignissim efficitur.', 'Integer nec sem magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque ac leo sit amet neque tristique fermentum. Phasellus risus felis, consequat vitae lacinia a, aliquet vel ipsum. Sed sollicitudin diam sed cursus tincidunt. Mauris vulputate faucibus justo, vitae cursus est iaculis et. Etiam ultrices magna non ipsum venenatis mollis. Quisque vel nunc vitae eros elementum sodales. Praesent nec ipsum varius lacus imperdiet rutrum. Morbi id lobortis enim. Suspendisse accumsan orci neque, id sagittis risus dignissim eget. Donec rhoncus neque quis purus finibus, at tempor enim accumsan. In vestibulum odio eget augue sodales, id sollicitudin sem viverra. Etiam et vehicula nunc, sit amet dictum leo.', 'Phasellus blandit tincidunt purus, sit amet gravida ipsum placerat quis. Fusce risus nisi, facilisis vitae elit eu, finibus rhoncus magna. Mauris ultrices ligula non nunc sagittis semper. Vivamus ligula diam, feugiat vel libero id, malesuada pulvinar ex. Nulla non dapibus nisi, in consequat augue. Nulla eu lacus id lectus vehicula cursus eget id justo. Mauris fermentum tortor ac turpis sollicitudin cursus. Nullam lobortis leo velit, nec scelerisque magna fermentum in. Praesent pretium accumsan pharetra. Vivamus posuere pellentesque turpis. Fusce pellentesque consectetur sem a faucibus. Aenean pellentesque, lectus hendrerit efficitur scelerisque, purus risus ultrices tortor, nec sollicitudin sem metus at tellus.', 1, 0, NULL, NULL, NULL, 0, NULL, NULL, NULL),
(3, 2, '481', 'Aubrey Barrera', 'Alias facere volupta', '1982-09-06', 628.00, 'Qui reprehenderit p', 'Imani Castaneda', 'Minim est autem vol', 'jolo@mailinator.com', '305', 'Qui autem mollit dis', '3', '2024-12-19 13:21:07', '2024-12-20 10:27:10', 4, 'sfcsdfasdasda', NULL, NULL, 1, 0, NULL, NULL, NULL, 0, NULL, NULL, NULL),
(4, 2, '288', 'Orla James', '123456789', '2015-04-26', 272.00, 'Sit tempora Nam qui', 'Joseph Wells', 'Enim culpa veniam', 'pujige@mailinator.com', '04235123456', '052342233', '1', '2024-12-20 09:42:45', '2024-12-20 10:27:22', 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia hendrerit quam eget accumsan. Curabitur consequat venenatis lectus a imperdiet. In hac habitasse platea dictumst. Phasellus commodo orci at nibh tempor, sit amet tincidunt est porta. Quisque eget efficitur urna, eu interdum est. Suspendisse nec nulla elit. Etiam viverra nibh consectetur purus commodo sodales. Nam blandit turpis sed dignissim efficitur.', 'Integer nec sem magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque ac leo sit amet neque tristique fermentum. Phasellus risus felis, consequat vitae lacinia a, aliquet vel ipsum. Sed sollicitudin diam sed cursus tincidunt. Mauris vulputate faucibus justo, vitae cursus est iaculis et. Etiam ultrices magna non ipsum venenatis mollis. Quisque vel nunc vitae eros elementum sodales. Praesent nec ipsum varius lacus imperdiet rutrum. Morbi id lobortis enim. Suspendisse accumsan orci neque, id sagittis risus dignissim eget. Donec rhoncus neque quis purus finibus, at tempor enim accumsan. In vestibulum odio eget augue sodales, id sollicitudin sem viverra. Etiam et vehicula nunc, sit amet dictum leo.', 'Phasellus blandit tincidunt purus, sit amet gravida ipsum placerat quis. Fusce risus nisi, facilisis vitae elit eu, finibus rhoncus magna. Mauris ultrices ligula non nunc sagittis semper. Vivamus ligula diam, feugiat vel libero id, malesuada pulvinar ex. Nulla non dapibus nisi, in consequat augue. Nulla eu lacus id lectus vehicula cursus eget id justo. Mauris fermentum tortor ac turpis sollicitudin cursus. Nullam lobortis leo velit, nec scelerisque magna fermentum in. Praesent pretium accumsan pharetra. Vivamus posuere pellentesque turpis. Fusce pellentesque consectetur sem a faucibus. Aenean pellentesque, lectus hendrerit efficitur scelerisque, purus risus ultrices tortor, nec sollicitudin sem metus at tellus.', 1, 0, NULL, NULL, NULL, 0, NULL, NULL, NULL),
(5, 2, '954', 'Yvette Morris', '12', '1974-12-08', 237.00, 'Eaque dolor vero est', 'Arden Alvarez', 'Et omnis vel tempori', 'hofilumuj@mailinator.com', '04235123456', '03231234566', '2', '2024-12-23 08:33:08', '2024-12-23 09:50:12', 3, 'adasdasdasdasdaasasasas', NULL, NULL, 0, 0, NULL, NULL, NULL, 0, NULL, NULL, NULL),
(6, 2, '638', 'Galvin Mccarty', '44', '1988-02-07', 971.00, 'Ad autem autem et en', 'Hakeem Matthews', 'Cum laudantium vita', 'varogejyby@mailinator.com', '04235123456', '03231234567', '1', '2024-12-23 09:10:32', '2024-12-23 10:10:17', 4, 'adfasdasdas', NULL, NULL, 1, 1, NULL, NULL, NULL, 0, NULL, NULL, NULL),
(7, 2, '839', 'Kaye Miranda', '22', '1982-05-02', 683.00, 'Eu cupidatat hic et', 'Marny Knapp', 'Eos ad qui hic fuga', 'cyviquja@mailinator.com', '04235123456', '03211234567', '2', '2024-12-23 11:30:19', '2024-12-26 06:37:15', 4, 'claim accepted', NULL, NULL, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, NULL),
(8, 2, '534', 'Wendy Jenkins', '83', '1987-07-20', 869.00, 'Consequatur nihil ac', 'Illana Santos', 'Placeat aut eius mo', 'cihaxygify@mailinator.com', '04235123456', '03231234567', '3', '2024-12-24 13:06:21', '2024-12-24 13:06:21', 0, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 0, NULL, NULL, NULL),
(9, 2, '514', 'Hamilton Anderson', '7', '1971-10-24', 930.00, 'Quia voluptas dicta', 'Inez Estrada', 'Eos commodo veniam', 'pyhacoda@mailinator.com', '04235123456', '03231234567', '2', '2024-12-24 13:25:51', '2024-12-26 10:41:45', 5, 'Claim Submit', NULL, NULL, 0, 0, 'Quo eaque in dolore', 43, NULL, 1, NULL, '2024-12-26 15:41:39', NULL),
(10, 2, '497', 'Brody Underwood', '83', '1973-03-10', 72.00, 'Irure consequuntur d', 'Deanna Murray', 'Elit non corporis e', 'wunuk@mailinator.com', '04235123456', '03211234567', '2', '2024-12-26 12:27:53', '2024-12-26 12:27:53', 0, NULL, NULL, NULL, 0, 1, 'Facilis sequi nobis', 39, NULL, 0, NULL, NULL, NULL),
(11, 2, '643', 'Asher Rose', '53', '2008-08-24', 878.00, 'Ut velit deserunt du', 'Elaine Wolf', 'Eum commodo est dolo', 'xuxos@mailinator.com', '04235123456', '03211234567', '3', '2024-12-26 12:30:43', '2024-12-26 12:30:43', 0, NULL, NULL, NULL, 0, 1, 'Rerum voluptas eum e', 41, NULL, 0, NULL, NULL, NULL),
(13, 2, '701', 'Ella Bowman', '37', '1971-12-26', 871.00, 'Culpa iste dolor sol', 'Velma Velez', 'Eius cillum culpa q', 'hufarol@mailinator.com', '04235123456', '03211234567', '2', '2024-12-26 12:39:24', '2024-12-26 12:39:24', 0, NULL, NULL, NULL, 0, 0, 'Sit numquam et aut u', 40, NULL, 0, NULL, NULL, NULL),
(14, 2, '615', 'Brooke Norman', '45', '2001-06-16', 487.00, 'Modi atque in fugiat', 'Maggie Bradley', 'Enim quas dolore vol', 'lelohaju@mailinator.com', '04235123456', '03211234567', '1', '2024-12-26 12:51:26', '2024-12-26 12:51:26', 0, NULL, NULL, NULL, 0, 0, 'Quia enim commodo am', 40, NULL, 0, NULL, NULL, NULL),
(15, 2, '374', 'Daryl Patel', '97', '2009-09-21', 984.00, 'Cupidatat id non eiu', 'Rudyard Mckenzie', 'Eveniet quaerat sun', 'qowuxotut@mailinator.com', '04235123456', '03211234567', '2', '2024-12-26 12:52:16', '2024-12-26 12:52:16', 0, NULL, NULL, NULL, 0, 1, 'Odio quas elit dign', 39, NULL, 0, NULL, NULL, NULL),
(16, 2, '597', 'Benedict Deleon', '85', '1999-03-22', 274.00, 'Qui quia quia aperia', 'Lane Travis', 'Numquam ad doloribus', 'temibaw@mailinator.com', '04235123456', '03211234567', '1', '2024-12-26 12:53:15', '2024-12-26 12:53:15', 0, NULL, NULL, NULL, 0, 0, 'Incidunt illo totam', 41, NULL, 0, NULL, NULL, NULL),
(17, 2, '754', 'Upton Booth', '7', '2017-10-26', 969.00, 'Quidem excepturi nob', 'Illiana Reynolds', 'Et necessitatibus fu', 'huxavaluxu@mailinator.com', '04235123456', '03211234567', '3', '2024-12-26 12:54:42', '2024-12-26 12:54:42', 0, NULL, NULL, NULL, 0, 1, 'A voluptate labore l', 39, NULL, 0, NULL, NULL, 'images/x9DfkzT4rGyuYTYqXZv95agwEdpw8hUMNxjqjXeg.png'),
(18, 2, '709', 'Imani Peterson', '79', '1975-02-21', 152.00, 'Sunt voluptate praes', 'Mechelle Rogers', 'Maiores recusandae', 'nuhusaf@mailinator.com', '04235123456', '03211234567', '2', '2024-12-26 12:57:17', '2024-12-26 12:57:17', 0, NULL, NULL, NULL, 0, 1, 'Et sunt aute et neq', 44, NULL, 0, NULL, NULL, 'images/u9jgN3Az7FTO5juJq7ObVOmcgj6L11zPUrhlVRv9.png'),
(24, 2, '714', 'Stacey Hunter', '8', '2022-03-09', 838.00, 'Vitae cum odit porro', 'Amanda Wilkins', 'Voluptates amet ad', 'tejol@mailinator.com', '04235123456', '03211234567', '2', '2024-12-27 07:48:10', '2024-12-27 09:10:57', 1, 'afasasdsa', NULL, NULL, 0, 1, 'Commodo dolor praese', 44, NULL, 0, NULL, NULL, 'images/4JFdpL6ArPk1wejXfUft4XeNszrGyG8qgSxfsbZs.png');

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `id` bigint UNSIGNED NOT NULL,
  `companyId` bigint UNSIGNED NOT NULL,
  `driver_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `driver_cnic_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `driver_mobile_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `driving_licence_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `driver_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`id`, `companyId`, `driver_name`, `driver_cnic_no`, `driver_mobile_no`, `driving_licence_no`, `driver_address`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 22789, 'dri', '3130473761', '03036470', '03', 'Lah', '2024-10-14 16:36:55', '2024-10-14 17:05:27', '2024-10-14 17:05:27'),
(2, 22789, 'Driver', '2323', '232', '223', 'hello', '2024-10-21 15:32:00', '2024-10-21 15:34:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hms`
--

CREATE TABLE `hms` (
  `id` bigint UNSIGNED NOT NULL,
  `owner_id` bigint UNSIGNED NOT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default.png',
  `status` enum('active','suspend','in_active') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hms`
--

INSERT INTO `hms` (`id`, `owner_id`, `name`, `domain`, `city`, `country`, `email`, `phone`, `address`, `logo`, `status`, `created_at`, `updated_at`) VALUES
(2, 1, 'Claim Utility', '', '', '', '', '', ' ', '/images/logo/fleetconnect.png', 'active', NULL, '2024-12-17 13:02:56');

-- --------------------------------------------------------

--
-- Table structure for table `hms_has_permission`
--

CREATE TABLE `hms_has_permission` (
  `id` bigint UNSIGNED NOT NULL,
  `hms_id` bigint UNSIGNED NOT NULL,
  `permissions_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hms_has_permission`
--

INSERT INTO `hms_has_permission` (`id`, `hms_id`, `permissions_id`, `created_at`, `updated_at`) VALUES
(108, 2, 110, NULL, NULL),
(112, 2, 113, NULL, NULL),
(113, 2, 114, NULL, NULL),
(114, 2, 1, NULL, NULL),
(115, 2, 2, NULL, NULL),
(116, 2, 3, NULL, NULL),
(117, 2, 4, NULL, NULL),
(120, 2, 73, NULL, NULL),
(121, 2, 74, NULL, NULL),
(122, 2, 75, NULL, NULL),
(123, 2, 76, NULL, NULL),
(124, 2, 85, NULL, NULL),
(125, 2, 86, NULL, NULL),
(126, 2, 87, NULL, NULL),
(127, 2, 88, NULL, NULL),
(128, 2, 89, NULL, NULL),
(129, 2, 90, NULL, NULL),
(130, 2, 91, NULL, NULL),
(131, 2, 92, NULL, NULL),
(132, 2, 115, '2024-01-02 13:00:10', '2024-01-02 13:00:10'),
(133, 2, 116, '2024-01-02 14:19:50', '2024-01-02 14:19:50'),
(134, 2, 117, '2024-01-02 14:19:55', '2024-01-02 14:19:55'),
(147, 2, 94, '2024-01-02 19:39:09', '2024-01-02 19:39:09'),
(148, 2, 118, NULL, NULL),
(149, 2, 119, NULL, NULL),
(150, 2, 108, NULL, NULL),
(151, 2, 123, NULL, NULL),
(153, 2, 122, NULL, NULL),
(154, 2, 124, NULL, NULL),
(155, 2, 121, NULL, NULL),
(175, 2, 126, NULL, NULL),
(185, 2, 136, NULL, NULL),
(198, 2, 127, NULL, NULL),
(208, 2, 154, NULL, NULL),
(209, 2, 155, NULL, NULL),
(210, 2, 156, NULL, NULL),
(211, 2, 157, NULL, NULL),
(212, 2, 158, NULL, NULL),
(213, 2, 159, NULL, NULL),
(214, 2, 160, NULL, NULL),
(215, 2, 161, NULL, NULL),
(220, 2, 29, '2024-05-21 15:11:33', '2024-05-21 15:11:33'),
(221, 2, 30, '2024-05-21 15:11:33', '2024-05-21 15:11:33'),
(222, 2, 31, '2024-05-21 15:11:33', '2024-05-21 15:11:33'),
(223, 2, 32, '2024-05-21 15:11:33', '2024-05-21 15:11:33'),
(224, 2, 33, '2024-05-21 15:11:33', '2024-05-21 15:11:33'),
(225, 2, 34, '2024-05-21 15:11:33', '2024-05-21 15:11:33'),
(226, 2, 35, '2024-05-21 15:11:33', '2024-05-21 15:11:33'),
(227, 2, 36, '2024-05-21 15:11:33', '2024-05-21 15:11:33'),
(236, 2, 170, NULL, NULL),
(237, 2, 171, NULL, NULL),
(238, 2, 172, NULL, NULL),
(239, 2, 173, NULL, NULL),
(240, 2, 174, NULL, NULL),
(241, 2, 175, NULL, NULL),
(242, 2, 176, NULL, NULL),
(243, 2, 177, NULL, NULL),
(244, 2, 178, NULL, NULL),
(245, 2, 179, NULL, NULL),
(246, 2, 180, NULL, NULL),
(247, 2, 181, NULL, NULL),
(248, 2, 182, NULL, NULL),
(249, 2, 183, NULL, NULL),
(250, 2, 184, NULL, NULL),
(251, 2, 185, NULL, NULL),
(252, 2, 186, NULL, NULL),
(253, 2, 187, NULL, NULL),
(254, 2, 188, NULL, NULL),
(255, 2, 189, NULL, NULL),
(256, 2, 190, NULL, NULL),
(257, 2, 191, NULL, NULL),
(258, 2, 192, NULL, NULL),
(259, 2, 193, NULL, NULL),
(260, 2, 194, NULL, NULL),
(261, 2, 198, NULL, NULL),
(262, 2, 199, NULL, NULL),
(264, 2, 201, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint UNSIGNED NOT NULL,
  `claim_id` bigint UNSIGNED NOT NULL,
  `defect_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `claim_id`, `defect_image`, `created_at`, `updated_at`) VALUES
(1, 24, 'images/pKx20oMrGBxTD2RCb5zo9WokywASkMcS12xaXyeK.jpg', '2024-12-27 07:48:10', '2024-12-27 07:48:10'),
(2, 24, 'images/UksDGRf4UhgtLHzzdhg1eTu7ZTL6od9U7u4Ctxxe.png', '2024-12-27 07:48:10', '2024-12-27 07:48:10'),
(3, 24, 'images/SAr1l2xKrXAopc7dTnzn36YMrmAxG7VvIURqzb56.jpg', '2024-12-27 07:48:10', '2024-12-27 07:48:10');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2014_10_12_200000_add_two_factor_columns_to_users_table', 2),
(4, '2019_08_19_000000_create_failed_jobs_table', 2),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 2),
(6, '2023_05_19_063431_create_user_login_sessions_table', 2),
(7, '2023_05_22_061708_create_employees_table', 2),
(8, '2023_05_22_064748_create_doctors_table', 2),
(9, '2023_05_22_065400_create_doctor_types_table', 2),
(10, '2023_05_22_070209_create_patients_table', 2),
(11, '2023_05_22_071640_create_patients_type_table', 2),
(12, '2023_05_22_072145_create_dependents_table', 2),
(13, '2023_05_22_073119_create_receptionist_table', 2),
(14, '2023_05_22_073838_create_pharmacists_table', 2),
(19, '2023_05_22_125237_create_role_table', 3),
(20, '2023_06_01_133127_create_sessions_table', 3),
(21, '2023_06_05_132720_create_departments_table', 3),
(22, '2023_06_05_133058_create_clinical_services_table', 3),
(23, '2023_05_22_083624_create_patient_entry_table', 4),
(24, '2023_06_14_105841_create_hms_table', 4),
(25, '2023_06_14_122323_create_branch_table', 4),
(26, '2023_06_26_114804_modify_pharmacists_table', 4),
(27, '2023_06_26_115410_modify_patients_type_table', 4),
(28, '2023_06_27_154408_modify_receptionists_table', 4),
(29, '2023_07_03_140348_create_panel_organization_table', 4),
(30, '2023_07_03_140428_create_panel_patient_detail_table', 4),
(31, '2023_07_06_084815_add_column_employee_detail_to_patients_type_table', 4),
(32, '2023_07_06_090756_create_manufacturers_table', 4),
(33, '2023_07_06_090823_create_dosage_forms_table', 4),
(34, '2023_07_06_092258_create_medicines_table', 4),
(35, '2023_07_06_092401_create_inventory_items_table', 5),
(36, '2023_07_06_121534_add_column_softdelete_to_manufacturers_table', 5),
(37, '2023_07_06_122008_create_patient_visit_price_table', 5),
(38, '2023_07_07_073529_add_column_status_to_dosage_forms_table', 5),
(39, '2023_07_11_074741_create_patient_employment_table', 5),
(40, '2023_07_11_110642_create_lab_tests_table', 5),
(41, '2023_07_11_111610_create_inventory_types_table', 5),
(42, '2023_07_11_112023_add_column_lab_test_id_to_inventor_items_table', 5),
(44, '2023_05_22_100050_create_prescriptions_table', 7),
(46, '2023_05_22_102717_create_medicine_dosage_table', 8),
(47, '2023_07_11_110642_create_investigation_table', 9),
(48, '2023_05_22_101452_create_patient_investigation_table', 10),
(49, '2023_07_24_102310_pharmacy', 11),
(50, '2023_07_25_154318_create_investigation_price_table', 12),
(51, '2023_07_25_161351_create_medicine_reorder_level_table', 12),
(52, '2023_07_26_071511_create_pharmacy_clinical_service_table', 13),
(54, '2023_05_22_111145_create_payment_invoice_table', 15),
(55, '2023_08_02_200302_create_permission_tables', 16),
(56, '2023_05_22_111145_create_prescription_invoice_table', 17),
(57, '2023_08_11_071730_add_column_to_patient_visit', 17),
(58, '2023_08_11_120610_create_procedures_table', 17),
(59, '2023_08_11_120629_create_procedure_price_table', 17),
(60, '2023_08_16_162622_create_patient_procedure_table', 17),
(62, '2023_08_22_222630_add_column_to_roles_table', 18),
(63, '2023_08_24_154437_modify_pharmacy_table', 19),
(64, '2023_08_24_091719_modified_patients_type_table', 20),
(65, '2023_08_24_185630_modify_medicines_table', 20),
(67, '2023_08_29_170116_modify_users_table_bkp', 22),
(68, '2023_08_29_170116_modify_users_table', 23),
(69, '2023_08_29_111103_modify_patient_employment_table', 24),
(70, '2023_07_31_161833_create_request_indent_table', 25),
(71, '2023_08_21_145134_create_requested_medicine_table', 25),
(72, '2023_09_05_132437_modify_medicines_table', 26),
(73, '2023_09_05_200612_modify_medicine_dosage_table', 27),
(79, '2023_09_18_040505_modify_patient_investigation_table', 28),
(80, '2023_09_27_070801_modify_inventory_items_table', 28),
(81, '2023_10_04_133404_modify_patient_visit_table', 29),
(82, '2023_10_06_125928_modify_requested_medicine_table', 29),
(85, '2023_10_06_125954_modify_request_indent_table', 30),
(86, '2023_10_09_101858_modify_branch_table', 31),
(87, '2023_10_11_080210_modify_dependents_table', 32),
(90, '2023_10_05_110833_create_appointment_table', 33),
(92, '2023_10_26_133156_create_user_wise_branch_setting_table', 34),
(93, '2023_11_13_124912_modify_branch_table', 35),
(94, '2023_11_14_133404_modify_patient_visit_table', 36),
(95, '2023_11_20_100819_create_doctor_wise_time_duration_table', 36),
(96, '2023_11_20_100819_create_user_time_duration_table', 37),
(97, '2023_11_15_152637_modify_requested_medicine', 38),
(98, '2023_11_21_095304_create_agencies_table', 39),
(99, '2023_11_23_062553_create_agencies_rules_table', 39),
(100, '2023_11_23_145120_modify_inventory_items_table', 39),
(101, '2023_11_27_124715_modify_patient_visit_table', 40),
(102, '2023_11_28_141316_modify_medicine_dosage_table', 40),
(103, '2023_12_04_163539_modify_appointment_table', 41),
(104, '2023_11_27_065442_create_agencies_rules_applicables_table', 42),
(105, '2023_11_28_112233_create_subscribed_agencies_rules_table', 42),
(106, '2023_11_29_205202_modifiy_colunm_subscribed_agencies_rules', 42),
(107, '2023_11_30_160157_created_agencies_rules_payments', 42),
(108, '2023_12_04_133501_modify_patient_visit_table', 42),
(109, '2023_12_04_162421_modifiy__enum_agencies_rules_payments', 43),
(110, '2023_12_11_175742_modify_agencies_rules_applicable_table', 44),
(111, '2023_12_11_204325_create_module_table', 44),
(112, '2023_12_12_185950_modify_agencies_rules_applicable', 44),
(113, '2023_12_13_152705_modify_subscribed_agencies_rules_table', 44),
(114, '2023_12_18_121655_create_hms_has_permission_table', 45),
(115, '2023_12_20_152840_modify_columnof_subscribed_agencies_rules_table', 46),
(116, '2023_12_26_145106_modify_patient_procedure_table', 47),
(117, '2024_01_03_235917_modify_appointment_table', 48),
(118, '2024_01_11_154547_create_status_definitions_table', 49),
(119, '2024_01_18_192653_modify_patient_procedure_table', 50),
(120, '2024_01_18_193532_modify_patient_investigation_table', 50),
(121, '2024_01_18_225309_add_column_deletedat_branch_table', 51),
(122, '2024_01_19_000406_add_column_deletedat_users_table', 51),
(123, '2024_01_19_165634_create_activity_log_table', 52),
(124, '2024_01_19_165635_add_event_column_to_activity_log_table', 52),
(125, '2024_01_19_165636_add_batch_uuid_column_to_activity_log_table', 52),
(126, '2024_01_18_183024_add_column_to_appointment_table', 53),
(127, '2024_01_25_193510_add_column_default_location_in_roles_table', 54),
(128, '2024_01_31_181321_create_patient_medical_history_table', 55),
(129, '2024_01_31_192520_create_personal_history_table', 55),
(130, '2024_02_02_180141_add_created_updated_by_to_patient_medical_history', 55),
(131, '2024_02_06_123025_create_patient_examination_history_table', 55),
(132, '2024_02_06_123725_create_patient_clinical_notes_table', 55),
(133, '2024_02_13_175036_create_calendar_notes_table', 56),
(134, '2024_02_14_131451_update_dates_columns_nullable', 56),
(135, '2024_02_15_163049_create_private_clinic_prescriptions_table', 56),
(136, '2024_02_14_123606_create_scanned_document_table', 57),
(137, '2024_02_17_173702_create_patient_letter_table', 57),
(138, '2024_02_19_192217_create_accounts_table', 57),
(139, '2024_02_17_173600_create_forms_table', 58),
(140, '2024_02_27_170915_add_holiday_col_to_calendar_notes', 59),
(141, '2024_02_27_185149_add_ref_doc_to_users', 59),
(142, '2024_04_04_161942_modify_medicines_table', 60),
(143, '2024_03_06_184151_change_template_column_type_in_patient_letters_table', 61),
(144, '2024_03_07_160223_add_letter_body_column_to_patient_letters_table', 61),
(145, '2024_03_07_181521_modify_users_table', 61),
(148, '2024_03_18_145902_create_letters_table', 61),
(149, '2024_03_19_150502_create_patient_letters_table', 62),
(150, '2024_03_21_150250_create_letter_templates_table', 62),
(151, '2024_03_26_142444_create_template_assets_table', 62),
(152, '2024_03_28_143343_create_letter_template_group__b_table', 62),
(153, '2024_04_01_160924_create_request_for_discs_hmc_table', 62),
(154, '2024_04_02_112957_create_infusion_suite_referral_table', 62),
(155, '2024_04_02_125354_create_medicolegal_report_table', 62),
(156, '2024_04_02_144301_create_discharge_letter_table', 62),
(157, '2024_04_18_154225_drop_forms_table', 62),
(158, '2024_04_18_155513_create_forms_table', 62),
(159, '2024_04_18_160053_create_form_templates_table', 62),
(160, '2024_04_19_115356_create_patient_forms_table', 62),
(161, '2024_04_25_132405_add_code_to_procedures', 63),
(162, '2024_04_25_183507_prescription_has_medicine_table', 63),
(163, '2024_04_25_184724_modify_private_clinic_prescription_table', 63),
(164, '2024_04_25_185944_add_colunm_users_table', 64),
(165, '2024_05_02_162358_create__external__hospital_table', 65),
(167, '2024_05_06_140311_modify_private_clinic_prescriptions_table', 66),
(168, '2024_05_07_180047_modify_appointment_table', 66),
(169, '2024_05_07_182303_modify_users_table', 67),
(170, '2024_05_06_161834_create_chart_of_accounts_table', 68),
(172, '2024_05_10_155139_add_column_is_gdpr_to_users_table', 69),
(174, '2024_05_14_191816_modify_users_table', 71),
(178, '2024_05_15_203152_create_insurance_plans_table', 72),
(179, '2024_04_30_183950_create_insurance_companies_table', 73),
(181, '2024_05_15_212756_modify_add_mrnno_and_hospitalusers_table', 75),
(183, '2024_03_11_171544_create_contacts_table', 77),
(184, '2024_05_13_145320_modify_contacts_table', 78),
(185, '2024_05_17_144400_add_title_to_contacts_table', 79),
(186, '2024_05_16_121424_modify_add_mrnno_and_hospitalusers_table', 80),
(187, '2024_05_16_140027_create_receipt_table', 81),
(189, '2024_05_23_162520_add_clinical_notes_date_to_patient_clinical_notes', 83),
(190, '2024_05_20_210029_modify_insurance_companies_table', 84),
(191, '2024_05_22_162628_modify_phone_in_users_table', 84),
(195, '2024_05_10_141821_create_patient_accounts_table', 85),
(196, '2024_03_11_172320_create_user_has_contacts_table', 86),
(198, '2024_05_15_131427_modify_users_table', 87),
(200, '2024_05_15_163412_modify_users_table', 89),
(201, '2024_05_24_201933_drop_columns_from_users_table', 90),
(202, '2024_05_15_164328_modify_users_table', 91),
(203, '2024_06_03_154244_modify__patient_clinical_notes_table', 92),
(204, '2024_06_05_183239_modify_appointment_table', 93),
(205, '2024_06_26_164439_modify_scanned_documents_table', 94),
(206, '2024_07_08_143327_add_summernote_code_to_patient_letters_table', 95),
(207, '2024_07_10_134908_modify_notes_column_in_patient_letters_group_b_table', 95),
(208, '2024_07_10_185813_add_summernote_code_to_patient_letters_group_b_table', 95),
(209, '2024_05_03_155631_create_blackrock_clinic_booking_table', 96),
(210, '2024_05_03_160657_create_relation_blackrock_booking_table', 96),
(214, '2024_06_26_191801_modify_forms_table', 96),
(216, '2024_06_28_191016_create_hermitage_booking_medication_table', 96),
(218, '2024_07_22_141847_create_blackrock_clinic_vascular_laboratory_request_form_table', 97),
(219, '2024_07_23_194332_create_bank_details_table', 97),
(220, '2024_07_25_161749_create_expense_category_table', 98),
(221, '2024_07_23_152716_create_blackrock_radiology_form_table', 99),
(222, '2024_07_24_171448_create_hermitage_eeg_request_form_table', 99),
(223, '2024_07_24_200231_create_hermitage_ncs_request_form_table', 99),
(224, '2024_07_25_190420_create_hermitage_vascular_request_form_table', 99),
(225, '2024_07_26_150246_create__expense_table', 99),
(226, '2024_06_28_170541_create_hermitage_booking_form_table', 100),
(227, '2024_07_01_172307_create_hermitage_booking_contact_table', 101),
(228, '2024_07_31_150246_create__expense_table', 102),
(229, '2024_08_07_154005_modify_insurance_companies_table', 103),
(230, '2024_08_08_152452_rename_category_to_category_id_in_expense_table', 104),
(231, '2024_08_10_123626_add_tax_to_insurance_companies_table', 104),
(232, '2024_08_10_211456_add_r-tax_to_patient_accounts_table', 104),
(233, '2024_08_07_132535_create_update_scanned_document_table', 105),
(234, '2024_08_07_134254_drop_column_from_users_table', 105),
(235, '2024_08_15_171115_create_temp_form_table', 106),
(236, '2024_05_16_182534_create_beacon_hospital_booking_medications_table', 107),
(237, '2024_05_16_171546_create_beacon_hospital_booking_table', 108),
(238, '2024_05_03_171934_create_clinical_blackrock_booking_table', 109),
(239, '2024_08_23_145945_modify_users_status_enum_table', 110),
(240, '2024_08_20_164410_create_hermitage_radiology_department_table', 111),
(241, '2024_08_22_185113_create_hermitage_cardiology_request_table', 111),
(242, '2024_08_23_180712_modify_private_clinic_prescription_table', 111),
(243, '2024_08_23_184028_modify_prescription_has_medicine_table', 111),
(244, '2024_08_26_162300_delete_user_status_enum_table', 112),
(245, '2024_08_26_165531_update_user_statuses_table', 112),
(246, '2024_08_28_130837_create_stick_note_table', 113),
(247, '2024_08_28_162317_modify_prescription_has_medicine_table', 113),
(248, '2024_08_29_192419_add_deleted_at_to_contacts_table', 113),
(249, '2024_08_29_193036_add_deleted_at_to_user_has_contacts_table', 113),
(250, '2024_08_29_193848_add_deleted_at_to_patients_table', 113),
(251, '2024_08_30_181925_add_deleted_at_to_insurance_companies_table', 114),
(252, '2024_08_30_193018_modify_patient_examination_history_table', 114),
(253, '0000_00_00_000000_create_websockets_statistics_entries_table', 115),
(254, '0000_00_00_000000_rename_statistics_counters', 115),
(255, '2024_08_27_164137_create_beacon_cardiology_request_table', 116),
(256, '2024_08_28_191303_create_beacon_radiology_request_table', 116),
(257, '2024_09_02_142003_create_beacon_respiratory_request_table', 116),
(258, '2024_09_03_125940_create_beacon_vascular_request_table', 116),
(259, '2024_09_03_160315_create_hermitage_clinical_labortary_table', 116),
(260, '2024_09_05_175614_create_medical_report_personal_table', 116),
(261, '2024_09_08_164740_add_is_printed_to_patient_letters', 116),
(262, '2024_09_08_172008_create_print_tray_table', 116),
(263, '2024_09_19_182352_add_is_printed_to_discharge_letters', 116),
(264, '2024_09_19_220935_add_is_printed_to_medicolegal_report', 116),
(265, '2024_09_21_180128_add_is_printed_to_infusion_suite_referral', 116),
(266, '2024_09_21_181008_add_is_printed_to_request_for_discs_hmc', 116),
(267, '2024_09_24_124549_add_is_printed_to_patient_letters_group_b', 116),
(268, '2024_10_03_164948__add_deleted_at_to_stick_note_table', 117),
(269, '2024_10_10_212302_create_vehicles_table', 118),
(270, '2024_10_14_204511_create_driver_table', 119),
(273, '2024_10_15_222449_modify_user_table_name', 120),
(274, '2024_12_12_140833_create_claims_table', 121),
(275, '2024_12_12_145452_create_shops_table', 122),
(277, '2024_12_18_142016_add_message_in_claim_table', 123),
(278, '2024_12_23_114350_add_qa_message_and_disribution_message_in_claim_table', 124),
(279, '2024_12_23_124233_add_is_closed_and_proposed_staus_in_claims_table', 125),
(280, '2024_12_24_142335_add_is_active_field_in_shops_table', 126),
(281, '2024_12_24_181046_add_color_size_inward_gate_pass_in_claims_table', 127),
(282, '2024_12_26_135350_add_receiving_remarks_receiving_status_in_claims_table', 128),
(283, '2024_12_26_153407_add_received_date_time_in_claims_table', 129),
(284, '2024_12_26_174500_add_invoice_image_in_claims_table', 130),
(285, '2024_12_26_194829_create_images_table', 131);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(4, 'App\\Models\\User', 14916),
(13, 'App\\Models\\User', 16133),
(15, 'App\\Models\\User', 16140),
(13, 'App\\Models\\User', 16337),
(15, 'App\\Models\\User', 16339),
(4, 'App\\Models\\User', 16406),
(15, 'App\\Models\\User', 16407),
(13, 'App\\Models\\User', 16418),
(4, 'App\\Models\\User', 22805),
(15, 'App\\Models\\User', 22809),
(30, 'App\\Models\\User', 22810),
(31, 'App\\Models\\User', 22811),
(32, 'App\\Models\\User', 22812),
(13, 'App\\Models\\User', 22813);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'roles_read', 'web', '2023-08-22 22:34:50', '2024-02-17 19:44:31'),
(2, 'roles_write', 'web', '2023-08-22 22:34:50', '2024-02-17 19:44:48'),
(3, 'roles_create', 'web', '2023-08-22 22:34:50', '2024-02-17 19:44:56'),
(4, 'roles_delete', 'web', '2023-08-22 22:34:50', '2024-02-17 19:45:03'),
(17, 'doctor_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(18, 'doctor_write', 'web', '2023-08-22 22:34:50', '2024-02-17 19:44:41'),
(19, 'doctor_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(20, 'doctor_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(21, 'pharmacist_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(22, 'pharmacist_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(23, 'pharmacist_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(24, 'pharmacist_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(25, 'receptionist_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(26, 'receptionist_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(27, 'receptionist_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(28, 'receptionist_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(29, 'patient-type_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(30, 'patient-type_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(31, 'patient-type_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(32, 'patient-type_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(33, 'doctor-type_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(34, 'doctor-type_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(35, 'doctor-type_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(36, 'doctor-type_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(37, 'clinical-services_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(38, 'clinical-services_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(39, 'clinical-services_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(40, 'clinical-services_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(41, 'departments_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(42, 'departments_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(43, 'departments_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(44, 'departments_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(45, 'request-indent_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(46, 'request-indent_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(47, 'request-indent_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(48, 'request-indent_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(49, 'manufacturers_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(50, 'manufacturers_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(51, 'manufacturers_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(52, 'manufacturers_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(53, 'dosage-forms_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(54, 'dosage-forms_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(55, 'dosage-forms_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(56, 'dosage-forms_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(57, 'inventory-items_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(58, 'inventory-items_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(59, 'inventory-items_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(60, 'inventory-items_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(65, 'patient-visit_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(66, 'patient-visit_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(67, 'patient-visit_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(68, 'patient-visit_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(69, 'patient-visit-price_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(70, 'patient-visit-price_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(71, 'patient-visit-price_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(72, 'patient-visit-price_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(73, 'patient-opd_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(74, 'patient-opd_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(75, 'patient-opd_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(76, 'patient-opd_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(77, 'patient-ipd_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(78, 'patient-ipd_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(79, 'patient-ipd_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(80, 'patient-ipd_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(81, 'patient-er_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(82, 'patient-er_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(83, 'patient-er_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(84, 'patient-er_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(85, 'procedure_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(86, 'procedure_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(87, 'procedure_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(88, 'procedure_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(89, 'procedure-price_read', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(90, 'procedure-price_write', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(91, 'procedure-price_create', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(92, 'procedure-price_delete', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(93, 'dashboard', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(94, 'patient-progress', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(95, 'medicine-dispensed', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(96, 'laboratory-desk', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(97, 'radiology-desk', 'web', '2023-08-22 22:34:50', '2023-08-22 22:34:50'),
(104, 'branch_read', 'web', '2023-09-06 14:15:00', '2023-09-06 14:15:00'),
(105, 'branch_write', 'web', '2023-09-06 14:33:14', '2023-09-06 14:33:14'),
(106, 'branch_create', 'web', '2023-09-06 14:33:26', '2023-09-06 14:33:26'),
(107, 'branch_delete', 'web', '2023-09-06 14:33:35', '2023-09-06 14:33:35'),
(108, 'hms-settings', 'web', '2023-09-18 06:32:47', '2023-09-18 06:32:47'),
(109, 'inventory-in-bulk', 'web', '2023-09-25 04:10:58', '2023-09-25 04:10:58'),
(111, 'patient-report', 'web', '2023-11-07 09:00:48', '2023-11-07 09:00:48'),
(113, 'reports', 'web', '2023-11-07 09:02:39', '2023-11-07 09:02:39'),
(114, 'procedure-account-report', 'web', '2023-12-23 10:30:15', '2023-12-23 10:30:15'),
(115, 'private-user', 'web', '2024-01-02 17:52:13', '2024-01-02 17:52:13'),
(116, 'procedure', 'web', '2024-01-02 19:14:40', '2024-01-02 19:14:40'),
(117, 'procedure-desk', 'web', '2024-01-02 19:14:55', '2024-01-02 19:14:55'),
(118, 'types', 'web', '2024-01-18 18:18:42', '2024-01-18 18:18:42'),
(119, 'status-definition', 'web', '2024-01-18 18:18:52', '2024-01-18 18:18:52'),
(121, 'calendar', 'web', '2024-01-02 19:14:40', '2024-01-02 19:14:40'),
(122, 'patient', 'web', '2024-01-02 19:14:40', '2024-01-02 19:14:40'),
(123, 'branches', 'web', '2024-01-02 19:14:40', '2024-01-02 19:14:40'),
(124, 'doctor', 'web', '2024-01-02 19:14:40', '2024-01-02 19:14:40'),
(126, 'hms-externalhospital', 'web', '2024-05-02 19:57:50', '2024-05-02 19:57:50'),
(127, 'insurance', 'web', '2024-05-16 19:48:21', '2024-05-16 19:48:21'),
(136, 'contact', 'web', '2024-05-16 19:51:46', '2024-05-16 19:51:46'),
(154, 'insurance-company_read', 'web', '2024-05-17 13:46:17', '2024-05-17 13:46:17'),
(155, 'insurance-company_write', 'web', '2024-05-17 13:46:17', '2024-05-17 13:46:17'),
(156, 'insurance-company_create', 'web', '2024-05-17 13:46:17', '2024-05-17 13:46:17'),
(157, 'insurance-company_delete', 'web', '2024-05-17 13:46:17', '2024-05-17 13:46:17'),
(158, 'insurance-plan_read', 'web', '2024-05-17 14:27:29', '2024-05-17 14:27:29'),
(159, 'insurance-plan_write', 'web', '2024-05-17 14:27:29', '2024-05-17 14:27:29'),
(160, 'insurance-plan_create', 'web', '2024-05-17 14:27:29', '2024-05-17 14:27:29'),
(161, 'insurance-plan_delete', 'web', '2024-05-17 14:27:29', '2024-05-17 14:27:29'),
(174, 'medicines_read', 'web', '2024-05-22 16:19:40', '2024-05-22 16:19:40'),
(175, 'medicines_write', 'web', '2024-05-22 16:19:51', '2024-05-22 16:19:51'),
(176, 'medicines_create', 'web', '2024-05-22 16:20:19', '2024-05-22 16:20:19'),
(177, 'medicines_delete', 'web', '2024-05-22 16:20:29', '2024-05-22 16:20:29'),
(178, 'accounts', 'web', '2024-05-29 18:46:48', '2024-05-29 18:46:48'),
(179, 'invoice', 'web', '2024-05-29 18:47:45', '2024-05-29 18:47:45'),
(180, 'receipt', 'web', '2024-05-29 18:48:01', '2024-05-29 18:48:01'),
(181, 'bankdetails', 'web', '2024-07-24 19:17:41', '2024-07-24 19:17:41'),
(182, 'expenses', 'web', '2024-07-24 19:18:08', '2024-07-24 19:18:08'),
(183, 'expensecategory', 'web', '2024-07-25 19:11:55', '2024-07-25 19:11:55'),
(184, 'income-vs-expenditure', 'web', '2024-08-13 20:20:32', '2024-08-13 20:20:32'),
(185, 'monthly-income-report', 'web', '2024-08-19 12:46:11', '2024-08-19 12:46:11'),
(186, 'daily-report', 'web', '2024-08-23 23:38:06', '2024-08-23 23:38:06'),
(188, 'company', 'web', '2024-10-08 17:37:11', '2024-10-08 17:37:11'),
(189, 'shop', 'web', '2024-10-09 17:28:45', '2024-12-12 07:57:43'),
(190, 'vehicle', 'web', '2024-10-10 16:10:53', '2024-10-10 16:10:53'),
(191, 'driver', 'web', '2024-10-11 18:43:48', '2024-10-11 18:43:48'),
(192, 'location', 'web', '2024-10-21 17:31:51', '2024-10-21 17:31:51'),
(193, 'searchlocation', 'web', '2024-10-22 18:18:45', '2024-10-22 18:18:45'),
(194, 'claim', 'web', '2024-12-12 08:24:48', '2024-12-12 08:24:58'),
(195, 'ali', 'web', '2024-12-19 11:30:51', '2024-12-19 11:32:41'),
(198, 'QA', 'web', '2024-12-19 12:36:10', '2024-12-19 12:36:10'),
(199, 'Distribution', 'web', '2024-12-19 13:18:30', '2024-12-19 13:18:30'),
(200, 'has_permission', 'web', '2024-12-24 09:14:46', '2024-12-24 09:14:46'),
(201, 'doc', 'web', '2024-12-24 11:51:07', '2024-12-24 11:51:07');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `default_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hms_id` bigint UNSIGNED DEFAULT NULL,
  `branch_id` bigint UNSIGNED DEFAULT NULL,
  `status` enum('active','in_active') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `default_location`, `created_at`, `updated_at`, `slug`, `hms_id`, `branch_id`, `status`) VALUES
(4, 'Super Admin', 'web', NULL, '2023-08-24 17:41:02', '2023-08-24 17:41:02', 'super-admin', 2, 3, 'active'),
(13, 'Admin', 'web', NULL, '2023-09-27 05:57:01', '2023-12-15 13:48:57', 'admin', 2, 3, 'active'),
(15, 'Shop', 'web', NULL, '2023-09-28 05:10:53', '2024-10-09 17:22:59', 'shop', 2, 3, 'active'),
(30, 'Claim', 'web', NULL, '2024-12-19 07:19:05', '2024-12-19 07:19:05', 'claim', 2, NULL, 'active'),
(31, 'QA', 'web', NULL, '2024-12-19 12:37:01', '2024-12-19 12:37:01', 'qa', 2, NULL, 'active'),
(32, 'Distribution', 'web', NULL, '2024-12-19 13:18:46', '2024-12-19 13:18:46', 'distribution', 2, NULL, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 4),
(2, 4),
(3, 4),
(4, 4),
(29, 4),
(30, 4),
(31, 4),
(32, 4),
(33, 4),
(34, 4),
(35, 4),
(36, 4),
(73, 4),
(74, 4),
(75, 4),
(76, 4),
(85, 4),
(86, 4),
(87, 4),
(88, 4),
(89, 4),
(90, 4),
(91, 4),
(92, 4),
(94, 4),
(108, 4),
(113, 4),
(114, 4),
(115, 4),
(116, 4),
(117, 4),
(118, 4),
(119, 4),
(121, 4),
(122, 4),
(123, 4),
(124, 4),
(126, 4),
(127, 4),
(136, 4),
(154, 4),
(155, 4),
(156, 4),
(157, 4),
(158, 4),
(159, 4),
(160, 4),
(161, 4),
(174, 4),
(175, 4),
(176, 4),
(177, 4),
(178, 4),
(179, 4),
(180, 4),
(181, 4),
(182, 4),
(183, 4),
(184, 4),
(185, 4),
(186, 4),
(188, 4),
(189, 4),
(190, 4),
(191, 4),
(192, 4),
(193, 4),
(194, 4),
(198, 4),
(199, 4),
(108, 13),
(189, 13),
(194, 13),
(198, 13),
(199, 13),
(201, 13),
(194, 15),
(189, 30),
(194, 30),
(198, 31),
(199, 32);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('BIul33cmdO8k1tBkSKfiJLjG2OENCCQWmiCRdgee', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicGhRQlJtcERIQm90aVFzenhvUW1YQkIzS1BGajNEZlp5cXZPUExTdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hdXRoL2xvZ2luIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1730485551),
('IH4APWL5wdOaucoNugQlu222mnJQJZ7RwfzWXWKR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoib3JRcG12T3lVM3dGZXltdWRXbjlQaWRCR0JLRmI2ZWlHUlJjdGY3byI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czoyMToiaHR0cDovLzEyNy4wLjAuMTo4MDAwIjt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hdXRoL2xvZ2luIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1730484542),
('SQg8bxhonjMg7YYaxWd7qhXOKUCb1JOE8HKVlvrI', 22789, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiTjhkZ1NzQ2lNSlhucEVyaVJrNmI4M1NQc09WV1dkWFJwVDYwcXNsbyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI3OiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvcm9sZXMiO31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyMjc4OTt9', 1729876436),
('vpkRTph9pXK6doUHpamYZzINcH6JuY1wiXFGyOuZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiclU1bHlRT3ZYbHBBNm9PUkJlMzc4RzZIYVlEWjdkSG5tWmJMZTdvcCI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czoyMToiaHR0cDovLzEyNy4wLjAuMTo4MDAwIjt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hdXRoL2xvZ2luIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1729874279);

-- --------------------------------------------------------

--
-- Table structure for table `shops`
--

CREATE TABLE `shops` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shop_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shops`
--

INSERT INTO `shops` (`id`, `name`, `shop_number`, `address`, `created_at`, `updated_at`, `is_active`) VALUES
(1, 'Talon Wheeler', '457', 'Dolor omnis excepteu', '2024-12-12 13:06:48', '2024-12-12 13:06:48', 1),
(2, 'Aimee Martins', '452', 'Nostrud tempora poss', '2024-12-12 13:07:20', '2024-12-16 07:42:14', 1),
(3, 'Coby Stafford', '49432424234234', 'Sit et in incidunt', '2024-12-12 13:15:09', '2024-12-24 10:32:13', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `hms_id` bigint UNSIGNED DEFAULT NULL,
  `branch_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_no` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cnic` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  `shop_id` bigint DEFAULT NULL,
  `profile_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default.png',
  `status` enum('active','suspend','trash','in_active') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `latitude` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longitude` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_person` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `hms_id`, `branch_id`, `name`, `username`, `email`, `email_verified_at`, `password`, `mobile_no`, `cnic`, `address`, `role_id`, `shop_id`, `profile_image`, `status`, `created_at`, `updated_at`, `deleted_at`, `latitude`, `longitude`, `contact_person`) VALUES
(22789, 2, NULL, 'imran test', '', 'info@lahore.com', NULL, '$2y$12$s0pBT.e5IQFtWnkZXH1/vukO6bZ1CFXasbwZI.YVCzZWGYotT01Yy', '12121212121212', NULL, 'Lahore', 24, NULL, 'default.png', 'active', '2024-10-09 07:26:55', '2024-12-19 09:26:56', NULL, NULL, NULL, NULL),
(22790, 2, NULL, 'Repair shop', '', 'info@SDK.com', NULL, '$2y$10$6wsTRX69aDFLDLWr3/XpIuM5V7n7QGxJd0GcjQfZlIQnns983tDoW', '121221', NULL, 'Lahore', 24, NULL, 'default.png', 'active', '2024-10-10 15:02:37', '2024-12-19 09:27:00', NULL, NULL, NULL, NULL),
(22791, 2, NULL, 'Repair shop', '', 'info@sdkd.com', NULL, '$2y$10$yax3nf5RH7SFV8O4Plffue3lCEKtVfsH1Mrnp.yJpby4ccfms1rs2', '12121212121212', NULL, 'SADD', 15, NULL, 'default.png', 'active', '2024-10-10 15:13:19', '2024-10-10 15:35:40', NULL, NULL, NULL, NULL),
(22797, 2, NULL, 'imran tyre shop', '', 'info@imran.com', NULL, '$2y$10$2cSnRAbX2P1ki6tP8ABSAOFrXzolvO/iyzBGe8vHaNlKHnP/ut63u', '03036470365', NULL, '4GXX+CPM, Kot Rab Nawaz Multan, Punjab, Pakistan', 15, NULL, 'default.png', 'active', '2024-10-21 16:01:55', '2024-10-21 16:01:55', NULL, '30.1479731157607', '30.1479731157607', NULL),
(22798, 2, NULL, 'rehan work shop', '', 'info@rehan.com', NULL, '$2y$10$fW7Yf0yuh3vi2sIeK5fhUen7gq/x9Cm4/Yc23pxdtJkj1mUrXHI5m', '03036470365', NULL, 'W5CW+VFC, Mahesro Village, Ghotki, Sindh, Pakistan', 15, NULL, 'default.png', 'active', '2024-10-21 16:25:23', '2024-10-21 16:30:34', NULL, '27.92275802929981', '69.19661521911621', NULL),
(22799, 2, NULL, 'Shop Name', '', 'info@Shop.com', NULL, '$2y$10$JzgFefoeqFygcbomk5EX2ucPtKjyXni/S6NGO8C1pmlOVIKENsuf.', '03036470365', NULL, 'Chobakan St, Old Town, Gujranwala, Punjab, Pakistan', 15, NULL, 'default.png', 'active', '2024-10-22 16:26:30', '2024-10-22 16:26:30', NULL, '32.15817972415672', '74.18780038411614', NULL),
(22800, 2, NULL, 'imran mahar', '', 'info@mahar.com', NULL, '$2y$10$ljrNXtdXmqR1Q8kwzrcDyO5Dw1Z8BGnG.4Pr5JGilIzsKsA1fZSRu', '1111122222', NULL, '23', 5, NULL, 'default.png', 'active', '2024-10-23 17:15:48', '2024-10-23 17:15:48', NULL, NULL, NULL, '212'),
(22801, 2, 22789, 'Add Driver Driver Name', '', 'info@maah.com', NULL, '$2y$10$7jvw3tPvBjFxStlTBX7Nf.b.NMrhWPU8pgwZWOJQw435zoxvNkp0y', '03036470365', '2111111', 'Address', 5, NULL, 'default.png', 'active', '2024-10-23 17:46:16', '2024-10-23 17:46:16', NULL, NULL, NULL, '1211211'),
(22802, 2, 22789, 'Driver Name', '', 'info@Driver.com', NULL, '$2y$10$cv.YU7AC/xnAOW2ag4geo.GjCQYGCW9/S6H.6wZ5fRm/BWdTiZoiC', '121', '12121', 'Address Email', 5, NULL, 'default.png', 'active', '2024-10-25 16:58:02', '2024-10-25 16:58:02', NULL, NULL, NULL, '112'),
(22805, 2, NULL, 'Super Admin', 'super_admin', 'admin@example.com', NULL, '$2y$12$s0pBT.e5IQFtWnkZXH1/vukO6bZ1CFXasbwZI.YVCzZWGYotT01Yy', NULL, NULL, NULL, 4, NULL, 'default.png', 'active', '2024-12-12 07:55:11', '2024-12-23 12:06:12', NULL, NULL, NULL, NULL),
(22806, 2, NULL, 'Alyssa Boyd', '', 'lazimydyd@mailinator.com', NULL, '$2y$10$cCHhZ5pZAhqqtQ4gx7X7pO8n9z3mIXP1WAmtAHmomFkmDUYLSw4iG', '142', NULL, 'Suscipit ut ea et au', 15, NULL, 'default.png', 'active', '2024-12-12 08:00:18', '2024-12-12 08:00:18', NULL, NULL, NULL, NULL),
(22807, 2, NULL, 'Ginger Faulkner', '', 'vivuhoq@mailinator.com', NULL, '$2y$10$zOauG10nBa0TvmkuKQHY5eTdSScaylNlc1/nqgGqbsx.5vpHuGZda', '307', NULL, 'In quis quisquam nis', 15, NULL, 'default.png', 'active', '2024-12-12 09:46:31', '2024-12-12 09:46:31', NULL, NULL, NULL, NULL),
(22808, 2, NULL, 'Gay Avery', 'mezuwyj', 'jyweviqyti@mailinator.com', NULL, '$2y$10$8LoMZh3mTi1Y18zcA1gj3.w43KbKMw3HSvEnOe43HvteC/1lTgkNq', NULL, NULL, NULL, 24, 2, 'default.png', 'active', '2024-12-17 08:06:41', '2024-12-17 10:01:02', NULL, NULL, NULL, NULL),
(22809, 2, 22805, 'Hannah Albert', 'bopequ', 'zohuv@mailinator.com', NULL, '$2y$10$b.21asx8WpL365LQkNgzBOauVtnkatptbATGgSWvG8PdhTnS7tnKi', NULL, NULL, NULL, 15, 3, 'default.png', 'active', '2024-12-19 06:50:00', '2024-12-19 13:25:12', NULL, NULL, NULL, NULL),
(22810, 2, 22805, 'Micah Alford', 'jimekifagu', 'vogata@mailinator.com', NULL, '$2y$10$vCHSzZFgen16lYpTb3M3KeN5IhDbmudPpdSynWV7AcRM8QL0Fz0Yu', NULL, NULL, NULL, 30, NULL, 'default.png', 'active', '2024-12-19 07:19:34', '2024-12-19 07:19:34', NULL, NULL, NULL, NULL),
(22811, 2, 22805, 'Deborah Kelly', 'jylawaqeg', 'mizifyga@mailinator.com', NULL, '$2y$10$nPWnywET3oZm0FeA/HL83uwMjCfgCEgkwZhlz5mRNizQ.d6P.8Lze', NULL, NULL, NULL, 31, NULL, 'default.png', 'active', '2024-12-24 06:55:03', '2024-12-24 06:57:34', NULL, NULL, NULL, NULL),
(22812, 2, 22805, 'Ali Khan', 'ali_khan', 'alikhan@example.com', NULL, '$2y$10$0qy62rBAPb92RiBSTZx4ou6OB2eGoTFlj73ZIT9vTFOAK2wyRSixq', NULL, NULL, NULL, 32, NULL, 'default.png', 'active', '2024-12-24 07:24:11', '2024-12-24 07:24:11', NULL, NULL, NULL, NULL),
(22813, 2, 22805, 'Admin', 'admin', 'jradmin@example.com', NULL, '$2y$10$t7UjgoqN607CUyFO854mEOzQMK/CJWRIKd9s2Xh5CYE7DvdmsP1.q', NULL, NULL, NULL, 13, NULL, 'default.png', 'active', '2024-12-24 09:07:41', '2024-12-24 09:07:41', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_login_sessions`
--

CREATE TABLE `user_login_sessions` (
  `id` bigint UNSIGNED NOT NULL,
  `hms_id` bigint UNSIGNED NOT NULL,
  `branch_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `user_role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brand` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `os_version` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `os` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_token` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fcm_token` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('login','logout') COLLATE utf8mb4_unicode_ci DEFAULT 'login',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_time_duration`
--

CREATE TABLE `user_time_duration` (
  `id` bigint UNSIGNED NOT NULL,
  `hms_id` bigint NOT NULL,
  `user_wise_branch_setting_id` bigint UNSIGNED NOT NULL,
  `day` enum('SUN','MON','TUE','WED','THU','FRI','SAT') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'MON',
  `start` time DEFAULT NULL,
  `end` time DEFAULT NULL,
  `status` enum('active','in_active') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_time_duration`
--

INSERT INTO `user_time_duration` (`id`, `hms_id`, `user_wise_branch_setting_id`, `day`, `start`, `end`, `status`, `created_at`, `updated_at`) VALUES
(12, 2, 13, 'MON', '13:00:00', '13:00:00', 'active', '2023-12-12 09:01:57', '2023-12-12 09:01:57'),
(14, 2, 14, 'TUE', '13:00:00', '13:00:00', 'active', '2023-12-12 09:01:57', '2023-12-12 09:01:57'),
(21, 2, 24, 'TUE', '13:00:00', '14:00:00', 'active', '2023-12-28 12:15:07', '2023-12-28 12:15:07'),
(22, 2, 25, 'MON', '13:00:00', '13:00:00', 'active', '2023-12-28 12:15:34', '2023-12-28 12:15:34'),
(23, 2, 26, 'WED', '13:00:00', '13:00:00', 'active', '2023-12-28 12:15:34', '2023-12-28 12:15:34');

-- --------------------------------------------------------

--
-- Table structure for table `user_wise_branch_setting`
--

CREATE TABLE `user_wise_branch_setting` (
  `id` bigint UNSIGNED NOT NULL,
  `hms_id` bigint UNSIGNED NOT NULL,
  `branch_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `start` time DEFAULT NULL,
  `end` time DEFAULT NULL,
  `status` enum('active','in_active') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_wise_branch_setting`
--

INSERT INTO `user_wise_branch_setting` (`id`, `hms_id`, `branch_id`, `user_id`, `start`, `end`, `status`, `created_at`, `updated_at`) VALUES
(13, 2, 3, 16209, '09:05:14', '16:05:14', 'active', '2023-12-12 09:01:57', '2023-12-12 09:01:57'),
(14, 2, 3, 16210, '09:05:14', '16:05:14', 'active', '2023-12-12 09:01:57', '2023-12-12 09:01:57'),
(24, 2, 3, 16211, '09:05:14', '16:05:14', 'active', '2023-12-28 12:15:07', '2023-12-28 12:15:07'),
(25, 2, 3, 16212, '09:05:14', '16:05:14', 'active', '2023-12-28 12:15:34', '2023-12-28 12:15:34'),
(26, 2, 3, 16213, '09:05:14', '16:05:14', 'active', '2023-12-28 12:15:34', '2023-12-28 12:15:34');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` bigint UNSIGNED NOT NULL,
  `companyId` bigint UNSIGNED NOT NULL,
  `vehicle_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vehicle_model` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number_plate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `companyId`, `vehicle_name`, `vehicle_model`, `number_plate`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 22790, 'vehicle Name', '12121 Model', 'AMC-2020  Plate', '2024-10-11 17:08:55', '2024-10-11 18:03:12', NULL),
(2, 22789, 'vehicle', '12121', 'AMC-2021', '2024-10-11 17:08:55', '2024-10-11 18:03:56', '2024-10-11 18:03:56'),
(3, 22789, 'Model', '2023', 'MAC-1212', '2024-10-11 17:14:42', '2024-10-11 18:04:06', '2024-10-11 18:04:06'),
(4, 22789, 'Model', '2023', 'MAC-1212', '2024-10-11 17:14:42', '2024-10-11 17:14:42', NULL),
(5, 22789, 'imran', '02203', 'RND-2020', '2024-10-11 17:16:14', '2024-10-11 17:16:14', NULL),
(6, 22789, 'imran', '02203', 'RND-2020', '2024-10-11 17:16:15', '2024-10-11 17:16:15', NULL),
(11, 22789, 'Ma', '21', '1', '2024-10-11 17:20:37', '2024-10-11 18:05:06', '2024-10-11 18:05:06'),
(12, 22789, '$(this).attr(\"disabled\", \"disabled\");', '$(this).attr(\"disabled\", \"disabled\");', '$(this).attr(\"disabled\", \"disabled\");', '2024-10-11 17:21:05', '2024-10-11 17:21:05', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject` (`subject_type`,`subject_id`),
  ADD KEY `causer` (`causer_type`,`causer_id`),
  ADD KEY `activity_log_log_name_index` (`log_name`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `claims`
--
ALTER TABLE `claims`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `claims_article_number_unique` (`article_number`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hms`
--
ALTER TABLE `hms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hms_has_permission`
--
ALTER TABLE `hms_has_permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `images_claim_id_foreign` (`claim_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shops_shop_number_unique` (`shop_number`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_users_hms_id` (`hms_id`);

--
-- Indexes for table `user_login_sessions`
--
ALTER TABLE `user_login_sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_time_duration`
--
ALTER TABLE `user_time_duration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_wise_branch_setting`
--
ALTER TABLE `user_wise_branch_setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `claims`
--
ALTER TABLE `claims`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hms`
--
ALTER TABLE `hms`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hms_has_permission`
--
ALTER TABLE `hms_has_permission`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=265;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=286;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `shops`
--
ALTER TABLE `shops`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22814;

--
-- AUTO_INCREMENT for table `user_login_sessions`
--
ALTER TABLE `user_login_sessions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_time_duration`
--
ALTER TABLE `user_time_duration`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user_wise_branch_setting`
--
ALTER TABLE `user_wise_branch_setting`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_claim_id_foreign` FOREIGN KEY (`claim_id`) REFERENCES `claims` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
