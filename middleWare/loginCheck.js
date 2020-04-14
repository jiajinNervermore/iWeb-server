module.exports = (req, res, next) => {
  if (!req.session) {
    let output = {
      code: 599,
      msg: 'Server Err : session middleware requried'
    }
    res.send(output)
    return
  }

  if (!req.session.userInfo) {
    let output = {
      code: 499,
      msg: 'login required'
    }
    res.send(output)
    return
  }
  //如果客户端已经完成了登录
  req.uid = req.session.userInfo.uid
  next() //中间件检测之后放行，继续执行后续的中间件或路由
}