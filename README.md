# Portfolio Blog API

这是一个基于Node.js、Express和MongoDB的个人作品集和博客API。它提供了用户认证、项目管理、博客文章管理、评论系统和联系表单功能。

## 功能特点

- 用户认证（注册、登录）使用JWT
- 项目CRUD操作
- 博客文章CRUD操作
- 评论系统
- 联系消息管理
- 基于角色的访问控制（用户/管理员）
- 集中式错误处理

## 技术栈

- Node.js
- Express
- MongoDB (Mongoose)
- JWT认证
- bcrypt密码加密
- 模块化架构

## 快速开始

### 安装依赖

```bash
npm install
```

### 环境变量配置

创建`.env`文件并添加以下内容：
```
PORT=5001
MONGO_URI=mongodb+srv://blog_user:123456aa@blogplatformcluster.lmxeq7c.mongodb.net/?appName=BlogPlatformCluster
JWT_SECRET=your_jwt_secret_key_123456
NODE_ENV=development
```

### 运行项目

```bash
npm run dev
```

服务器将在端口5001上启动。

## API端点测试指南

### 1. 健康检查

**检查API是否正常运行**
- **方法**: GET
- **端点**: `/api/health`
- **描述**: 验证API服务器是否正常运行
- **无需认证**

**示例响应**:
```json
{
  "status": "ok",
  "message": "API is running"
}
```

### 2. 认证相关端点

#### 注册新用户
- **方法**: POST
- **端点**: `/api/auth/register`
- **描述**: 注册新用户账号
- **无需认证**

**请求体示例**:
```json
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "password": "password123",
  "isAdmin": false
}
```

#### 用户登录
- **方法**: POST
- **端点**: `/api/auth/login`
- **描述**: 用户登录并获取JWT令牌
- **无需认证**

**请求体示例**:
```json
{
  "email": "zhangsan@example.com",
  "password": "password123"
}
```

**响应示例**:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "张三",
    "email": "zhangsan@example.com",
    "isAdmin": false
  }
}
```

#### 获取当前用户信息
- **方法**: GET
- **端点**: `/api/auth/me`
- **描述**: 获取当前已登录用户的信息
- **需要认证**: Bearer Token

**示例响应**:
```json
{
  "id": "user_id",
  "name": "张三",
  "email": "zhangsan@example.com",
  "isAdmin": false
}
```

### 3. 项目管理端点

#### 获取所有项目
- **方法**: GET
- **端点**: `/api/projects`
- **描述**: 获取所有项目列表
- **无需认证**

#### 创建新项目（需要管理员权限）
- **方法**: POST
- **端点**: `/api/projects`
- **描述**: 创建一个新的项目
- **需要认证**: Bearer Token + 管理员权限

**请求体示例**:
```json
{
  "title": "项目标题",
  "description": "项目描述",
  "link": "项目链接",
  "image": "项目图片URL"
}
```

#### 获取单个项目
- **方法**: GET
- **端点**: `/api/projects/:id`
- **描述**: 根据ID获取单个项目详情
- **无需认证**

#### 更新项目（需要管理员权限）
- **方法**: PUT
- **端点**: `/api/projects/:id`
- **描述**: 更新指定ID的项目信息
- **需要认证**: Bearer Token + 管理员权限

**请求体示例**:
```json
{
  "title": "更新后的项目标题",
  "description": "更新后的项目描述"
}
```

#### 删除项目（需要管理员权限）
- **方法**: DELETE
- **端点**: `/api/projects/:id`
- **描述**: 删除指定ID的项目
- **需要认证**: Bearer Token + 管理员权限

### 4. 博客文章端点

#### 获取所有博客文章
- **方法**: GET
- **端点**: `/api/blogs`
- **描述**: 获取所有博客文章列表
- **无需认证**

#### 创建新博客文章（需要认证）
- **方法**: POST
- **端点**: `/api/blogs`
- **描述**: 创建一篇新的博客文章
- **需要认证**: Bearer Token

**请求体示例**:
```json
{
  "title": "博客标题",
  "content": "博客内容",
  "image": "博客封面图URL"
}
```

#### 获取单个博客文章
- **方法**: GET
- **端点**: `/api/blogs/:id`
- **描述**: 根据ID获取单个博客文章详情
- **无需认证**

#### 更新博客文章（需要认证）
- **方法**: PUT
- **端点**: `/api/blogs/:id`
- **描述**: 更新指定ID的博客文章
- **需要认证**: Bearer Token

**请求体示例**:
```json
{
  "title": "更新后的博客标题",
  "content": "更新后的博客内容"
}
```

#### 删除博客文章（需要认证）
- **方法**: DELETE
- **端点**: `/api/blogs/:id`
- **描述**: 删除指定ID的博客文章
- **需要认证**: Bearer Token

### 5. 评论系统端点

#### 获取博客文章的所有评论
- **方法**: GET
- **端点**: `/api/blogs/:blogId/comments`
- **描述**: 获取指定博客文章的所有评论
- **无需认证**

#### 添加评论到博客文章（需要认证）
- **方法**: POST
- **端点**: `/api/blogs/:blogId/comments`
- **描述**: 为指定的博客文章添加评论
- **需要认证**: Bearer Token

**请求体示例**:
```json
{
  "content": "这是一条评论内容"
}
```

#### 删除评论（需要认证）
- **方法**: DELETE
- **端点**: `/api/comments/:id`
- **描述**: 删除指定ID的评论
- **需要认证**: Bearer Token

### 6. 消息管理端点

#### 发送消息
- **方法**: POST
- **端点**: `/api/messages`
- **描述**: 发送联系消息
- **无需认证**

**请求体示例**:
```json
{
  "name": "联系人姓名",
  "email": "contact@example.com",
  "message": "这是一条联系消息"
}
```

#### 获取所有消息（需要管理员权限）
- **方法**: GET
- **端点**: `/api/messages`
- **描述**: 获取所有联系消息
- **需要认证**: Bearer Token + 管理员权限

#### 获取单个消息（需要管理员权限）
- **方法**: GET
- **端点**: `/api/messages/:id`
- **描述**: 根据ID获取单个联系消息
- **需要认证**: Bearer Token + 管理员权限

#### 删除消息（需要管理员权限）
- **方法**: DELETE
- **端点**: `/api/messages/:id`
- **描述**: 删除指定ID的联系消息
- **需要认证**: Bearer Token + 管理员权限

## 认证说明

对于需要认证的端点，请在请求头中添加以下内容：

```
Authorization: Bearer your_jwt_token_here
```

JWT令牌可通过登录端点获取。

## 测试工具推荐

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.io/)（VS Code扩展）

## 错误处理

API会返回标准的HTTP状态码和错误信息。常见错误包括：

- 400: 请求参数错误
- 401: 未授权（缺少或无效的认证令牌）
- 403: 禁止访问（权限不足）
- 404: 资源不存在
- 500: 服务器内部错误

### 环境变量配置

创建`.env`文件并添加以下内容：