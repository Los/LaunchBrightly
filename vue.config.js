const {defineConfig} = require('@vue/cli-service')
process.env.VUE_APP_BASEURL = 'https://content.launchbrightly.com/lbdemo/'

module.exports = defineConfig({
  transpileDependencies: true
})
