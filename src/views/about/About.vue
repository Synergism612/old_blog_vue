<template>
  <div class="about_box">
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
                  <el-breadcrumb-item :to="{ path: '/api/index' }"> 首页 </el-breadcrumb-item>
                  <el-breadcrumb-item> 关于 </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </transition>
          </el-col>
        </el-header>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="about">
                <div class="about_content">
                  <div class="about_top">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="关于博客" name="aboutindex">
                        <div class="about" v-if="aboutindex_show">
                          <transition
                            appear
                            appear-active-class="animate__animated animate__bounceIn"
                            enter-active-class="animate__animated animate__bounceIn"
                          >
                            <div class="block">
                              <img :src="pageData.aboutIndex.icon" />
                            </div>
                          </transition>
                          <transition
                            appear
                            appear-active-class="animate__animated animate__bounceInLeft"
                            enter-active-class="animate__animated animate__bounceInLeft"
                          >
                            <div class="about_title">
                              <h1>Synergism 's Blog</h1>
                            </div>
                          </transition>
                          <el-divider></el-divider>
                          <transition
                            appear
                            appear-active-class="animate__animated animate__bounceInRight"
                            enter-active-class="animate__animated animate__bounceInRight"
                          >
                            <div class="about_icon">
                              <i class="fas fa-home"></i>
                              <i class="fas fa-file-alt"></i>
                              <i class="fas fa-tags"></i>
                              <i class="fas fa-hourglass-half"></i>
                            </div>
                          </transition>
                          <el-divider>
                            <p class="divider_title">简介</p>
                          </el-divider>

                          <transition
                            appear
                            appear-active-class="animate__animated animate__bounceInLeft"
                            enter-active-class="animate__animated animate__bounceInLeft"
                          >
                            <div class="about_synopsis">
                              <p>
                                {{ pageData.aboutIndex.synopsis }}
                              </p>
                            </div>
                          </transition>
                          <el-divider>
                            <p class="divider_title">说明</p>
                          </el-divider>
                          <transition
                            appear
                            appear-active-class="animate__animated animate__bounceInRight"
                            enter-active-class="animate__animated animate__bounceInRight"
                          >
                            <div class="about_content">
                              <div
                                class="markdown-body details_md"
                                v-html="pageData.aboutIndex.content"
                              ></div>
                            </div>
                          </transition>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="关于作者" name="aboutme">
                        <div class="about" v-if="aboutme_show">
                          <transition
                            appear
                            appear-active-class="animate__animated animate__bounceIn"
                            enter-active-class="animate__animated animate__bounceIn"
                          >
                            <div class="block">
                              <img :src="pageData.aboutMe.icon" />
                            </div>
                          </transition>
                          <transition
                            appear
                            appear-active-class="animate__animated animate__bounceInLeft"
                            enter-active-class="animate__animated animate__bounceInLeft"
                          >
                            <div class="about_title">
                              <h1>{{ pageData.aboutMe.name }}</h1>
                            </div>
                          </transition>
                          <el-divider></el-divider>
                          <transition
                            appear
                            appear-active-class="animate__animated animate__bounceInRight"
                            enter-active-class="animate__animated animate__bounceInRight"
                          >
                            <div class="about_icon">
                              <i class="fab fa-qq"></i>
                              <i class="fas fa-envelope"></i>
                              <i class="fab fa-weixin"></i>
                              <i class="fab fa-github"></i>
                            </div>
                          </transition>
                          <el-divider>
                            <p class="divider_title">简介</p>
                          </el-divider>

                          <transition
                            appear
                            appear-active-class="animate__animated animate__bounceInLeft"
                            enter-active-class="animate__animated animate__bounceInLeft"
                          >
                            <div class="about_synopsis">
                              <p>
                                {{ pageData.aboutMe.note }}
                              </p>
                            </div>
                          </transition>
                          <el-divider>
                            <p class="divider_title">关于我</p>
                          </el-divider>
                          <transition
                            appear
                            appear-active-class="animate__animated animate__bounceInRight"
                            enter-active-class="animate__animated animate__bounceInRight"
                          >
                            <div class="about_content">
                              <div
                                class="markdown-body details_md"
                                v-html="pageData.aboutMe.content"
                              ></div>
                            </div>
                          </transition>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="留言墙" name="message">
                        <div v-if="message_show">
                          <h1>欢迎各位大佬吐槽</h1>
                          <el-divider>
                            <p class="divider_title">Leave a message</p>
                          </el-divider>
                          <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="messageNew"
                            maxlength="250"
                            show-word-limit
                            class="message_new_content"
                          ></el-input>
                          <div class="message_new_link">
                              <el-link type="info" target="_blank" @click="newMessage()">提交评论</el-link>
                          </div>
                          <el-divider></el-divider>
                          <transition-group
                            appear
                            appear-active-class="animate__animated animate__fadeInDown"
                            enter-active-class="animate__animated animate__fadeInDown"
                          >
                            <div
                              v-for="message in pageData.messageList"
                              :key="message.id"
                              class="message_for"
                            >
                              <div class="message_icon">
                                 <img :src="message.authorIcon" />
                              </div>
                              <div class="message_name">
                                {{ message.authorName }}
                              </div>
                              <div class="message_content">
                                <span>
                                  <div class="message_content_content">
                                    {{ message.content }}
                                  </div>
                                  <div class="message_content_time">
                                    {{ message.time }}
                                  </div>
                                </span>
                              </div>
                              <el-divider class="message_line"></el-divider>
                            </div>
                          </transition-group>
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Backtop from '../../components/Backtop';
import Model from '../../model/aboutModel';

