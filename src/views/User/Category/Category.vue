<template>
  <div class="category_box">
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
                  <el-breadcrumb-item :to="{ path: '/api/index' }">
                    首页
                  </el-breadcrumb-item>
                  <el-breadcrumb-item> 文章管理 </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </transition>
          </el-col>
        </el-header>
        <el-main>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="16" :md="16" :span="16">
              <div class="blog">
                <div class="blogs" v-if="blog_show">
                  <div v-for="blog in pageData.blogs" :key="blog.id">
                    <transition
                      appear
                      appear-active-class="animate__animated animate__zoomIn"
                      enter-active-class="animate__animated animate__zoomIn"
                    >
                      <div class="article">
                        <router-link :to="{ path: '/user/Article/' + blog.id }">
                          <div class="cover">
                            <el-image
                              style="width: 200px; border-radius: 0.5em"
                              :src="blog.cover"
                            ></el-image>
                          </div>
                        </router-link>
                        <router-link :to="{ path: '/user/Article/' + blog.id }">
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
                            @click="typeSearch(blog.typeList[0].content)"
                            >{{ blog.typeList[0].content }}</span
                          >
                        </div>
                        <div class="tag">
                         <i class="fas fa-tag"></i>
                          <span v-for="tag in blog.tagList" :key="tag.id">
                            <span class="tag_name" @click="tagSearch(tag.name)">{{
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
              </div>
            </el-col>
            <el-col :xs="0" :sm="8" :md="8" :span="8">
              <div class="and">
                <transition appear appear-active-class="animate__animated animate__zoomIn">
                  <div class="search">
                    <div class="search_title">搜索</div>
                    <div class="search_content">
                      <el-input
                        v-model="search"
                        placeholder="请输入搜索内容"
                        class="search_content_input"
                        @keyup.enter.native="query()"
                      ></el-input>
                      <i class="fas fa-search"></i>
                    </div>
                  </div>
                </transition>

                <transition appear appear-active-class="animate__animated animate__zoomIn">
                  <div class="classify">
                    <div class="classify_title">分类导航</div>
                    <div class="classify_content">
                      <el-tag
                        color="rgba(9, 2, 4, 0)"
                        class="classify_content_tag"
                        v-for="type in pageData.types"
                        :key="type.id"
                        @click="typeSearch(type.content)"
                      >
                        {{ type.content }}
                      </el-tag>
                    </div>
                  </div>
                </transition>

                <transition appear appear-active-class="animate__animated animate__zoomIn">
                  <div class="tags">
                    <div class="tags_title">标签导航</div>
                    <div class="tags_content">
                      <el-tag
                        color="rgba(9, 2, 4, 0)"
                        class="tags_content_tag"
                        v-for="tag in pageData.tags"
                        :key="tag.id"
                        @click="tagSearch(tag.name)"
                      >
                        {{ tag.name }}
                      </el-tag>
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
import Header from '../../../components/User/Header';
import Footer from '../../../components/User/Footer';
import Backtop from '../../../components/User/Backtop';
import Model from '../../../model/categoryModel';

export default {
  components: { Header, Footer, Backtop },
  data() {
    return {
      blog_show: true,
      search: '',

      // 分页数据
      currentPage: 1,
      pageSize: 10,

      //封装数据
      pageData: {}
    };
  },
  methods: {
    query() {
      const _this = this;
      var searchContent = _this.search;
      this.blog_show = false;
      _this.axios
        .get('/api/search', {
          params: {
            searchContent: searchContent
          }
        })
        .then((res) => {
          if (res.data.searchArticleList.length == 0) {
            this.pageData.blogs = null;
            this.pageData.total = 0;
            this.$notify({
              title: '搜索失败',
              message: '没有搜索到关于“' + this.search + '”的文章',
              type: 'warning',
              offset: 100
            });
          } else {
            this.pageData.blogs = res.data.searchArticleList;
            this.pageData.total = res.data.total;
            if (this.search == '') {
              this.$notify({
                title: '搜索成功',
                message: '为您搜索全部文章' + this.pageData.total + '篇',
                type: 'success',
                offset: 100
              });
            } else {
              // console.log(res);
              this.$notify({
                title: '搜索成功',
                message: '为您搜索到有关“' + this.search + '”的文章' + this.pageData.total + '篇',
                type: 'success',
                offset: 100
              });
            }
          }
          this.blog_show = true;
        })
        .catch((err) => {
          err;
          this.pageData.blogs = null;
          this.$notify({
            title: '搜索失败',
            message: '没有搜索到关于“' + this.search + '”的文章',
            type: 'warning',
            offset: 100
          });
        });
    },

    typeSearch(typeContent) {
      this.blog_show = false;
      const _this = this;
      _this.axios
        .get('/api/search/type', {
          params: {
            typeContent: typeContent
          }
        })
        .then((res) => {
          this.pageData.blogs = res.data.searchArticleList;
          this.pageData.total = res.data.total;
          this.$notify({
            title: '搜索成功',
            message: '为您搜索到分类为“' + typeContent + '”的文章' + this.pageData.total + '篇',
            type: 'success',
            offset: 100
          });
          this.blog_show = true;
        })
        .catch((err) => {
          err;
          this.$notify({
            title: '警告',
            message: '没有相关',
            type: 'warning'
          });
        });
    },

    tagSearch(tagName) {
      this.blog_show = false;
      const _this = this;
      _this.axios
        .get('/api/search/tag', {
          params: {
            tagName: tagName
          }
        })
        .then((res) => {
          this.pageData.blogs = res.data.searchArticleList;
          this.pageData.total = res.data.total;
          this.$notify({
            title: '搜索成功',
            message: '为您搜索到标签为“' + tagName + '”的文章' + this.pageData.total + '篇',
            type: 'success',
            offset: 100
          });
          this.blog_show = true;
        })
        .catch((err) => {
          err;
          this.$notify({
            title: '警告',
            message: '没有相关',
            type: 'warning'
          });
        });
    },

    page(currentPage, pageSize) {
      const _this = this;
      _this.axios
        .get('/api/category', {
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
    }
  },
  created() {
    this.blog_show = false;
    if (
      this.$router.currentRoute.params.search_class != null &&
      this.$router.currentRoute.params.search_class != '' &&
      this.$router.currentRoute.params.search_content != null &&
      this.$router.currentRoute.params.search_content != ''
    ) {
      var search_class = this.$router.currentRoute.params.search_class;
      var search_content = this.$router.currentRoute.params.search_content;
      if (search_class == 'type') {
        this.page(1, this.pageSize);
        this.typeSearch(search_content);
        this.blog_show = true;
      }
      if (search_class == 'tag') {
        this.page(1, this.pageSize);
        this.tagSearch(search_content);
        this.blog_show = true;
      }
      if (search_class == 'search') {
        this.page(1, this.pageSize);
        this.search = search_content;
        this.query();
        this.blog_show = true;
      }
    } else {
      this.pageData.blogs = null;
      this.page(1, this.pageSize);
      this.blog_show = true;
    }
  }
};
</script>

<style lang='less' scoped>
@import url(./Category);
</style>
