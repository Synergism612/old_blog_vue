<template>
  <div>
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
                        <font-awesome-icon :icon="['fas', 'folder']" class="type_icon" />
                        <span
                          class="type_content"
                          @click="searchTagAndType('type', blog.typeList[0].content)"
                        >
                          {{ blog.typeList[0].content }}
                        </span>
                      </div>
                      <div class="tag">
                        <font-awesome-icon :icon="['fas', 'tag']" class="tag_icon" />
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
                      <font-awesome-icon :icon="['fab', 'qq']" size="2x" class="aboutme_app_icon" />
                      <font-awesome-icon
                        :icon="['fas', 'comment']"
                        size="2x"
                        class="aboutme_app_icon"
                      />
                      <font-awesome-icon
                        :icon="['fab', 'weixin']"
                        size="2x"
                        class="aboutme_app_icon"
                      />
                      <font-awesome-icon
                        :icon="['fab', 'github']"
                        size="2x"
                        class="aboutme_app_icon"
                      />
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
                        <font-awesome-icon
                          :icon="['fas', 'file-alt']"
                          class="aboutIndex_content_icon"
                        />
                        文章总数：{{ pageData.aboutIndex.articleAmount }} 篇
                      </div>
                      <div>
                        <font-awesome-icon
                          :icon="['fas', 'folder']"
                          class="aboutIndex_content_icon"
                        />
                        分类总数：{{ pageData.aboutIndex.typeAmount }} 个
                      </div>
                      <div>
                        <font-awesome-icon
                          :icon="['fas', 'tags']"
                          class="aboutIndex_content_icon"
                        />
                        标签总数：{{ pageData.aboutIndex.tagAmount }} 个
                      </div>
                      <div>
                        <font-awesome-icon
                          :icon="['fas', 'comments']"
                          class="aboutIndex_content_icon"
                        />
                        留言总数：{{ pageData.aboutIndex.messageAmount }} 条
                      </div>
                      <div>
                        <font-awesome-icon
                          :icon="['far', 'comment-dots']"
                          class="aboutIndex_content_icon"
                        />
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
import Header from '../components/Header';
import Footer from '../components/Footer';
import Backtop from '../components/Backtop';
import Model from '../model/indexModel';

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
        .get('/blog/index', {
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

<style scoped>
.notice {
  margin: auto;
  border-radius: 0.5em;
  box-shadow: 0 2px 5px -1px rgba(9, 2, 4, 0.8);
  padding: 1em;
  text-align: left;
}
.aboutme {
  position: relative;
  border-radius: 0.5em;
  box-shadow: 0 2px 5px -1px rgba(9, 2, 4, 0.8);
  padding: 0.8em;
  padding-top: 1.6em;
  margin-bottom: 1em;
  text-align: center;
  height: 20.5em;
}
.aboutme_icon {
}
.aboutme_name {
  font-size: 180%;
  font-family: monospace;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}
.aboutme_note {
  font-size: 150%;
  font-family: monospace;
}
.aboutme_app_icon {
  margin-left: 0.2em;
  margin-right: 0.2em;
}
.number:hover {
  color: #c33327;
}
.active {
  color: rgba(105, 105, 105, 0.8) !important;
  border: solid 1px rgba(105, 105, 105, 0.8);
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  border-radius: 8px !important;
}
.version {
  position: relative;
  border-radius: 0.5em;
  box-shadow: 0 2px 5px -1px rgba(9, 2, 4, 0.8);
  padding: 0.8em;
  margin-bottom: 1em;
  text-align: left;
  height: 100%;
}
.version_title {
  text-align: center;
  margin-bottom: 1em;
}
.el-timeline-item__tail {
  border-left: 2px solid rgba(192, 192, 192, 0.4) !important;
}
.el-timeline-item__node {
  background-color: rgba(192, 192, 192, 0.9) !important;
}
.el-card {
  background-color: rgba(192, 192, 192, 0.3) !important;
  box-shadow: 2px 2px 3px -2px rgba(9, 2, 4, 0.8) !important;
  border: none !important;
}
.aboutIndex {
  position: relative;
  border-radius: 0.5em;
  box-shadow: 0 2px 5px -1px rgba(9, 2, 4, 0.8);
  padding: 0.8em;
  margin-bottom: 1em;
  text-align: left;
  height: 100%;
}
.aboutIndex_title {
  text-align: center;
}
.aboutIndex_content {
  padding: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.3em;
}
.aboutIndex_content_icon {
  width: 1em !important;
  color: rgba(0, 0, 0, 0.6) !important;
}
.friendlylink {
  position: relative;
  border-radius: 0.5em;
  box-shadow: 0 2px 5px -1px rgba(9, 2, 4, 0.8);
  padding: 0.8em;
  margin-bottom: 1em;
  text-align: left;
  height: 100%;
}
.friendlylink_title {
  text-align: center;
  margin-bottom: 0.5em;
}
.friendlylink_content {
  padding-left: 1em;
  padding-right: 1em;
}
.friendlylink_content_link {
  margin-right: 1em;
}
.el-link.el-link--default:hover {
  color: black !important;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: black !important;
}
</style>
