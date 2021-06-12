<template>
  <div>
    <Header></Header>
    <div class="login_background">
      <div class="form_background">
        <b>注册</b>
        <el-form
          :model="regForm"
          :rules="rules"
          ref="regForm"
          label-width="0px"
          class="from demo-ruleForm"
        >
          <el-form-item prop="phone" class="item">
            <p class="input">手机号</p>
            <el-input
              oninput="value=value.replace(/[^\d]/g,'')"
              maxlength="11"
              v-model.number="regForm.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="name" class="item">
            <p class="input">昵称</p>
            <el-input maxlength="10" v-model="regForm.name" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item">
            <p class="input">密码</p>
            <el-input
              type="password"
              v-model="regForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="again" class="item">
            <p class="input">确认密码</p>
            <el-input type="password" v-model="regForm.again" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="12"
              ><el-form-item prop="code" class="item">
                <p class="input">请输入验证码</p>
                <el-input v-model="regForm.code"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12">
              <img :src="captcha" class="code_img" @click="getcaptcha()" />
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="submitForm(regForm)" class="button">
              注册
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
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        if (value.size != 10) {
          console.log(value);
          callback(new Error('请输入11位手机号'));
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.regForm.again !== '') {
          this.$refs.regForm.validateField('again');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.regForm.password) {
        callback(new Error('密码不一致'));
      } else {
        callback();
      }
    };
    return {
      captcha: '',
      regForm: {
        phone: '',
        name: '',
        password: '',
        again: '',
        code: ''
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        again: [{ validator: validatePass2, trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    getcaptcha() {
      console.log('sdfd');
      this.captcha = '';
      this.captcha = this.axios.defaults.baseURL + '/captcha/' + Date.now();
    },
    submitForm() {}
  },
  created() {
    this.captcha = this.axios.defaults.baseURL + '/captcha/' + Date.now();
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
  height: 28em;
  width: 20em;
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
  margin: 1em !important;
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
.code_img {
  margin-top: 0.5em;
  width: 100%;
}
</style>
<style>
.el-form-item__error {
  top: 40% !important;
  left: 0% !important;
}
</style>
