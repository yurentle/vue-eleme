// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8001,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        // 主题推荐
      '/v2/index_entry': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
        // 百度地图api
      '/geocoder/v2': {
        target: 'http://api.map.baidu.com/',
        changeOrigin: true
      },
      // 热门搜索
      '/shopping/v3/hot_search_words': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      // 对于某一个店面获取数据,可能包含其他链接
      '/shopping': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      // 当前位置
      '/v2/pois': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      }
    },
    cssSourceMap: false
  }
}
