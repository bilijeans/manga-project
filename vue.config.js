const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/moyuComic' : '/',
  devServer:{
    //http://androidapi.junshishu.com/book/DefaultNewTwo.aspx
    proxy:{
      '/book':{
        target:'http://androidapi.junshishu.com',
        changeOrigin:true
      }
    }
  }
})
