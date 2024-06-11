/*
 Navicat Premium Data Transfer

 Source Server         : opc
 Source Server Type    : MySQL
 Source Server Version : 80400
 Source Host           : 217.142.228.188:3306
 Source Schema         : bilibili_danmu

 Target Server Type    : MySQL
 Target Server Version : 80400
 File Encoding         : 65001

 Date: 07/06/2024 15:52:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for danmu_infos
-- ----------------------------
DROP TABLE IF EXISTS `danmu_infos`;
CREATE TABLE `danmu_infos`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `roomid` bigint NULL DEFAULT NULL,
  `uid` bigint NULL DEFAULT NULL,
  `uname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `created_at` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for gift_infos
-- ----------------------------
DROP TABLE IF EXISTS `gift_infos`;
CREATE TABLE `gift_infos`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `roomid` bigint NULL DEFAULT NULL,
  `base_date` date NULL DEFAULT NULL,
  `uid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `uname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `gift_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `gift_price` decimal(10, 2) NULL DEFAULT NULL,
  `coin_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `amount` int NULL DEFAULT NULL,
  `combo` int NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
