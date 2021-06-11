export default function Model(data = {},digit = 0) {
  this.blogsList = data.archiveArticleList || {};
  this.timesList = data.dateTimes || {};
  this.digit = digit;
  this.blogs = this.blogsList ? this.blogsList[this.digit] : {};
  this.total = this.blogs? this.blogs.length : 0;
}