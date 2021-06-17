<template>
  <div>
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
import Header from '../components/Header';
import Footer from '../components/Footer';
import Backtop from '../components/Backtop';
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

<style scoped>
.about {
  margin: auto;
  border-radius: 0.5em;
  box-shadow: 0 2px 5px -1px rgba(9, 2, 4, 0.8);
  padding: 1em;
  text-align: center;
}
.about_title {
  text-align: center;
}
.about_title {
  margin-top: 0.3em;
  margin-bottom: 0.3em;
  font-size: 120%;
}
.about_icon {
  margin-left: 0.25em;
  margin-right: 0.25em;
}
.about_icon:hover {
  cursor: pointer;
}
.el-divider__text {
  background-color: rgba(9, 2, 4, 0) !important;
}
.about_synopsis {
  width: 70%;
  margin: auto;
}
.about_content {
  width: 90%;
  margin: 1em auto;
}
.message_new_link {
  text-align: right;
  margin-top: 0.5em;
  padding-right: 1em;
}
.message_content {
  /* background-color: rgba(12, 230, 238, 0.2); */
  background-color: rgba(192, 192, 192, 0.3);
  padding: 5px 8px;
  display: inline-block;
  border-radius: 4px;
  position: relative;
  margin-left: 0.5em;
  width: 92%;
  min-height: 3em;
  box-shadow: 2px 2px 3px -2px rgba(9, 2, 4, 0.8);
}
.message_content span::after {
  content: '';
  border: 8px solid #ffffff00;
  border-right: 8px solid rgba(192, 192, 192, 0.3);
  position: absolute;
  top: 6px;
  left: -16px;
}
.message_icon {
  float: left;
}
.message_name {
  position: absolute;
  margin-top: 4.2em;
  font-size: 80%;
  width: 4em;
}
.message_for {
  padding-top: 0.8em;
  text-align: left;
}
.message_content_content {
  text-align: left;
  padding-top: 0.1em;
  padding-left: 0.6em;
  word-wrap: break-word;
}
.message_content_article {
  text-align: right;
  font-size: 50%;
}
.message_content_time {
  text-align: right;
  font-size: 50%;
}
.message_line {
  margin-top: 1em !important;
  margin-bottom: 0.5em !important;
}
</style>
<style>
.el-tabs__item.is-active {
  color: black !important;
}
.el-tabs__item:hover {
  color: black !important;
}
.el-tabs__active-bar {
  background-color: black !important;
}
</style>
