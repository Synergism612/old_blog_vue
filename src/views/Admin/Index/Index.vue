<template>
  <div class="index_box">
    <div>这里是后台首页</div>
  </div>
</template>

<script>
// import Header from '../../../components/User/Header';
// import Footer from '../../../components/User/Footer';
// import Backtop from '../../../components/User/Backtop';
// import Model from '../../../model/indexModel';

export default {
  components: {},
  data() {
    return {
      //封装数据
      pageData: {}
    };
  },
  methods: {
    index() {
      const _this = this;
      _this.axios
        .get('api/admin', {
          headers: {
            Authorization: sessionStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
          this.$router.push({
            name: `Index`
          });
        });
    }
  },
  created() {
    this.index();
  }
};
</script>

<style lang="less" scoped>
@import url(./Index);
</style>
<style lang="less">
// @import url(./IndexEL);
</style>
