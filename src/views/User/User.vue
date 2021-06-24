<template>
  <div class="user_box">
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
                  <el-breadcrumb-item> 关于 </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </transition>
          </el-col>
        </el-header>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="24"> 这是个人信息页 </el-col>
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
// import Model from '../model/aboutModel';

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
@import url(./User);
</style>
<style lang='less'>
</style>
