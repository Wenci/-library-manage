

module.exports = {
  // 夹在cookie中发回的sessionid名
  name: 'sid',
  // 用它来对session cookie签名，防止篡改，自己随便填写的字符串
  secret: 'wearefamily',
  // 强制保存session即使它并没有变化
  resave: true,
  // 强制将未初始化的session存储。当新建了一个session且未设定属性或值时，它就处于未初始化状态。在设定一个cookie前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。
  saveUninitialized: true,
  
  rolling: true,
  // 设置cookie属性,一定要启用httpOnly。当你的连接为https时则需将secure设为true
  cookie: { path: '/', httpOnly: true, secure: false,maxAge: 10*60*1000},
};