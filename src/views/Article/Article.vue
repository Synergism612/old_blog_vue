<template>
  <div class="article_box">
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
                  <el-breadcrumb-item :to="{ path: '/api/category' }">
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
              <transition appear appear-active-class="animate__animated animate__zoomIn">
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
                    <i class="fas fa-folder"></i>
                    <span
                      class="type_content details_type"
                      @click="searchTagAndType('type', pageData.blog.typeList[0].content)"
                    >
                      {{ pageData.blog.typeList ? pageData.blog.typeList[0].content : '' }}
                    </span>
                    <i class="fas fa-tag"></i>
                    <span v-for="tag in pageData.blog.tagList" :key="tag.id">
                      <span class="tag_name" @click="searchTagAndType('tag', tag.name)">{{
                        tag.name
                      }}</span>
                    </span>
                  </div>
                  <el-divider></el-divider>
                  <div class="markdown-body details_md" v-html="pageData.blog.content"></div>
                </div>
              </transition>
            </el-col>
            <el-col :xs="0" :sm="8" :md="8" :span="8">
              <div class="and">
                <transition appear appear-active-class="animate__animated animate__zoomIn">
                  <div class="search">
                    <div class="search_title">搜索文章</div>
                    <div class="search_content">
                      <el-input
                        v-model="searchContent"
                        placeholder="请输入搜索内容"
                        class="search_content_input"
                        @keyup.enter.native="search('search')"
                      ></el-input>
                      <i class="fas fa-search"></i>
                    </div>
                  </div>
                </transition>

                <transition appear appear-active-class="animate__animated animate__zoomIn">
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
                        <el-link target="_blank" @click="newComment()">提交评论</el-link>
                      </div>
                    </div>
                  </div>
                </transition>

                <transition appear appear-active-class="animate__animated animate__zoomIn">
                  <div class="comment">
                    评论区
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
import Model from '../../model/articleModel';

import 'github-markdown-css/github-markdown.css';

export default {
  components: { Header, Footer, Backtop },
  data() {
    return {
      commentNew: '',
      searchContent: '',
      comment_show: true,
      //封装数据
      pageData: {}
    };
  },
  methods: {
    detail() {
      this.comments = {};
      const _this = this;
      _this.axios
        .get('/api/article/' + this.$router.currentRoute.params.id)
        .then(({ data }) => {
          // 解析md文件
          var MardownIt = require('markdown-it');
          var md = new MardownIt();
          var result = md.render(data.blogArticleDetail.content);
          this.pageData = new Model(data, result);
          this.lookNumber();
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
    },
    search(search_class) {
      this.$router.push({
        name: `Category`,
        params: {
          search_class: search_class,
          search_content: this.searchContent
        }
      });
    },
    newComment() {
      if (this.$store.getters.getUser.phone) {
        if (this.commentNew != '' && this.commentNew != null) {
          const _this = this;
          _this.axios
            .post('api/comment', {
              userPhone: this.$store.getters.getUser.phone,
              content: this.commentNew,
              articleId: this.pageData.blog.id,
              time: new Date()
            })
            .then((res) => {
              this.$notify({
                title: res.data,
                message: '您的评论已添加',
                type: 'success',
                offset: 100
              });
              this.commentNew = '';
              this.detail();
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
    },
    lookNumber() {
      const _this = this;
      _this.axios
        .patch('/api/article/' + this.pageData.blog.id + '/' + this.pageData.blog.viewsNumber)
        .then((res) => {
          res;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  created() {
    this.pageData = new Model();
    this.detail();
  }
};
</script>

<style lang='less' scoped>
@import url(./Article);
</style>
