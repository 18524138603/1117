module.exports = {
  // 应用配置
  app: {
    name: 'Portfolio Blog API',
    version: '1.0.0'
  },
  
  // JWT配置
  jwt: {
    expiresIn: '30d',
    algorithm: 'HS256'
  },
  
  // 密码配置
  password: {
    saltRounds: 10
  }
};