<template>
  <div class="user_box" v-if="user_show">
    <div class="background"></div>
    <Header></Header>
    <Backtop></Backtop>
    <div class="content">
      <el-container>
        <el-header class="header">
          <el-col :span="24">
            <transition appear appear-active-class="animate__animated animate__zoomIn">
              <div class="breadcrumb">
                <el-breadcrumb separator=">">
                  <el-breadcrumb-item> 个人主页 </el-breadcrumb-item>
                  <el-breadcrumb-item> 个人资料 </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </transition>
          </el-col>
        </el-header>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="23">
              <transition
                appear
                appear-active-class="animate__animated animate__fadeInDown"
                enter-active-class="animate__animated animate__fadeInDown"
              >
                <div class="user">
                  <div class="user_content">
                    <el-divider></el-divider>
                    <div class="user_input">
                      <div class="user_input_title">头像</div>
                      <br />
                      <el-row :gutter="20">
                        <el-col :span="3">
                          <img :src="usericon" />
                        </el-col>
                        <el-col :span="2">
                          <el-button
                            class="user_input_button"
                            type="info"
                            round
                            @click="user_input_upload_show = true"
                            >更换头像</el-button
                          >
                        </el-col>
                      </el-row>
                    </div>
                    <el-divider></el-divider>
                    <div class="user_input">
                      <el-row :gutter="20">
                        <el-col :span="2"><div class="user_input_title">昵称：</div></el-col>
                        <el-col :span="6">
                          {{ pageData.name }}
                        </el-col>
                        <el-col :span="6">
                          <el-input
                            v-model="userInput.name"
                            :placeholder="pageData.name"
                          ></el-input>
                        </el-col>
                        <el-col :span="6">
                          <el-link
                            v-if="this.userInput.name != '' && userInput.name != pageData.name"
                            type="info"
                            @click="update()"
                            >修改</el-link
                          >
                        </el-col>
                      </el-row>
                    </div>
                    <el-divider></el-divider>
                    <div class="user_input">
                      <el-row :gutter="20">
                        <el-col :span="2"><div class="user_input_title">性别：</div></el-col>
                        <el-col :span="6">{{ pageData.sex }} </el-col>
                        <el-col :span="6">
                          <el-radio v-model="userInput.sex" label="男">男</el-radio>
                          <el-radio v-model="userInput.sex" label="女">女</el-radio>
                          <el-radio v-model="userInput.sex" label="不设置">不设置</el-radio>
                        </el-col>
                        <el-col :span="6">
                          <el-link
                            v-if="userInput.sex != pageData.sex"
                            type="info"
                            @click="update()"
                            >修改</el-link
                          >
                        </el-col>
                      </el-row>
                    </div>
                    <el-divider></el-divider>
                    <div class="user_input">
                      <el-row :gutter="20">
                        <el-col :span="2"><div class="user_input_title">邮箱：</div></el-col>
                        <el-col :span="6">
                          {{ pageData.email }}
                        </el-col>
                        <el-col :span="6">
                          <el-input
                            v-model="userInput.email"
                            :placeholder="pageData.email"
                          ></el-input>
                        </el-col>
                        <el-col :span="6">
                          <el-link
                            v-if="userInput.email != '' && userInput.email != pageData.email"
                            type="info"
                            @click="update()"
                            >修改</el-link
                          >
                        </el-col>
                      </el-row>
                    </div>
                    <el-divider></el-divider>
                    <div class="user_input">
                      <el-row :gutter="20">
                        <el-col :span="2"><div class="user_input_title">生日：</div></el-col>
                        <el-col :span="6">
                          {{ pageData.birthday }}
                        </el-col>
                        <el-col :span="6">
                          <el-date-picker
                            v-model="userInput.birthday"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy 年 MM 月 dd 日"
                          >
                          </el-date-picker>
                        </el-col>
                        <el-col :span="6">
                          <el-link
                            v-if="
                              userInput.birthday != '' && userInput.birthday != pageData.birthday
                            "
                            type="info"
                            @click="update()"
                            >修改</el-link
                          >
                        </el-col>
                      </el-row>
                    </div>
                    <el-divider></el-divider>
                    <div class="user_input">
                      <el-row :gutter="20">
                        <el-col :span="2"><div class="user_input_title">简介：</div></el-col>
                        <el-col :span="6">
                          {{ pageData.intro }}
                        </el-col>
                        <el-col :span="6">
                          <el-input
                            type="textarea"
                            :placeholder="pageData.intro"
                            v-model="userInput.intro"
                            maxlength="100"
                            show-word-limit
                          >
                          </el-input>
                        </el-col>
                        <el-col :span="6">
                          <el-link
                            v-if="userInput.intro != '' && userInput.intro != pageData.intro"
                            type="info"
                            @click="update()"
                            >修改</el-link
                          >
                        </el-col>
                      </el-row>
                    </div>
                    <el-divider></el-divider>
                  </div>
                </div>
              </transition>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
    <div class="user_input_upload" v-if="user_input_upload_show">
      <div class="user_input_upload_backgroud" @click="user_input_upload_show = false"></div>
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :multiple="false"
        :limit="1"
        :http-request="selectPicUpload"
        :before-upload="beforeAvatarUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import Header from '../../../components/User/Header.vue';
