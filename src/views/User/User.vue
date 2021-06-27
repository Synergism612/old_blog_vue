<template>
  <div class="user_box">
    <div class="background"></div>
    <Header></Header>
    <Backtop></Backtop>
    <div class="content">
      <el-container>  
        这里写啥啊
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