const { validationResult } = require('express-validator');

// 验证请求数据的中间件
const validateRequest = (validations) => {
  return async (req, res, next) => {
    // 运行所有验证
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }
    
    // 检查验证错误
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    next();
  };
};