import Backtop from '../../../components/User/Backtop';
import { showLoading, hideLoading } from '../../../assets/js/loading';
import Model from '../../../model/userModel';

export default {
  components: { Header, Backtop },
  data() {
    return {
      user_show: true,
      user_input_upload_show: false,
      usericon: '',
      userInfo: {},
      //封装数据
      pageData: {},
      //绑定表单的数据
      userInput: {
        name: '',
        sex: '0',
        email: '',
        intro: '',
        birthday: ''
      }
    };
  },
  methods: {
    //对上传图片的大小、格式进行限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isJPG2 = file.type === 'image/jpg';
      const isPNG = file.type === 'image/png';
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG && !isJPG2 && !isPNG) {
        this.$notify({
          message: '只支持jpg或png格式图片',
          type: 'warning',
          showClose: false,
          offset: 100
        });
      }
      if (!isLt5M) {
        this.$notify({
          message: '请上传5MB以内的图片!',
          type: 'warning',
          showClose: false,
          offset: 100
        });
      }
      return (isJPG || isJPG2 || isPNG) && isLt5M;
    },
    //上传图片
    selectPicUpload(obj) {
      showLoading();
      this.user_show = false;
      let fd = new FormData(); //参数的格式是formData格式的
      fd.append('file', obj.file); //参数
      const _this = this;
      _this.axios
        .patch('/api/user/' + this.$store.getters.getUser.phone + '/icon/' + obj.file.name, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(({ data }) => {
          this.$notify({
            message: '上传成功',
            type: 'success',
            showClose: false,
            offset: 100
          });
          //调用删除方法
          this.deletePicUpload();
          //备份store中的用户信息
          this.userInfo = this.$store.getters.getUser;
          //修改其中的头像信息
          this.userInfo.icons = data;
          //删除原来的信息
          this.$store.commit('REMOVE_USERINFO');
          //更新信息
          this.$store.commit('SET_USERINFO', this.userInfo);
          // 重新获得
          this.usericon = this.$store.getters.getUser.icons;
          //删除备份
          this.userInfo = null;
          //刷新页面
          this.user_input_upload_show = false;
          this.user_show = true;
          hideLoading();
        })
        .catch((err) => {
          this.$notify({
            message: '上传失败',
            type: 'error',
            showClose: false,
            offset: 100
          });
          this.user_input_upload_show = false;
          this.user_show = true;
          hideLoading();
          console.log(err);
        });
    },
    //上传成功时的删除图片事件
    deletePicUpload() {
      const _this = this;
      _this.axios
        .delete('/api/oss/image', {
          params: { url: this.usericon }
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //请求个人数据
    user() {
      const _this = this;
      _this.axios
        .get('/api/user/' + this.$store.getters.getUser.phone)
        .then(({ data }) => {
          this.pageData = new Model(data);
          //传递数据
          switch (data.sex) {
            case 0:
              this.userInput.sex = '女';
              break;
            case 1:
              this.userInput.sex = '男';
              break;
            default:
              this.userInput.sex = '不设置';
              break;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //除了头像的修改总方法
    update() {
      // 开启遮罩
      showLoading();
      // 刷新
      this.user_show = false;
      // 昵称修改检测
      if (this.userInput.name != '' && this.userInput.name != this.pageData.name) {
        if (this.userInput.name.length < 20) {
          this.updataName(this.userInput.name);
          this.userInput.name = '';
        } else {
          this.$notify({
            message: '昵称过长',
            type: 'warning',
            showClose: false,
            offset: 100
          });
        }
      }
      // 性别修改检测
      if (this.userInput.sex != this.pageData.sex) {
        this.updataSex(this.userInput.sex);
      }
      // 邮箱修改检测
      if (this.userInput.email != '' && this.userInput.email != this.pageData.email) {
        if (this.userInput.email.indexOf('@') != -1 && this.userInput.email.indexOf('.') != -1) {
          this.updataEmail(this.userInput.email);
          this.userInput.email = '';
        } else {
          this.$notify({
            message: '邮箱格式不正确',
            type: 'warning',
            showClose: false,
            offset: 100
          });
        }
      }
      // 生日修改检测
      if (this.userInput.birthday != '' && this.userInput.birthday != this.pageData.birthday) {
        console.log(this.userInput.birthday);
        this.updataBirthday(this.userInput.birthday);
        this.userInput.birthday = '';
      }
      // 简介修改检测
      if (this.userInput.intro != '' && this.userInput.intro != this.pageData.intro) {
        console.log(this.userInput.intro);
        this.updataIntro(this.userInput.intro);
        this.userInput.intro = '';
      }

      // 显示
      this.user_show = true;
      // 关闭遮罩
      hideLoading();
    },
    //修改昵称
    updataName(name) {
      const _this = this;
      _this.axios
        .patch('/api/user/' + this.$store.getters.getUser.phone + '/name/' + name)
        .then(() => {
          this.$notify({
            message: '修改成功',
            type: 'success',
            showClose: false,
            offset: 100
          });
          this.pageData.name = name;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //修改性别
    updataSex(sex) {
      const _this = this;
      _this.axios
        .patch('/api/user/' + this.$store.getters.getUser.phone + '/sex/' + sex)
        .then(() => {
          this.$notify({
            message: '修改成功',
            type: 'success',
            showClose: false,
            offset: 100
          });
          this.pageData.sex = sex;
          this.userInput.sex = this.pageData.sex;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //修改邮箱
    updataEmail(email) {
      const _this = this;
      _this.axios
        .patch('/api/user/' + this.$store.getters.getUser.phone + '/email/' + email)
        .then(() => {
          this.$notify({
            message: '修改成功',
            type: 'success',
            showClose: false,
            offset: 100
          });
          this.pageData.email = email;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 修改生日
    updataBirthday(birthday) {
      const _this = this;
      _this.axios
        .patch('/api/user/' + this.$store.getters.getUser.phone + '/birthday/' + birthday)
        .then(() => {
          this.$notify({
            message: '修改成功',
            type: 'success',
            showClose: false,
            offset: 100
          });
          this.pageData.birthday = birthday;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //修改简介
    updataIntro(intro) {
      const _this = this;
      _this.axios
        .patch('/api/user/' + this.$store.getters.getUser.phone + '/intro/' + intro)
        .then(() => {
          this.$notify({
            message: '修改成功',
            type: 'success',
            showClose: false,
            offset: 100
          });
          this.pageData.intro = intro;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  created() {
    this.usericon = this.$store.getters.getUser.icons;
    this.pageData = new Model();
    this.user();
  }
};
</script>

<style lang="less" scoped>
@import url(./User);
</style>
<style lang="less">
@import url(./UserEL);
</style>
