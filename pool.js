/*数据库连接池*/
const mysql = require('mysql')

let pool = mysql.createPool({
	host: 				'127.0.0.1',		//数据库服务器的域名
	port:				'3306',				//数据库服务器的监听端口
	user: 				'root',				//数据库服务器登录所用的管理员名
	password:			'',					//数据库服务器登录所用的管理员密码
	database:			'iweb',				//当前项目所用的数据库名
	connectionLimit:	10					//连接池中最多可以保存的连接数
})
//console.log(pool)	//输出pool无法验证数据库连接是否成功！
// pool.query('SELECT  1+2', (err, result)=>{
// 	if(err){
// 		throw err
// 	}
// 	console.log(result)
// })
module.exports = pool