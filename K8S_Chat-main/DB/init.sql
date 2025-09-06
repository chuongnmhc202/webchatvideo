

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;


DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of _prisma_migrations
-- ----------------------------
BEGIN;
COMMIT;

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

-- ----------------------------
-- Records of friend
-- ----------------------------
BEGIN;
INSERT INTO `friend` (`user_phone`, `friend_phone`, `status`, `created_at`, `last_message`, `last_message_date`, `unread_count_user`, `unread_count_friend`) VALUES ('0333657671', '0333657674', 'accepted', '2025-08-24 07:50:35.146', 'Cuộc gọi video', '2025-08-24 16:32:16', 0, 0);
INSERT INTO `friend` (`user_phone`, `friend_phone`, `status`, `created_at`, `last_message`, `last_message_date`, `unread_count_user`, `unread_count_friend`) VALUES ('0333657673', '0333657671', 'accepted', '2025-08-24 05:22:18.568', 'hi', '2025-08-25 21:24:17', 0, 3);
INSERT INTO `friend` (`user_phone`, `friend_phone`, `status`, `created_at`, `last_message`, `last_message_date`, `unread_count_user`, `unread_count_friend`) VALUES ('0333657673', '0333657672', 'accepted', '2025-08-24 05:22:21.064', 'dsaac', '2025-08-25 23:33:47', 0, 4);
INSERT INTO `friend` (`user_phone`, `friend_phone`, `status`, `created_at`, `last_message`, `last_message_date`, `unread_count_user`, `unread_count_friend`) VALUES ('0333657673', '0333657674', 'accepted', '2025-08-24 05:22:23.156', 'Thực ra đây cũng là vấn đề của rất nhiều người. Bản thân mình khi chưa có kinh nghiệm về mấy cái này thì thường hay lạm dụng jquery để check các case. Tuy nhiên sau khi phát hiện ra 1 số thuộc tính với cách sử dụng vô cùng đơn giản thì mình đã quăng jquery ra sau đầu ngay và luôn. Bây giờ cùng đi vào bài viết nhé.', '2025-08-25 23:40:53', 1, 0);
INSERT INTO `friend` (`user_phone`, `friend_phone`, `status`, `created_at`, `last_message`, `last_message_date`, `unread_count_user`, `unread_count_friend`) VALUES ('0333657674', '0900000002', 'no', '2025-08-25 16:35:21.056', '', '2025-08-25 23:35:21', 0, 0);
INSERT INTO `friend` (`user_phone`, `friend_phone`, `status`, `created_at`, `last_message`, `last_message_date`, `unread_count_user`, `unread_count_friend`) VALUES ('0900000049', '0900000050', 'accepted', '2025-08-24 07:48:44.958', 'Ping from 0900000049 - 0900000050', '2025-08-24 17:48:53', NULL, 69);
COMMIT;

-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner_phone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `last_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_message_date` datetime DEFAULT NULL,
  `avatar` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `Group_owner_phone_fkey` (`owner_phone`) USING BTREE,
  CONSTRAINT `Group_owner_phone_fkey` FOREIGN KEY (`owner_phone`) REFERENCES `user` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of group
-- ----------------------------
BEGIN;
INSERT INTO `group` (`id`, `name`, `owner_phone`, `created_at`, `last_message`, `last_message_date`, `avatar`) VALUES (22, 'Nhóm Nhà Fuji', '0333657673', '2025-08-24 05:24:28.577', 'Cuộc gọi video', '2025-08-26 00:46:37', 'https://firebasestorage.googleapis.com/v0/b/uploadingfile-4ee57.appspot.com/o/images%2F562662a8-c75b-4550-875e-e83031afc574_demo-nghia-la-gi-2.jpg?alt=media&token=aa6bb778-d552-42e4-99a0-5be2c487e20f');
INSERT INTO `group` (`id`, `name`, `owner_phone`, `created_at`, `last_message`, `last_message_date`, `avatar`) VALUES (23, 'Nhóm Trường Aplha 1', '0333657673', '2025-08-24 05:46:06.386', 'hi', '2025-08-25 21:27:17', 'https://cdn.ibispaint.com/movie/927/530/927530830/image927530830l.png');
COMMIT;

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

