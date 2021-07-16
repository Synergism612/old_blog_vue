<template>
  <div>
    <el-backtop class="backtop">
      <el-tooltip effect="dark" content="回到顶部" placement="right">
        <i class="fas fa-arrow-up"></i>
      </el-tooltip>
    </el-backtop>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
.backtop {
  right: 3.5em !important;
  bottom: 3.5em !important;
  color: black !important;
  background-color: rgba(9, 2, 4, 0) !important;
  box-shadow: 0 2px 5px -1px rgba(9, 2, 4, 0.8);
}
.backtop_icon {
  padding: 10px !important;
}
</style>
