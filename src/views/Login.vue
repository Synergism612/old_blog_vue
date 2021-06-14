<template>
  <div>
    <Header></Header>
    <div class="login_background">
      <div class="form_background">
        <b>登录</b>
        <el-form
          :model="logForm"
          :rules="rules"
          ref="logForm"
          label-width="0px"
          class="from demo-ruleForm"
        >
          <el-form-item prop="phone" class="item">
            <p class="input">账号</p>
            <el-input v-model="logForm.phone" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item">
            <p class="input">密码</p>
            <el-input
              v-model="logForm.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-link href="" target="_blank" class="link">忘记密码</el-link>

            <el-link href="/register" target="_blank" class="link">注册账号</el-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('logForm')" class="button">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header';

export default {
  components: { Header },
  data() {
    return {
      logForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$store.state.token != '' && this.$store.state.token != null) {
            this.$notify.error({
              title: '错误',
              message: this.$store.getters.getUser.name + '  您已登录',
              offset: 100
            });
            return false;
          }
          //调用请求之前的this
          const _this = this;
          //使用axios.post发送请求，参数为url和发送的数据
          this.axios
            .post('/login', this.logForm)
            .then((res) => {
              console.log(res);
              //登录成功时获取jwt令牌
              const jwt = res.headers['authorization'];
              const userInfo = res.data.data;
              // console.log(jwt);
              // console.log(userInfo);
              //想让这些数据在所有组件中被使用需要在store中进行配置
              //然后需要将这些数据共享到store中
              _this.$store.commit('SET_TOKEN', jwt);
              _this.$store.commit('SET_USERINFO', userInfo);

              // console.log(sessionStorage.getItem("userInfo"));

              //测试能否从store获取
              // console.log(_this.$store.getters.getUser);

              //完成后应该跳转到列表页面
              _this.$router.push('/user/index');
              this.$notify({
                title: '成功',
                message: '欢迎回来' + '   ' + res.data.data.name,
                type: 'success',
                offset: 100
              });
            })
            .catch((err) => {
              // console.log(err);
              err;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login_background {
  width: 100%;
  height: 100%;
  position: fixed;
  background: url(../assets/images/backgroud-login.png) no-repeat center;
  background-size: cover;
  font-size: 120%;
}
.form_background {
  position: relative;
  color: #158fc5;
  height: 18em;
  width: 18em;
  margin: 10em auto;
  display: block;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1.2em;
  box-shadow: 0 2px 5px -1px rgb(9 2 4 / 80%);
  padding: 1em;
  box-sizing: border-box;
  transition: 0.5s;
  /* display: none; */
  transform: rotateY(0deg);
}
.el-form-item__label {
  color: #158fc5 !important;
}
.from {
  position: relative !important;
  width: 100% !important;
  margin: auto;
}
.item {
  margin: 0em !important;
}
.el-form-item__content {
  width: 20em !important;
  margin: auto !important;
}
.input {
  float: left;
  margin-top: 0.2em;
}
.link {
  margin: 0 0.5em 0 0.5em;
}
.button {
  margin: 0em !important;
  height: 2em !important;
  padding: 0.5em 1.5em !important;
  box-sizing: content-box !important;
  min-height: 2em !important;
  min-width: 6em !important;
  border-radius: 2em !important;
  line-height: 1em !important;
  cursor: pointer !important;
  transition: background 0.3s !important;
  text-align: center !important;
  background-color: #158fc5 !important;
  color: white !important;
  border: none !important;
  outline: none !important;
}
.button:hover {
  background-color: #2d6e8a !important;
}
</style>
<style>
.el-form-item__error {
  top: 65% !important;
  left: 75% !important;
}
</style>
