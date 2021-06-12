<template>
  <div>
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
                  <el-breadcrumb-item :to="{ path: '/blog/index' }">
                    首页
                  </el-breadcrumb-item>
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
                        <el-divider></el-divider>
                        <div class="about" v-if="aboutindex_show">
                          <transition
                            appear
                            appear-active-class="animate__animated animate__bounceIn"
                            enter-active-class="animate__animated animate__bounceIn"
                          >
                            <div class="block">
                              <el-avatar :size="300" :src="pageData.aboutIndex.icon"></el-avatar>
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
                            <div>
                              <font-awesome-icon
                                :icon="['fas', 'home']"
                                class="about_icon"
                                size="2x"
                              />
                              <font-awesome-icon
                                :icon="['fas', 'file-alt']"
                                class="about_icon"
                                size="2x"
                              />
                              <font-awesome-icon
                                :icon="['fas', 'tags']"
                                class="about_icon"
                                size="2x"
                              />
                              <font-awesome-icon
                                :icon="['fas', 'hourglass-half']"
                                class="about_icon"
                                size="2x"
                              />
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
                        <el-divider></el-divider>
                        <div class="about" v-if="aboutme_show">
                          <transition
                            appear
                            appear-active-class="animate__animated animate__bounceIn"
                            enter-active-class="animate__animated animate__bounceIn"
                          >
                            <div class="block">
                              <el-avatar :size="300" :src="pageData.aboutMe.icon"></el-avatar>
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
                            <div>
                              <font-awesome-icon
                                :icon="['fab', 'qq']"
                                size="2x"
                                class="about_icon"
                              />
                              <font-awesome-icon
                                :icon="['fas', 'envelope']"
                                size="2x"
                                class="about_icon"
                              />
                              <font-awesome-icon
                                :icon="['fab', 'weixin']"
                                size="2x"
                                class="about_icon"
                              />
                              <font-awesome-icon
                                :icon="['fab', 'github']"
                                size="2x"
                                class="about_icon"
                              />
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
                            <el-link target="_blank" @click="newMessage()">提交评论</el-link>
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
                                <el-avatar :size="50" :src="message.authorIcon"></el-avatar>
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
import Header from '../components/Header';
import Footer from '../components/Footer';
import Backtop from '../components/Backtop';
import Model from '../model/aboutModel';

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
        .get('/blog/about', {
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
            .post('add/message', {
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

<style scoped>
.about {
  margin: auto;
  border-radius: 0.5em;
  box-shadow: 0 2px 5px -1px rgba(9, 2, 4, 0.8);
  padding: 1em;
  text-align: center;
}
.about_title {
  text-align: center;
}
.el-tabs__item.is-active {
  color: black !important;
}
.el-tabs__item:hover {
  color: black !important;
}
.el-tabs__active-bar {
  background-color: black !important;
}
.about_title {
  margin-top: 0.3em;
  margin-bottom: 0.3em;
  font-size: 120%;
}
.about_icon {
  margin-left: 0.25em;
  margin-right: 0.25em;
}
.about_icon:hover {
  cursor: pointer;
}
.el-divider__text {
  background-color: rgba(9, 2, 4, 0) !important;
}
.about_synopsis {
  width: 70%;
  margin: auto;
}
.about_content {
  width: 90%;
  margin: 1em auto;
}
.message_new_link {
  text-align: right;
  margin-top: 0.5em;
  padding-right: 1em;
}
.message_content {
  /* background-color: rgba(12, 230, 238, 0.2); */
  background-color: rgba(192, 192, 192, 0.3);
  padding: 5px 8px;
  display: inline-block;
  border-radius: 4px;
  position: relative;
  margin-left: 0.5em;
  width: 92%;
  min-height: 3em;
  box-shadow: 2px 2px 3px -2px rgba(9, 2, 4, 0.8);
}
.message_content span::after {
  content: '';
  border: 8px solid #ffffff00;
  border-right: 8px solid rgba(192, 192, 192, 0.3);
  position: absolute;
  top: 6px;
  left: -16px;
}
.message_icon {
  float: left;
}
.message_name {
  position: absolute;
  margin-top: 4.2em;
  font-size: 80%;
  width: 4em;
}
.message_for {
  padding-top: 0.8em;
  text-align: left;
}
.message_content_content {
  text-align: left;
  padding-top: 0.1em;
  padding-left: 0.6em;
  word-wrap: break-word;
}
.message_content_article {
  text-align: right;
  font-size: 50%;
}
.message_content_time {
  text-align: right;
  font-size: 50%;
}
.message_line {
  margin-top: 1em !important;
  margin-bottom: 0.5em !important;
}
</style>