export default {
  components: { Header, Footer, Backtop },
  data() {
    return {
      activeName: 'aboutindex',
      aboutindex_show: false,
      aboutme_show: false,
      message_show: false,
      messageNew: '',

      //封装数据
      pageData: {}
    };
  },
  methods: {
    handleClick(tab, event) {
      this.aboutindex_show = false;
      this.aboutme_show = false;
      this.message_show = false;

      if (tab.name == 'aboutindex') {
        this.aboutindex_show = true;
      }
      if (tab.name == 'aboutme') {
        this.aboutme_show = true;
      }
      if (tab.name == 'message') {
        this.message_show = true;
      }
      event;
    },
    about() {
      const _this = this;
      _this.axios
        .get('/api/about', {
          params: {
            articleId: this.$router.currentRoute.params.id
          }
        })
        .then(({ data }) => {
          // console.log(data);
          // 解析md文件
          var MardownIt = require('markdown-it');
          var md = new MardownIt();
          this.pageData = new Model(data);
          var about_content;
          about_content = md.render(data.aboutIndex.content);
          this.pageData.aboutIndex.content = about_content;
          about_content = md.render(data.aboutMe.content);
          this.pageData.aboutMe.content = about_content;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    newMessage() {
      if (this.$store.getters.getUser.phone) {
        if (this.messageNew != '' && this.messageNew != null) {
          const _this = this;
          _this.axios
            .post('api/message', {
              userPhone: this.$store.getters.getUser.phone,
              content: this.messageNew,
              time: new Date()
            })
            .then((res) => {
              this.message_show = false;
              this.$notify({
                title: res.data,
                message: '您的留言已添加',
                type: 'success',
                offset: 100
              });
              this.messageNew = '';

              this.pageData = new Model();
              this.about();
              this.message_show = true;
            })
            .catch((err) => {
              this.$notify({
                title: '操作失败',
                message: err.message,
                type: 'warning',
                offset: 100
              });
            });
        } else {
          this.$notify({
            title: '操作失败',
            message: '请填入内容',
            type: 'warning',
            offset: 100
          });
        }
      } else {
        this.$notify({
          title: '操作失败',
          message: '请先登录',
          type: 'warning',
          offset: 100
        });
      }
    }
  },
  created() {
    this.aboutindex_show = true;
    this.pageData = new Model();
    this.about();
  }
};
</script>

<style lang='less' scoped>
@import url(./About);
</style>
<style>
.el-tabs__item.is-active {
  color: black !important;
}
.el-tabs__item:hover {
  color: black !important;
}
.el-tabs__active-bar {
  background-color: black !important;
}
</style>