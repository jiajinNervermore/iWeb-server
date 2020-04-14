/*处理路由地址中所有以/favorite开头的请求*/
const express = require('express')
const pool = require('../pool.js')
router = express.Router()
module.exports = router
router.post('/add',(req,res,next)=>{
	let fTime = new Date().getTime();
	let uid = req.uid
	let cid = req.body.cid
	if(!cid){
		let output = {
			code:499,
			msg:'cid required'
		}
		res.send(output)
		return
	}
	let sql1 = 'select fid from favorite where userId=? and courseId=?';
	pool.query(sql1,[uid,cid],(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result.length == 0){
			let sql2 = 'insert into favorite (fid,userId,courseId,fTime) values(null,?,?,?)' ;
			pool.query(sql2,[uid,cid,fTime],(err,result)=>{
				if(err){
					next(err)
					return
				}
				let output = {
					code:200,
					msg:'add succ'
				}
				res.send(output)
				return
			})
		}else{
			let sql3 = "update favorite set fTime=?";
			pool.query(sql3,fTime,(err,result)=>{
				if(err){
					next(err)
					return
				}
				if(result.changedRows>0){
					let output = {
						code:201,
						msg:'update succ'
					}
					res.send(output)
				}
			})
		}
	}) 
})
router.get('/list',(req,res,next)=>{
	let uid = req.uid;
	// 跨表查询
	let sql = 'select title,pic,price,courseId,fid,fTime from favorite AS f,course AS c where c.cid=f.courseId and f.userId=?';
	pool.query(sql,uid,(err,result)=>{
		if(err){
			next(err)
			return 
		}
		res.send(result)
	})
})