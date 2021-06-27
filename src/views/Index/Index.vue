<template>
  <div class="index_box">
    <div class="background"></div>
    <Header></Header>
    <Backtop></Backtop>
    <vue-particles
      class="particles"
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#000"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
    ></vue-particles>
    <div class="content">
      <el-container>
        <el-header class="header">
          <el-col :span="24">
            <transition appear appear-active-class="animate__animated animate__zoomIn">
              <div class="notice">
                <i class="el-icon-s-comment"></i>
                {{ pageData.aboutIndex.indexNotic }}
              </div>
            </transition>
          </el-col>
        </el-header>
        <el-main>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="16" :md="16" :span="16">
              <div class="blogs" v-if="blog_show">
                <div v-for="blog in pageData.blogs" :key="blog.id">
                  <transition
                    appear
                    appear-active-class="animate__animated animate__zoomIn"
                    enter-active-class="animate__animated animate__zoomIn"
                  >
                    <div class="article">
                      <router-link :to="{ path: '/user/article/' + blog.id }">
                        <div class="cover">
                          <el-image
                            style="width: 200px; border-radius: 0.5em"
                            :src="blog.cover"
                            :fit="fit"
                          ></el-image>
                        </div>
                      </router-link>
                      <router-link :to="{ path: '/user/article/' + blog.id }">
                        <div class="title">
                          <h1>{{ blog.title }}</h1>
                        </div>
                      </router-link>
                      <div class="summarize">
                        {{ blog.summarize }}
                      </div>
                      <div class="time">
                        <i class="el-icon-time">
                          {{ blog.time }}
                        </i>
                      </div>
                      <div class="author">
                        <i class="el-icon-s-custom">
                          {{ blog.author }}
                        </i>
                      </div>
                      <div class="type">
                        <i class="fas fa-folder"></i>
                        <span
                          class="type_content"
                          @click="searchTagAndType('type', blog.typeList[0].content)"
                        >
                          {{ blog.typeList[0].content }}
                        </span>
                      </div>
                      <div class="tag">
                        <i class="fas fa-tag"></i>
                        <span v-for="tag in blog.tagList" :key="tag.id">
                          <span class="tag_name" @click="searchTagAndType('tag', tag.name)">{{
                            tag.name
                          }}</span>
                        </span>
                      </div>
                      <div class="comments">
                        <i class="el-icon-chat-dot-round">
                          {{ blog.commentList.length }}
                        </i>
                      </div>
                      <div class="views">
                        <i class="el-icon-view">
                          {{ blog.viewsNumber }}
                        </i>
                      </div>
                    </div>
                  </transition>
                </div>

                <div class="page">
                  <el-pagination
                    v-if="pageData.total != 0"
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    :total="pageData.total"
                    @current-change="page"
                    ><!-- 注意这里用的是page，组件回调跳转的页码代入2方法，不是page() -->
                  </el-pagination>
                </div>
              </div>
            </el-col>
            <el-col :xs="0" :sm="8" :md="8" :span="8">
              <div class="and">
                <transition appear appear-active-class="animate__animated animate__jackInTheBox">
                  <div class="aboutme">
                    <div class="abltme_icon">
                      <el-avatar :size="150" :src="pageData.aboutme.icon" :fit="fit"></el-avatar>
                    </div>
                    <div class="aboutme_name">
                      <b>{{ pageData.aboutme.name }}</b>
                    </div>
                    <div class="aboutme_note">
                      <i>{{ pageData.aboutme.note }}</i>
                    </div>
                    <el-divider></el-divider>
                    <div class="aboutme_app">
                      <i class="fab fa-qq"></i>
                      <i class="fas fa-comment"></i>
                      <i class="fab fa-weixin"></i>
                      <i class="fab fa-github"></i>
                    </div>
                  </div>
                </transition>

                <transition appear appear-active-class="animate__animated animate__zoomIn">
                  <div class="calendar">
                    <el-calendar v-model="calendar" class="calendar_el"> </el-calendar>
                  </div>
                </transition>

                <transition appear appear-active-class="animate__animated animate__zoomIn">
                  <div class="comment">
                    最新评论
                    <div v-for="comment in pageData.comments" :key="comment.id" class="comment_for">
                      <div class="comment_icon">
                        <el-avatar :size="50" :src="comment.authorIcon"></el-avatar>
                      </div>
                      <div class="comment_name">
                        {{ comment.authorName }}
                      </div>
                      <div class="comment_content">
                        <span>
                          <div class="comment_content_content">
                            {{ comment.content }}
                          </div>
                          <div class="comment_content_article">
                            {{ comment.articleTitle }}
                          </div>
                          <div class="comment_content_time">
                            {{ comment.time }}
                          </div>
                        </span>
                      </div>
                      <el-divider class="comment_line"></el-divider>
                    </div>
                  </div>
                </transition>

                <transition appear appear-active-class="animate__animated animate__zoomIn">
                  <div class="version">
                    <div class="version_title">版本说明</div>
                    <div class="block">
                      <el-timeline>
                        <el-timeline-item
                          v-for="version in pageData.versions"
                          :key="version.id"
                          :timestamp="version.time"
                          placement="top"
                        >
                          <el-card>
                            <p>{{ version.content }}</p>
                          </el-card>
                        </el-timeline-item>
                      </el-timeline>
                    </div>
                  </div>
                </transition>

                <transition appear appear-active-class="animate__animated animate__zoomIn">
                  <div class="aboutIndex">
                    <div class="aboutIndex_title">网站信息</div>
                    <div class="aboutIndex_content">
                      <div>
                        <i class="fas fa-file-alt"></i>
                        文章总数：{{ pageData.aboutIndex.articleAmount }} 篇
                      </div>
                      <div>
                       <i class="fas fa-folder"></i>
                        分类总数：{{ pageData.aboutIndex.typeAmount }} 个
                      </div>
                      <div>
                        <i class="fas fa-tags"></i>
                        标签总数：{{ pageData.aboutIndex.tagAmount }} 个
                      </div>
                      <div>
                        <i class="fas fa-comments"></i>
                        留言总数：{{ pageData.aboutIndex.messageAmount }} 条
                      </div>
                      <div>
                        <i class="fas fa-comment-dots"></i>
                        评论总数：{{ pageData.aboutIndex.commentAmount }} 条
                      </div>
                    </div>
                  </div>
                </transition>

                <transition appear appear-active-class="animate__animated animate__zoomIn">
                  <div class="friendlylink">
                    <div class="friendlylink_title">友情链接</div>

                    <div class="friendlylink_content">
                      <el-link
                        v-for="friendlylink in pageData.friendlylinks"
                        :key="friendlylink.id"
                        :href="friendlylink.link"
                        class="friendlylink_content_link"
                        target="_blank"
                      >
                        {{ friendlylink.name }}
                      </el-link>
                    </div>
                  </div>
                </transition>
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
import Model from '../../model/indexModel';

export default {
  components: { Header, Footer, Backtop },
  data() {
    return {
      fit: 'scale-down',
      calendar: new Date(),
      blog_show: true,

      // 分页数据
      currentPage: 1,
      pageSize: 10,

      //封装数据
      pageData: {}
    };
  },
  methods: {
    page(currentPage, pageSize) {
      const _this = this;
      _this.axios
        .get('/api/index', {
          params: {
            currentPage: currentPage,
            pageSize: pageSize
          }
        })
        .then(({ data }) => {
          this.pageData = new Model(data);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    searchTagAndType(search_class, search_content) {
      this.$router.push({
        name: `Category`,
        params: {
          search_class: search_class,
          search_content: search_content
        }
      });
    }
  },
  created() {
    this.pageData = new Model();
    this.page(1, this.pageSize);
  }
};
</script>

<style lang='less' scoped>
@import url(./Index);
</style>
<style lang="less">
@import url(./IndexEL);
</style>