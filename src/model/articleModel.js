export default function Model(data = {},result = null) {
  this.blog = data.blogArticleDetail || {content:""};
  this.blog.content = result || "";
  this.comments = data.blogDetailCommentList || {};
}