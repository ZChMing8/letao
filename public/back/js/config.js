/**
 * Created by 赵春明 on 2018/4/14.
 */
require.config({
  //配置基础路径
  baseUrl: '/back/',
  //配置路径别名
  paths: {
    template: './lib/artTemplate/template-web',
    bootstrap: './lib/bootstrap/js/bootstrap',
    bootstrapPaginator: './lib/bootstrap-paginator/bootstrap-paginator',
    bootstrapValidator: './lib/bootstrap-validator/js/bootstrapValidator',
    echarts: './lib/echarts/echarts.min',
    jquery: './lib/jquery/jquery',
    jqueryFileupload: './lib/jquery-fileupload/jquery.fileupload',
    'jquery-ui/ui/widget': './lib/jquery-fileupload/jquery.ui.widget',
    nprogress: './lib/nprogress/nprogress',
    common: './js/common'
  },
  //配置依赖项
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    bootstrapPaginator: {
      deps: ['bootstrap']
    },
    bootstrapValidator: {
      deps: ['bootstrap']
    },
    jqueryFileupload: {
      deps: ['jquery','jquery-ui/ui/widget']
    },
    'jquery-ui/ui/widget': {
      deps: ['jquery']
    }
  }
})