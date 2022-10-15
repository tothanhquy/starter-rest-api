-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: sql6.freemysqlhosting.net
-- Thời gian đã tạo: Th10 15, 2022 lúc 06:34 AM
-- Phiên bản máy phục vụ: 5.5.62-0ubuntu0.14.04.1
-- Phiên bản PHP: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `sql6526407`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `user_name` varchar(20) COLLATE utf16_unicode_ci NOT NULL,
  `pass_word` varchar(300) COLLATE utf16_unicode_ci NOT NULL,
  `level3x3` bigint(11) DEFAULT NULL,
  `level4x4` bigint(11) DEFAULT NULL,
  `level5x5` bigint(11) DEFAULT NULL,
  `level6x6` bigint(11) DEFAULT NULL,
  `access_token` varchar(300) COLLATE utf16_unicode_ci DEFAULT NULL,
  `play_matrix` varchar(2000) COLLATE utf16_unicode_ci NOT NULL DEFAULT '[]',
  `image_name` varchar(100) COLLATE utf16_unicode_ci DEFAULT NULL,
  `time_start` bigint(11) NOT NULL DEFAULT '0',
  `time_pause` bigint(11) NOT NULL DEFAULT '0',
  `time_minus` bigint(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `user_name`, `pass_word`, `level3x3`, `level4x4`, `level5x5`, `level6x6`, `access_token`, `play_matrix`, `image_name`, `time_start`, `time_pause`, `time_minus`) VALUES
(6, 'as', '$2a$10$m4Z23IsaZTNfUHCQbG8UpucdoGp.2AQuaOhW3aBENDRKREIvfBVuO', 247, NULL, NULL, NULL, 'cjhBd64P1R6RFC9r389VwfHlGaKFCK6deOJLTJpFzGYmbzOQoC', '[0,1,2,3,4,5,6,7,8,13,11,14,12,9,10,15]', 'pexels-lisa-fotios-2362875.jpg', 2147483647, 0, 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
