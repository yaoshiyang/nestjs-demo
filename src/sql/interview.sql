/*
 Navicat Premium Dump SQL

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80040 (8.0.40)
 Source Host           : localhost:3306
 Source Schema         : interview

 Target Server Type    : MySQL
 Target Server Version : 80040 (8.0.40)
 File Encoding         : 65001

 Date: 15/12/2024 12:56:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for exam
-- ----------------------------
DROP TABLE IF EXISTS `exam`;
CREATE TABLE `exam`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '考试id',
  `user_id` int NOT NULL COMMENT '关联用户id',
  `startDate` datetime NOT NULL COMMENT '考试开始时间',
  `endDate` datetime NULL DEFAULT NULL COMMENT '考试结束时间',
  `status` tinyint NOT NULL COMMENT '考试状态（0 - 进行中，1 - 完成）',
  `category` tinyint NOT NULL COMMENT '考试类别（0-教师结构化面试）',
  `grade` tinyint NOT NULL COMMENT '考试年级（0 - 小学 1- 初中 2 - 高中）',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '考试模拟地点',
  PRIMARY KEY (`id` DESC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for exam-record
-- ----------------------------
DROP TABLE IF EXISTS `exam-record`;
CREATE TABLE `exam-record`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `exam_id` int NOT NULL COMMENT '关联考试Id',
  `question_id` int NOT NULL COMMENT '管理题目id',
  `user_answer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '用户面试回答',
  `user_audio_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '语音文件静态存储地址',
  `startDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `endDate` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '结束时间',
  `ai` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'ai润色答案',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for exam-result
-- ----------------------------
DROP TABLE IF EXISTS `exam-result`;
CREATE TABLE `exam-result`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '考试结果id',
  `exam_id` int NOT NULL COMMENT '关联考试id',
  `score` tinyint(3) UNSIGNED ZEROFILL NOT NULL COMMENT '考试结果分数',
  `ability` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '能力评分（JSON）',
  `advantages` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '优点',
  `disadvantages` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '缺点',
  `knowledge` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '知识点（JSON）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for knowledge
-- ----------------------------
DROP TABLE IF EXISTS `knowledge`;
CREATE TABLE `knowledge`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '知识点id',
  `question_id` int NOT NULL COMMENT '题目id',
  `knowledge_id` int NOT NULL COMMENT '知识类别Id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for knowlege-category
-- ----------------------------
DROP TABLE IF EXISTS `knowlege-category`;
CREATE TABLE `knowlege-category`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '知识条目id',
  `category` tinyint NOT NULL COMMENT '类别（暂时未定）',
  `title` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类别标题',
  `describe` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '知识点描述',
  `startDate` datetime NOT NULL COMMENT '创建时间',
  `updateDate` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '题目id',
  `category` tinyint(1) UNSIGNED ZEROFILL NOT NULL DEFAULT 0 COMMENT '题目大类(0 - 教师考试，1 - 公务员考试)',
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '题目',
  `answer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '参考答案',
  `startDate` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '题目创建时间',
  `answer_frame` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '答题思路',
  `extend` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '扩展属性（JSON）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
