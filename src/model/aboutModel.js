export default function Model(data = {} ){
  this.aboutIndex = data.aboutIndex || ""
  this.aboutMe = data.aboutMe || ""
  this.messageList = data.messageList || {}
}
