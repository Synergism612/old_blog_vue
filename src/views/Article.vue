<template>
  <div>
    <div class="background"></div>
    <Header></Header>
    <Backtop></Backtop>
    <div class="content">
      <el-container>
        <el-header class="header">
          <el-col :span="24">
            <transition
              appear
              appear-active-class="animate__animated animate__zoomIn"
            >
              <div class="breadcrumb">
                <el-breadcrumb separator=">">
                  <el-breadcrumb-item :to="{ path: '/blog/index' }">
                    首页
                  </el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/blog/category' }">
                    文章管理
                  </el-breadcrumb-item>
                  <el-breadcrumb-item>
                    {{ pageData.blog.title }}
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </transition>
          </el-col>
        </el-header>
        <el-main>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="16" :md="16" :span="16">
              <transition
                appear
                appear-active-class="animate__animated animate__zoomIn"
              >
                <div class="details">
                  <div class="details_title">
                    <b>{{ pageData.blog.title }}</b>
                  </div>
                  <div class="details_information">
                    <i class="el-icon-time">
                      {{ pageData.blog.time }}
                    </i>
                    <i class="el-icon-s-custom details_author">
                      {{ pageData.blog.author }}
                    </i>
                    <font-awesome-icon
                      :icon="['fas', 'folder']"
                      class="type_icon"
                    />
                    <span
                      class="type_content details_type"
                      @click="
                        searchTagAndType(
                          'type',
                          pageData.blog.typeList[0].content
                        )
                      "
                    >
                      <!-- 因为,子组件create之时, props里的数据还没有读取, 此时渲染引擎监测到数据的绑定, 
                    去寻找数据, 就会报错. 很快的组件初始化到了mount阶段,此时已经可以读取到props了,
                    所以通过绑定系统,把数据渲染出来了 -->
                      {{
                        pageData.blog.typeList
                          ? pageData.blog.typeList[0].content
                          : ""
                      }}
                    </span>
                    <font-awesome-icon
                      :icon="['fas', 'tag']"
                      class="tag_icon"
                    />
                    <span v-for="tag in pageData.blog.tagList" :key="tag.id">
                      <span
                        class="tag_name"
                        @click="searchTagAndType('tag', tag.name)"
                        >{{ tag.name }}</span
                      >
                    </span>
                  </div>
                  <el-divider></el-divider>
                  <div
                    class="markdown-body details_md"
                    v-html="pageData.blog.content"
                  ></div>
                </div>
              </transition>
            </el-col>
            <el-col :xs="0" :sm="8" :md="8" :span="8">
              <div class="and">
                <transition
                  appear
                  appear-active-class="animate__animated animate__zoomIn"
                >
                  <div class="search">
                    <div class="search_title">搜索文章</div>
                    <div class="search_content">
                      <el-input
                        v-model="searchContent"
                        placeholder="请输入搜索内容"
                        class="search_content_input"
                        @keyup.enter.native="search('search')"
                      ></el-input>
                      <font-awesome-icon
                        :icon="['fas', 'search']"
                        class="search_content_icon"
                        size="1x"
                        @click="search('search')"
                      />
                    </div>
                  </div>
                </transition>

                <transition
                  appear
                  appear-active-class="animate__animated animate__zoomIn"
                >
                  <div class="comment">
                    <div class="comment_title">评论本文</div>
                    <div class="comment_new">
                      <div class="comment_new_title">来说两句吧~</div>
                      <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="commentNew"
                        maxlength="100"
                        show-word-limit
                        class="comment_new_content"
                      ></el-input>
                      <div class="comment_new_link">
                        <el-link target="_blank" @click="newComment()"
                          >提交评论</el-link
                        >
                      </div>
                    </div>
                  </div>
                </transition>

                <transition
                  appear
                  appear-active-class="animate__animated animate__zoomIn"
                >
                  <div class="comment">
                    评论区
                    <div
                      v-for="comment in pageData.comments"
                      :key="comment.id"
                      class="comment_for"
                    >
                      <div class="comment_icon">
                        <el-avatar
                          :size="50"
                          :src="comment.authorIcon"
                        ></el-avatar>
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
import Header from "../components/Header";
import Footer from "../components/Footer";
import Backtop from "../components/Backtop";
import Model from "../model/articleModel";

import "github-markdown-css/github-markdown.css";

export default {
  
  components: { Header, Footer, Backtop },
  data() {
    return {
      commentNew: "",
      searchContent: "",
      comment_show: true,
      //封装数据
      pageData: {},
    };
  },
  methods: {
    detail() {
      this.comments = {};
      const _this = this;
      _this.axios
        .get("/blog/article/" + this.$router.currentRoute.params.id)
        .then(({ data }) => {
          // 解析md文件
          var MardownIt = require("markdown-it");
          var md = new MardownIt();
          var result = md.render(data.blogArticleDetail.content);
          this.pageData = new Model(data, result);
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
          search_content: search_content,
        },
      });
    },
    search(search_class) {
      this.$router.push({
        name: `Category`,
        params: {
          search_class: search_class,
          search_content: this.searchContent,
        },
      });
    },
    newComment() {
      if (this.$store.getters.getUser.phone) {
        if (this.commentNew != "" && this.commentNew != null) {
          const _this = this;
          _this.axios
            .post("add/comment", {
              userPhone: this.$store.getters.getUser.phone,
              content: this.commentNew,
              articleId: this.pageData.blog.id,
              time: new Date(),
            })
            .then((res) => {
              this.$notify({
                title: res.data,
                message: "您的评论已添加",
                type: "success",
                offset: 100,
              });
              this.commentNew = "";
              this.detail();
            })
            .catch((err) => {
              this.$notify({
                title: "操作失败",
                message: err.message,
                type: "warning",
                offset: 100,
              });
            });
        } else {
          this.$notify({
            title: "操作失败",
            message: "请填入内容",
            type: "warning",
            offset: 100,
          });
        }
      } else {
        this.$notify({
          title: "操作失败",
          message: "请先登录",
          type: "warning",
          offset: 100,
        });
      }
    },
  },
  created() {
    this.pageData = new Model();
    this.detail();
  },
};
</script>

<style scoped>
.details {
  position: relative;
  margin-bottom: 1em;
  border-radius: 0.5em;
  box-shadow: 0 2px 5px -1px rgba(9, 2, 4, 0.8);
  padding: 1em;
  background-color: rgba(38, 50, 56, 0);
  overflow-x: auto;
}
.details_title {
  font-size: 200%;
}
.details_author {
  margin-left: 0.5em;
  margin-right: 0.5em;
}
.details_type {
  margin-left: 0.5em;
  margin-right: 0.5em;
}
.details_md {
  text-align: start;
}
.markdown-body .highlight pre,
.markdown-body pre {
  margin-bottom: 1em;
  margin-top: 1em;
  border-radius: 0.5em;
  /* box-shadow: 0 2px 5px -1px rgba(9, 2, 4, 0.8); */
  padding: 1em;
  text-align: left;
  background-color: rgba(179, 178, 178, 0.148);
  overflow-x: auto;
}
.comment_new {
}
.comment_new_title {
  font-size: 120%;
  text-align: left;
}
.comment_new_content {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.el-textarea__inner {
  background-color: rgba(0, 0, 0, 0) !important;
  border: 1px solid rgba(96, 98, 102, 0.7) !important;
}
.el-input__count {
  background-color: rgba(0, 0, 0, 0) !important;
}
.comment_new_link {
  text-align: right;
}
</style>