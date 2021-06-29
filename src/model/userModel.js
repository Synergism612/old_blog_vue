export default function Model(data = {}) {
  this.name = data.name || ""
  this.phone = data.phone || ""
  this.sex = data.sex || ""
  switch (data.sex) {
    case 0:
      this.sex = "女"
      break;
    case 1:
      this.sex = "男"
      break;
    default:
      this.sex = "不设置"
      break;
  }
  this.email = data.email || ""
  this.intro = data.intro || ""
  this.birthday = data.birthday || ""
}