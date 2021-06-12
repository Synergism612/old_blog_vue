<template>
  <div>
    <div>
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
        <el-menu-item index="/user/resoutce"> <i class="el-icon-share"></i>资源分享 </el-menu-item>
        <el-menu-item index="/user/timeline">
          <i class="el-icon-s-promotion"></i>点点滴滴
        </el-menu-item>
        <el-menu-item index="/user/about"> <i class="el-icon-link"></i>关于本站 </el-menu-item>
        <el-submenu index="7" v-if="haslogin">
          <template slot="title">
            <el-avatar style="width: 40px" shape="square" :src="usericon" :fit="fit"></el-avatar>
            {{ this.username }}
          </template>
          <el-menu-item index="2-1">基本资料</el-menu-item>
          <el-menu-item index="2-2">安全设置</el-menu-item>
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
      fit: 'scale-down'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      key;
      keyPath;
    },
    logout() {
      const _this = this;
      _this.axios
        .get('/logout', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then((res) => {
          _this.$store.commit('REMOVE_INFO');
          _this.$router.push('/login');
          this.$notify({
            title: res.msg,
            message: this.$createElement('i', { style: 'color: teal' }, '您已退出登录'),
            showClose: false,
            type: 'success',
            offset: 100
          });
          // console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  created() {
    //用来清理store的缓存
    if (this.$store.state.token != '' && this.$store.state.token != null) {
      // console.log(this.$store.state.token);
      // console.log(this.$store.state.userInfo);
      this.username = this.$store.getters.getUser.name;
      this.usericon = this.$store.getters.getUser.icons;
      // console.log(this.$store.getters.getUser.name);
      // console.log(this.usericon);
      this.haslogin = true;
    } else {
      this.haslogin = false;
    }
  }
};
</script>

<style scoped>
.menu {
  /* padding-left: 25em; */
  /* padding-right: 25em; */
  /* max-width: 1110px; */
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
