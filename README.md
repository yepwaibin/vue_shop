# vue_shop


## 前端技术栈

- 开发工具：vscode
- 构建语言：Javascript
- 前端框架：Vue 2.x
- 路由工具：Vue-Router 3.x
- HTTP工具：Axios
- UI框架：Element-UI
- CSS预编译：Less
- 代码规范：ESLint

## 项目功能

- 用户登录
- 退出登录
- 用户管理
- 权限管理
  - 角色列表
  - 权限列表
- 商品管理
  - 商品分类
  - 商品列表（待做）
  - 分类参数
- 订单管理（待做）
- 数据统计（待做）

## 项目搭建

### 使用VueCli 4.x脚手架

```shell
vue create vue_shop
```

选择

- Vue 2.x
- Router
- CSS Pre-processors
- ESLint + Standard config

### 安装插件和依赖

```shell
npm install element-ui -S
npm install axios -S
```

Element-ui使用按需引用，src目录下新增文件

- Plugin
  - element.js

```javascript
// main.js
import './Plugin/element,js'
```

配置Axios

```javascript
// main.js
import axios from 'axios'
axios.defaults.baseURL = 'http://47.106.142.199:8889/api/private/v1/'
// axios请求拦截器
axios.interceptors.request.use(config => {
  // 为请求对象，添加Token验证的AUthorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 全局绑定axios
Vue.prototype.$http = axios
```

## 功能编写

### 登录退出功能

业务功能

- 输入用户名和密码，点击登录
- 后台接口进行验证
- 若通过验证，则跳转到主页

使用token保存登录状态

使用UI组件搭建页面

- el-form
- el-form-item
- el-input
- el-button

路由导航守卫控制访问页面权限

- 登录成功后，服务器发出的token保存再seesionStorage中
- 每次页面跳转需要通过导航守卫验证token

### 主页

使用UI组件的布局

- 头部区域
- 侧边栏区域
  - NavMenu导航菜单
- 右侧主题区域

退出登录按钮

- 清空seesionStorage中的token
- 路由跳转到login页

请求数据

- 通过Axios拦截器添加token认证，确保有权限获取数据

渲染数据

- 双重for循环把数据渲染到侧边栏

### 用户列表

- 面包屑导航
- 卡片视图区
  - 搜索和添加区域
  - 表格
    - 数据
    - 修改按钮、删除按钮、分配角色按钮
  - 分页区域
- 添加用户对话框
- 修改用户对话框
- 分配角色对话框

### 角色列表

### 权限列表

### 商品管理

## 优化

### 添加进度条效果

配置`nprogress`，在axios请求拦截器添加，在响应拦截器取消

### 路由懒加载