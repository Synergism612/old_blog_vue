<template>
  <div class="archives_box">
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
                  <el-breadcrumb-item> 归档 </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </transition>
          </el-col>
        </el-header>
        <el-main>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="16" :md="16" :span="16">
              <div class="archives_title">文章列表</div>
              <div class="block">
                <transition
                  appear
                  appear-active-class="animate__animated animate__fadeInDown"
                  enter-active-class="animate__animated animate__fadeInDown"
                >
                  <div class="archives_left" v-if="blogs_show">
                    <el-timeline>
                      <el-timeline-item
                        v-for="blog in pageData.blogs"
                        :key="blog.id"
                        :timestamp="blog.time"
                        placement="top"
                        class="archives_timeline"
                      >
                        <el-card>
                          <router-link :to="{ path: '/user/Article/' + blog.id }">
                            <div class="archives_blog_title">
                              <h1>{{ blog.title }}</h1>
                            </div>
                          </router-link>
                          <span
                            ><p class="archives_blog_summarize">
                              {{ blog.summarize }}
                            </p></span
                          >
                        </el-card>
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                </transition>
              </div>
            </el-col>
            <el-col :xs="0" :sm="8" :md="8" :span="8">
              <div class="archives_right">
                <div class="archives_title">时间列表</div>
                <el-timeline :reverse="true">
                  <el-timeline-item v-for="times in pageData.timesList" :key="times.id">
                      <el-link type="info" target="_blank" @click="archivesTimes(times)">{{ times }}</el-link>
                  </el-timeline-item>
                </el-timeline>
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
import Model from '../../../model/archivesModel';

export default {
  components: { Header, Footer, Backtop },
  data() {
    return {
      blogs_show: true,
      //封装数据
      pageData: {}
    };
  },
  methods: {
    archivesBlogs() {
      this.blogs_show = false;
      this.pageData = new Model();
      const _this = this;
      _this.axios
        .get('/api/archives')
        .then(({ data }) => {
          this.pageData = new Model(data);
          this.blogs_show = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    archivesTimes(time) {
      this.blogs_show = false;
      this.pageData.blogs = null;
      const _this = this;
      _this.axios
        .get('/api/archives')
        .then(({ data }) => {
          this.pageData = new Model(data, this.pageData.timesList.indexOf(time));
          this.$notify({
            title: '搜索成功',
            message: '为您检索时间为“' + time + '”的文章' + this.pageData.total + '篇',
            type: 'success',
            offset: 100
          });
          this.blogs_show = true;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  created() {
    this.pageData = new Model();
    this.archivesBlogs();
  }
};
</script>

<style lang='less' scoped>
@import url(./Archives);
</style>
