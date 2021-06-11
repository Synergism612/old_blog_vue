export default function Model(data = {}) {
  this.blogs = data.articleList || {};
  this.total = data.total || 0;
  this.types = data.typeList || {};
  this.tags = data.tagList || {};
}