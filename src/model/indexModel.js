export default function Model(data = {}) {
  this.blogs = data.articleList || {};
  this.total = data.total || 0;
  this.comments = data.commentList || {};
  this.aboutme =data.aboutmeList ? data.aboutmeList[0] : {};
  this.versions = data.versionList || {};
  this.aboutIndex = data.aboutIndexList || {};
  this.friendlylinks = data.friendlylinkList || {};
}