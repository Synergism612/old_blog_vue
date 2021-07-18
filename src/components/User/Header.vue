<template>
  <div>
    <div v-if="header_show">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo menu"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        :collapse="false"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/user/index" class="logo">
          <b>Synergism</b>
        </el-menu-item>
        <el-menu-item index="/user/index"> <i class="el-icon-s-home"></i>网站首页 </el-menu-item>
        <el-menu-item index="/user/category">
          <i class="el-icon-s-management"></i>文章专栏
        </el-menu-item>
        <el-menu-item index="/user/archives"> <i class="el-icon-s-claim"></i>归档 </el-menu-item>
        <el-menu-item index="/user/resource"> <i class="el-icon-share"></i>资源分享 </el-menu-item>
        <el-menu-item index="/user/timeline">
          <i class="el-icon-s-promotion"></i>点点滴滴
        </el-menu-item>
        <el-menu-item index="/user/about"> <i class="el-icon-link"></i>关于本站 </el-menu-item>
        <el-submenu index="7" v-if="haslogin">
          <template slot="title">
            <img :src="usericon" />
            {{ this.username }}
          </template>
          <el-menu-item index="/admin/index" v-if="userstatus">后台管理</el-menu-item>
          <el-menu-item index="/user">基本资料</el-menu-item>
          <el-popover placement="right" title="施工中" width="20" trigger="hover">
            <el-menu-item slot="reference" index="/user" disabled>安全设置</el-menu-item>
          </el-popover>
          <el-menu-item @click="logout()">退出登录</el-menu-item>
        </el-submenu>

        <el-menu-item index="/login" v-if="!haslogin"> 登录 </el-menu-item>
        <el-menu-item index="/register" v-if="!haslogin"> 注册 </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      haslogin: false,
      username: '没有登录',
      usericon: '',
      userstatus: '',
      header_show: true
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      key;
      keyPath;
    },
    logout() {
      this.header_show = false;
      const _this = this;
      _this.axios
        .get('/logout', {
          headers: {
            Authorization: sessionStorage.getItem('token')
          }
        })
        .then((res) => {
          this.$store.commit('REMOVE_INFO');
          this.$notify({
            title: res.msg,
            message: this.$createElement('i', { style: 'color: teal' }, '您已退出登录'),
            showClose: false,
            type: 'success',
            offset: 100
          });
          _this.$router.push('/login');
          this.header_show = true;
        })
        .catch((err) => {
          this.header_show = true;
          console.error(err);
        });
    }
  },
  created() {
    //用来清理store的缓存
    if (this.$store.state.token != '' && this.$store.state.token != null) {
      this.username = this.$store.getters.getUser.name;
      this.usericon = this.$store.getters.getUser.icons;
      this.userstatus = this.$store.getters.getUser.status==1?true:false;
      this.haslogin = true;
    } else {
      this.haslogin = false;
    }
  }
};
</script>

<style lang='less' scoped>
img {
  width: 50px;
  height: 50px;
  object-position: top;
  border-radius: 10%;
}
.menu {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.logo {
  font-size: 200%;
}
.el-menu-item [class^='el-icon-'] {
  width: auto !important;
}
</style>