-- ----------------------------
-- Records of groupmember
-- ----------------------------
BEGIN;
INSERT INTO `groupmember` (`group_id`, `user_phone`, `role`, `joined_at`, `status`, `unread_count`) VALUES (22, '0333657671', 'member', '2025-08-24 05:24:34.516', 1, 8);
INSERT INTO `groupmember` (`group_id`, `user_phone`, `role`, `joined_at`, `status`, `unread_count`) VALUES (22, '0333657672', 'member', '2025-08-25 15:17:40.139', 1, NULL);
INSERT INTO `groupmember` (`group_id`, `user_phone`, `role`, `joined_at`, `status`, `unread_count`) VALUES (22, '0333657673', 'owner', '2025-08-24 05:24:28.588', 1, 4);
INSERT INTO `groupmember` (`group_id`, `user_phone`, `role`, `joined_at`, `status`, `unread_count`) VALUES (22, '0333657674', 'member', '2025-08-24 05:24:34.521', 1, 0);
INSERT INTO `groupmember` (`group_id`, `user_phone`, `role`, `joined_at`, `status`, `unread_count`) VALUES (23, '0333657673', 'owner', '2025-08-24 05:46:06.394', 1, 0);
INSERT INTO `groupmember` (`group_id`, `user_phone`, `role`, `joined_at`, `status`, `unread_count`) VALUES (23, '0333657674', 'member', '2025-08-24 05:46:18.537', 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for report
-- ----------------------------
DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reported_phone` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reporter_phone` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `fk_report_reported_user` (`reported_phone`),
  KEY `fk_report_reporter_user` (`reporter_phone`),
  CONSTRAINT `fk_report_reported_user` FOREIGN KEY (`reported_phone`) REFERENCES `user` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_report_reporter_user` FOREIGN KEY (`reporter_phone`) REFERENCES `user` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of report
-- ----------------------------
BEGIN;
INSERT INTO `report` (`id`, `reported_phone`, `reporter_phone`, `reason`, `status`, `createdAt`) VALUES ('1fe303f4-9822-4221-8406-3d5779082d78', '0333657671', '0111111111', 'xúc phạm người khác', 'REVIEWED', '2025-08-25 21:18:27.047');
COMMIT;

-- ----------------------------
-- Table structure for token
-- ----------------------------
DROP TABLE IF EXISTS `token`;
CREATE TABLE `token` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userPhone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `refreshToken` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessToken` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `Token_userPhone_fkey` (`userPhone`) USING BTREE,
  CONSTRAINT `Token_userPhone_fkey` FOREIGN KEY (`userPhone`) REFERENCES `user` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of token
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `phone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'NOTBLOCK',
  `avatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  PRIMARY KEY (`phone`) USING BTREE,
  UNIQUE KEY `User_email_key` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0111111111', 'Admin@gmail.com', 'Thanh2003@', 'NOTBLOCK', 'https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740', '2025-08-24 11:52:24.107', 'ADMIN', 'ADMIN');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0333657671', 'thanh@gmail.com', 'Thanh2003@', 'NOTBLOCK', 'https://genk.mediacdn.vn/139269124445442048/2024/9/12/screenshot-2024-09-10-134328-1726100949991-17261009501151829185931.png', '2025-08-24 11:54:52.577', 'Nguyễn Tấn Thành', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0333657672', 'hoang@gmail.com', 'Thanh2003@', 'NOTBLOCK', 'https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740', '2025-08-24 11:56:08.946', 'Hoàng Chương', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0333657673', 'linh@gmail.com', 'Thanh2003@', 'NOTBLOCK', 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png', '2025-08-24 11:56:51.068', 'Vương Thanh Linh', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0333657674', 'huyen@gmail.com', 'Thanh2003@', 'NOTBLOCK', 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png', '2025-08-24 11:56:51.068', 'Vương Thanh Huyền', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000001', 'alice.nguyen@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=1', '2025-08-24 04:45:35.000', 'Alice Nguyen', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000002', 'bob.tran@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=2', '2025-08-24 04:45:35.000', 'Bob Tran', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000003', 'charlie.pham@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=3', '2025-08-24 04:45:35.000', 'Charlie Pham', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000004', 'david.le@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=4', '2025-08-24 04:45:35.000', 'David Le', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000005', 'eva.hoang@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=5', '2025-08-24 04:45:35.000', 'Eva Hoang', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000006', 'frank.vo@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=6', '2025-08-24 04:45:35.000', 'Frank Vo', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000007', 'grace.mai@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=7', '2025-08-24 04:45:35.000', 'Grace Mai', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000008', 'henry.dang@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=8', '2025-08-24 04:45:35.000', 'Henry Dang', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000009', 'ivy.phan@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=9', '2025-08-24 04:45:35.000', 'Ivy Phan', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000010', 'jack.bui@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=10', '2025-08-24 04:45:35.000', 'Jack Bui', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000011', 'kate.ly@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=11', '2025-08-24 04:45:35.000', 'Kate Ly', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000012', 'leo.ngo@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=12', '2025-08-24 04:45:35.000', 'Leo Ngo', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000013', 'mia.truong@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=13', '2025-08-24 04:45:35.000', 'Mia Truong', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000014', 'nathan.dinh@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=14', '2025-08-24 04:45:35.000', 'Nathan Dinh', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000015', 'olivia.vo@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=15', '2025-08-24 04:45:35.000', 'Olivia Vo', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000016', 'peter.ngo@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=16', '2025-08-24 04:45:35.000', 'Peter Ngo', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000017', 'quinn.dang@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=17', '2025-08-24 04:45:35.000', 'Quinn Dang', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000018', 'ryan.lam@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=18', '2025-08-24 04:45:35.000', 'Ryan Lam', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000019', 'sophia.pham@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=19', '2025-08-24 04:45:35.000', 'Sophia Pham', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000020', 'tom.ho@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=20', '2025-08-24 04:45:35.000', 'Tom Ho', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000021', 'uma.tran@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=21', '2025-08-24 04:45:35.000', 'Uma Tran', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000022', 'vinh.nguyen@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=22', '2025-08-24 04:45:35.000', 'Vinh Nguyen', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000023', 'william.dang@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=23', '2025-08-24 04:45:35.000', 'William Dang', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000024', 'xavier.vo@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=24', '2025-08-24 04:45:35.000', 'Xavier Vo', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000025', 'yara.pham@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=25', '2025-08-24 04:45:35.000', 'Yara Pham', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000026', 'zane.tran@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=26', '2025-08-24 04:45:35.000', 'Zane Tran', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000027', 'andrew.le@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=27', '2025-08-24 04:45:35.000', 'Andrew Le', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000028', 'bella.vo@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=28', '2025-08-24 04:45:35.000', 'Bella Vo', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000029', 'carlos.nguyen@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=29', '2025-08-24 04:45:35.000', 'Carlos Nguyen', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000030', 'diana.pham@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=30', '2025-08-24 04:45:35.000', 'Diana Pham', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000031', 'ethan.hoang@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=31', '2025-08-24 04:45:35.000', 'Ethan Hoang', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000032', 'fiona.tran@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=32', '2025-08-24 04:45:35.000', 'Fiona Tran', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000033', 'george.bui@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=33', '2025-08-24 04:45:35.000', 'George Bui', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000034', 'hannah.ly@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=34', '2025-08-24 04:45:35.000', 'Hannah Ly', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000035', 'ian.vo@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=35', '2025-08-24 04:45:35.000', 'Ian Vo', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000036', 'jasmine.pham@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=36', '2025-08-24 04:45:35.000', 'Jasmine Pham', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000037', 'kevin.dang@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=37', '2025-08-24 04:45:35.000', 'Kevin Dang', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000038', 'linda.ho@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=38', '2025-08-24 04:45:35.000', 'Linda Ho', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000039', 'michael.tran@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=39', '2025-08-24 04:45:35.000', 'Michael Tran', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000040', 'nina.vo@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=40', '2025-08-24 04:45:35.000', 'Nina Vo', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000041', 'oscar.nguyen@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=41', '2025-08-24 04:45:35.000', 'Oscar Nguyen', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000042', 'paula.bui@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=42', '2025-08-24 04:45:35.000', 'Paula Bui', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000043', 'quincy.ly@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=43', '2025-08-24 04:45:35.000', 'Quincy Ly', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000044', 'rachel.pham@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=44', '2025-08-24 04:45:35.000', 'Rachel Pham', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000045', 'samuel.vo@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=45', '2025-08-24 04:45:35.000', 'Samuel Vo', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000046', 'tina.tran@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=46', '2025-08-24 04:45:35.000', 'Tina Tran', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000047', 'ursula.le@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=47', '2025-08-24 04:45:35.000', 'Ursula Le', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000048', 'victor.dang@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=48', '2025-08-24 04:45:35.000', 'Victor Dang', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000049', 'wendy.nguyen@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=49', '2025-08-24 04:45:35.000', 'Wendy Nguyen', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0900000050', 'xuan.hoang@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=50', '2025-08-24 04:45:35.000', 'Xuan Hoang', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234561', 'nguyenvanan@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=1', '2025-08-24 04:48:16.513', 'Nguyễn Văn An', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234562', 'tranthihoa@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=2', '2025-08-24 04:48:16.513', 'Trần Thị Hoa', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234563', 'levanminh@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=3', '2025-08-24 04:48:16.513', 'Lê Văn Minh', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234564', 'phamthuhang@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=4', '2025-08-24 04:48:16.513', 'Phạm Thu Hằng', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234565', 'hoangvannam@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=5', '2025-08-24 04:48:16.513', 'Hoàng Văn Nam', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234566', 'vuthilan@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=6', '2025-08-24 04:48:16.513', 'Vũ Thị Lan', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234567', 'domanhcuong@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=7', '2025-08-24 04:48:16.513', 'Đỗ Mạnh Cường', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234568', 'nguyenthimai@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=8', '2025-08-24 04:48:16.513', 'Nguyễn Thị Mai', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234569', 'buianhtuan@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=9', '2025-08-24 04:48:16.513', 'Bùi Anh Tuấn', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234570', 'phanthihong@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=10', '2025-08-24 04:48:16.513', 'Phan Thị Hồng', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234601', 'nguyenvana51@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=51', '2025-08-24 04:51:19.627', 'Nguyễn Văn A', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234602', 'tranthibich52@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=52', '2025-08-24 04:51:19.627', 'Trần Thị Bích', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234603', 'levantruong53@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=53', '2025-08-24 04:51:19.627', 'Lê Văn Trường', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234604', 'phamthithu54@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=54', '2025-08-24 04:51:19.627', 'Phạm Thị Thu', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234605', 'hoangvankhai55@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=55', '2025-08-24 04:51:19.627', 'Hoàng Văn Khải', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234606', 'vuthilan56@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=56', '2025-08-24 04:51:19.627', 'Vũ Thị Lan', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234607', 'domanhcuong57@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=57', '2025-08-24 04:51:19.627', 'Đỗ Mạnh Cường', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234608', 'nguyenthimai58@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=58', '2025-08-24 04:51:19.627', 'Nguyễn Thị Mai', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234609', 'buianhtuan59@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=59', '2025-08-24 04:51:19.627', 'Bùi Anh Tuấn', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234610', 'phanthihong60@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=60', '2025-08-24 04:51:19.627', 'Phan Thị Hồng', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234611', 'nguyenthivan61@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=61', '2025-08-24 04:51:19.627', 'Nguyễn Thị Vân', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234612', 'tranvanhung62@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=62', '2025-08-24 04:51:19.627', 'Trần Văn Hùng', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234613', 'phamthuy63@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=63', '2025-08-24 04:51:19.627', 'Phạm Thúy', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234614', 'levankiet64@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=64', '2025-08-24 04:51:19.627', 'Lê Văn Kiệt', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234615', 'hoangthimai65@example.com', 'lkhiOncN', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=65', '2025-08-24 04:51:19.627', 'Hoàng Thị Mai', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234616', 'vuthianh66@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=66', '2025-08-24 04:51:19.627', 'Vũ Thị Ánh', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234617', 'dovanthang67@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=67', '2025-08-24 04:51:19.627', 'Đỗ Văn Thắng', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234618', 'nguyenthihanh68@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=68', '2025-08-24 04:51:19.627', 'Nguyễn Thị Hạnh', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234619', 'buiviet69@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=69', '2025-08-24 04:51:19.627', 'Bùi Viết', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234620', 'phanthimai70@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=70', '2025-08-24 04:51:19.627', 'Phan Thị Mai', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234621', 'nguyenhongson71@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=71', '2025-08-24 04:51:19.627', 'Nguyễn Hồng Sơn', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234622', 'tranthilan72@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=72', '2025-08-24 04:51:19.627', 'Trần Thị Lan', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234623', 'phamvankien73@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=73', '2025-08-24 04:51:19.627', 'Phạm Văn Kiên', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234624', 'lethithuy74@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=74', '2025-08-24 04:51:19.627', 'Lê Thị Thúy', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234625', 'hoangminhquan75@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=75', '2025-08-24 04:51:19.627', 'Hoàng Minh Quân', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234626', 'vuthihien76@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=76', '2025-08-24 04:51:19.627', 'Vũ Thị Hiền', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234627', 'doquanghuy77@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=77', '2025-08-24 04:51:19.627', 'Đỗ Quang Huy', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234628', 'nguyenthihuong78@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=78', '2025-08-24 04:51:19.627', 'Nguyễn Thị Hương', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234629', 'buiducanh79@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=79', '2025-08-24 04:51:19.627', 'Bùi Đức Anh', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234630', 'phanthihong80@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=80', '2025-08-24 04:51:19.627', 'Phan Thị Hồng', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234631', 'nguyenminhquan81@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=81', '2025-08-24 04:51:19.627', 'Nguyễn Minh Quân', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234632', 'tranthimai82@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=82', '2025-08-24 04:51:19.627', 'Trần Thị Mai', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234633', 'phamthihang83@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=83', '2025-08-24 04:51:19.627', 'Phạm Thị Hằng', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234634', 'levantruong84@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=84', '2025-08-24 04:51:19.627', 'Lê Văn Trường', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234635', 'hoangthilan85@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=85', '2025-08-24 04:51:19.627', 'Hoàng Thị Lan', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234636', 'vuthianh86@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=86', '2025-08-24 04:51:19.627', 'Vũ Thị Ánh', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234637', 'dovantruong87@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=87', '2025-08-24 04:51:19.627', 'Đỗ Văn Trường', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234638', 'nguyenthithao88@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=88', '2025-08-24 04:51:19.627', 'Nguyễn Thị Thảo', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234639', 'buiminhquan89@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=89', '2025-08-24 04:51:19.627', 'Bùi Minh Quân', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234640', 'phanthihanh90@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=90', '2025-08-24 04:51:19.627', 'Phan Thị Hạnh', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234641', 'nguyenquangvinh91@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=91', '2025-08-24 04:51:19.627', 'Nguyễn Quang Vinh', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234642', 'tranthihuong92@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=92', '2025-08-24 04:51:19.627', 'Trần Thị Hương', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234643', 'phamvanson93@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=93', '2025-08-24 04:51:19.627', 'Phạm Văn Sơn', 'USER');
INSERT INTO `user` (`phone`, `email`, `password_hash`, `status`, `avatar`, `createdAt`, `name`, `role`) VALUES ('0981234644', 'lethimai94@example.com', 'Thanh2003@', 'NOTBLOCK', 'https://i.pravatar.cc/150?img=94', '2025-08-24 04:51:19.627', 'Lê Thị Mai', 'USER');
COMMIT;

-- ----------------------------
-- Table structure for usersession
-- ----------------------------
DROP TABLE IF EXISTS `usersession`;
CREATE TABLE `usersession` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_phone` varchar(100) NOT NULL,
  `loginAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `logoutAt` datetime(3) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(3),
  `ipAddress` varchar(45) DEFAULT NULL,
  `userAgent` text,
  `status` varchar(20) NOT NULL DEFAULT 'ONLINE',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of usersession
-- ----------------------------
BEGIN;
INSERT INTO `usersession` (`id`, `user_phone`, `loginAt`, `logoutAt`, `ipAddress`, `userAgent`, `status`) VALUES (3, '0111111111', '2025-08-25 14:03:16.886', '2025-08-26 02:03:16.882', '2001:4860:7:812::e9', 'Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version', 'ONLINE');
INSERT INTO `usersession` (`id`, `user_phone`, `loginAt`, `logoutAt`, `ipAddress`, `userAgent`, `status`) VALUES (4, '0111111111', '2025-08-25 14:03:21.085', '2025-08-26 02:03:21.080', '2001:4860:7:812::e9', 'Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version', 'ONLINE');
INSERT INTO `usersession` (`id`, `user_phone`, `loginAt`, `logoutAt`, `ipAddress`, `userAgent`, `status`) VALUES (5, '0333657673', '2025-08-25 14:20:52.484', '2025-08-26 02:20:52.483', '2001:4860:7:812::e9', 'Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version', 'ONLINE');
INSERT INTO `usersession` (`id`, `user_phone`, `loginAt`, `logoutAt`, `ipAddress`, `userAgent`, `status`) VALUES (6, '0333657674', '2025-08-25 15:59:25.677', '2025-08-26 03:59:25.674', '2001:4860:7:812::e9', 'Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version', 'ONLINE');
INSERT INTO `usersession` (`id`, `user_phone`, `loginAt`, `logoutAt`, `ipAddress`, `userAgent`, `status`) VALUES (7, '0333657672', '2025-08-25 16:22:15.590', '2025-08-26 04:22:15.589', '2001:4860:7:812::e9', 'Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version', 'ONLINE');
INSERT INTO `usersession` (`id`, `user_phone`, `loginAt`, `logoutAt`, `ipAddress`, `userAgent`, `status`) VALUES (8, '0333657673', '2025-08-25 16:28:57.323', '2025-08-26 04:28:57.322', '2001:4860:7:812::e9', 'Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version', 'ONLINE');
INSERT INTO `usersession` (`id`, `user_phone`, `loginAt`, `logoutAt`, `ipAddress`, `userAgent`, `status`) VALUES (9, '0333657672', '2025-08-25 16:29:24.349', '2025-08-26 04:29:24.345', '2001:4860:7:812::e9', 'Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version', 'ONLINE');
INSERT INTO `usersession` (`id`, `user_phone`, `loginAt`, `logoutAt`, `ipAddress`, `userAgent`, `status`) VALUES (10, '0333657673', '2025-08-25 16:29:41.200', '2025-08-26 04:29:41.200', '2001:4860:7:812::e9', 'Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version', 'ONLINE');
INSERT INTO `usersession` (`id`, `user_phone`, `loginAt`, `logoutAt`, `ipAddress`, `userAgent`, `status`) VALUES (11, '0333657674', '2025-08-25 16:40:47.506', '2025-08-26 04:40:47.505', '2001:4860:7:812::e9', 'Mozilla/5.0 (platform; rv:gecko-version) Gecko/gecko-trail Firefox/firefox-version', 'ONLINE');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
