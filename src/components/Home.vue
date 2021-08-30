<template>
  <el-container class="home-container">
    <!-- 页头 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->

      <!-- 动态绑定宽度 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->

        <!-- :unique-opened="true"->只允许展开一个菜单 -->
        <!-- :collapse-transition="false" -> 关闭动画 -->
        <!-- router -> 导航开启路由模式 (启用该模式会在激活导航时以 index 作为 path 进行路由跳转)-->
        <!-- collapse 是否水平折叠收起菜单 -->
        <!-- background-color、text-color和active-text-color，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色 -->
        <!-- default-active当前激活菜单的 index -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <!-- 以 index 作为 path 进行路由跳转 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template #title>
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        125: 'el-icon-user',
        103: 'el-icon-s-management',
        101: 'el-icon-s-shop',
        102: 'el-icon-s-order',
        145: 'el-icon-s-marketing'
      },
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created () {
    // 生命周期里获取所有的菜单
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态（用于高亮）
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
img {
  width: 40px;
  height: 40px;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  // 选中侧边栏会突出一点，把他取消
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

// 图标和文字给点间距
.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  // 行高
  line-height: 24px;
  color: #fff;
  text-align: center;
  // 线之间给点距离
  letter-spacing: 0.2em;
  // 小手
  cursor: pointer;
}
</style>
