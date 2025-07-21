/*
 Navicat Premium Dump SQL

 Source Server         : MYSQL_Local
 Source Server Type    : MySQL
 Source Server Version : 80042 (8.0.42)
 Source Host           : localhost:3306
 Source Schema         : user

 Target Server Type    : MySQL
 Target Server Version : 80042 (8.0.42)
 File Encoding         : 65001

 Date: 21/07/2025 14:26:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
  `user_phone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `friend_phone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('no','pending','accepted','blocked') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `last_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_message_date` datetime DEFAULT NULL,
  `unread_count_user` int DEFAULT NULL,
  `unread_count_friend` int DEFAULT NULL,
  PRIMARY KEY (`user_phone`,`friend_phone`) USING BTREE,
  KEY `Friend_friend_phone_idx` (`friend_phone`) USING BTREE,
  CONSTRAINT `Friend_friend_phone_fkey` FOREIGN KEY (`friend_phone`) REFERENCES `user` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Friend_user_phone_fkey` FOREIGN KEY (`user_phone`) REFERENCES `user` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
