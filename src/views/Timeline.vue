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
                  <el-breadcrumb-item> 点点滴滴 </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </transition>
          </el-col>
        </el-header>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="24">
              <transition
                appear
                appear-active-class="animate__animated animate__fadeInDown"
                enter-active-class="animate__animated animate__fadeInDown"
              >
                <div class="block timeline_content">
                  <div class="timeline_title">
                    <h1>时光轴 —— 记录生活点点滴滴</h1>
                  </div>
                  
                  <el-timeline>
                    <el-timeline-item
                      v-for="timeline in pageData.timelines"
                      :key="timeline.id"
                      :timestamp="timeline.time"
                      placement="top"
                    >
                      <el-card>
                        <h4>{{ timeline.content }}</h4>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </transition>
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
import Model from "../model/timelineModel";

export default {
  
  components: { Header, Footer, Backtop },
  data() {
    return {
      //封装数据
      pageData: {},
    };
  },
  methods: {
    timeline() {
      const _this = this;
      _this.axios
        .get("/blog/timeline")
        .then(({ data }) => {
          this.pageData = new Model(data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.pageData = new Model();
    this.timeline();
  },
};
</script>

<style scoped>
.timeline_title{
  margin: 2em;
}
.timeline_content{
  text-align: left;
}
</style>