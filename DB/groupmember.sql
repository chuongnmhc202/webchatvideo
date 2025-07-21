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

 Date: 21/07/2025 15:07:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for groupmember
-- ----------------------------
DROP TABLE IF EXISTS `groupmember`;
CREATE TABLE `groupmember` (
  `group_id` bigint NOT NULL,
  `user_phone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('member','admin','owner') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'member',
  `joined_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `unread_count` int DEFAULT NULL,
  PRIMARY KEY (`group_id`,`user_phone`) USING BTREE,
  KEY `GroupMember_user_phone_idx` (`user_phone`) USING BTREE,
  CONSTRAINT `GroupMember_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `GroupMember_user_phone_fkey` FOREIGN KEY (`user_phone`) REFERENCES `user` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
