module.exports = {
  // 支持标准 HTTP
  'POST /api/login': (req,res)=>{
    const {username, password}=req.body.data;
    setTimeout(() => {
      if(username==='admin'&&password==='admin'){
        res.send({
          result: {
            message: 'success'
          }
        });
      }else{
        res.send({
          error: {
            message: '用户名或密码错误'
          },
        })
      }
    }, 1500);
    
  }
  
};