<template>
  <div class="resource_box">
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
                  <el-breadcrumb-item> 资源分享 </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </transition>
          </el-col>
        </el-header>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="resource_title">
                <h1>暂时没有要分享的</h1>
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
// import Model from "../model/timelineModel";

export default {
  components: { Header, Footer, Backtop },
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style lang='less' scoped>
@import url(./Resource);
</style>
