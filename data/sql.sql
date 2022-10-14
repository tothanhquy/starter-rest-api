-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: sql6.freemysqlhosting.net
-- Thời gian đã tạo: Th10 14, 2022 lúc 04:14 AM
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
-- Cơ sở dữ liệu: `sql6524898`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `user_name` varchar(20) COLLATE utf16_unicode_ci NOT NULL,
  `pass_word` varchar(300) COLLATE utf16_unicode_ci NOT NULL,
  `level3x3` int(11) DEFAULT NULL,
  `level4x4` int(11) DEFAULT NULL,
  `level5x5` int(11) DEFAULT NULL,
  `level6x6` int(11) DEFAULT NULL,
  `access_token` varchar(300) COLLATE utf16_unicode_ci DEFAULT NULL,
  `play_matrix` varchar(2000) COLLATE utf16_unicode_ci NOT NULL DEFAULT '[]',
  `image_name` varchar(100) COLLATE utf16_unicode_ci DEFAULT NULL,
  `time_start` int(11) NOT NULL DEFAULT '0',
  `time_pause` int(11) NOT NULL DEFAULT '0',
  `time_minus` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `user_name`, `pass_word`, `level3x3`, `level4x4`, `level5x5`, `level6x6`, `access_token`, `play_matrix`, `image_name`, `time_start`, `time_pause`, `time_minus`) VALUES
(6, 'as', '$2a$10$m4Z23IsaZTNfUHCQbG8UpucdoGp.2AQuaOhW3aBENDRKREIvfBVuO', NULL, NULL, NULL, NULL, '5NQpsT2bxY7ehif9sQLd1rO0NchJyU63iA1cJtBvBcZU1wD4LL', '[2,1,7,4,6,3,0,5,8]', 'pexels-lisa-fotios-2362875.jpg', 2147483647, 0, 0);

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
