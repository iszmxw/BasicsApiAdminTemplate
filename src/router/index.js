import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* 路由模块使用 */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * 注释: 只有当route children.length大于等于1时，才会出现子菜单。
 * 详见: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果为 true, 项目不会显示在边栏中（默认值为false）
 * alwaysShow: true               如果为 true, 将始终显示根菜单
 *                                如果未设置AlwaysShow，则当项有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为no redirect，则不会在breadcrumb中重定向
 * name:'router-name'             名称由<keep alive>使用（必须设置！！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               侧边栏和面包屑中显示的名称（推荐集）
    icon: 'svg-name'             图标显示在侧边栏中
    noCache: true                如果设置为true，则不会缓存该页（默认值为false）
    affix: true                  如果设置为真，则标签将粘贴在“标签”视图中。
    breadcrumb: false            如果设置为false，该项将隐藏在breadcrumb中（默认值为true）
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径。
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基页
 * 所有角色都可以访问的路由组
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
},
{
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      noCache: true,
      affix: true,
      roles: ['admin'] // 可以在根导航中设置角色
    }
  }]
}
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [{
  path: '/system',
  component: Layout,
  redirect: '/system/page',
  alwaysShow: true, // 将始终显示根菜单
  name: 'System',
  meta: {
    title: 'system',
    icon: 'component',
    roles: ['admin'] // 可以在根导航中设置角色
  },
  children: [{ // 重置密码
    path: 'resetPassword',
    component: () => import('@/views/system/resetPassword'),
    name: 'resetPassword',
    meta: {
      title: 'resetPassword',
      roles: ['admin'] // 或者只能在子导航中设置角色
    }
  },
  {
    path: 'operationLog',
    component: () => import('@/views/system/operationLog'),
    name: 'operationLog',
    meta: {
      title: 'operationLog',
      roles: ['admin'] // 或者只能在子导航中设置角色
    }
  },
  {
    path: 'role',
    component: () => import('@/views/system/role'),
    name: 'role',
    meta: {
      title: 'role',
      roles: ['admin'] // 或者只能在子导航中设置角色
    }
  }
  ]
},
{
  path: '/merchant',
  component: Layout,
  redirect: '/merchant/page',
  alwaysShow: true, // 将始终显示根菜单
  name: 'merchant',
  meta: {
    title: 'merchant',
    icon: 'user'
  },
  children: [{
    path: 'merchant_add',
    component: () => import('@/views/merchant/merchant_add'),
    name: 'madd',
    meta: {
      title: 'madd',
      roles: ['admin'] // 或者只能在子导航中设置角色
    }
  },
  {
    path: 'merchant_list',
    component: () => import('@/views/merchant/merchant_list'),
    name: 'mlist',
    meta: {
      title: 'mlist',
      roles: ['admin'] // 或者只能在子导航中设置角色
    }
  },
  {
    path: 'store_list',
    component: () => import('@/views/merchant/store_list'),
    name: '门店列表',
    meta: {
      title: '门店列表',
      roles: ['admin'] // 或者只能在子导航中设置角色
    }
  },
  {
    path: 'store_site',
    component: () => import('@/views/merchant/store_site'),
    name: '门店设置',
    hidden: true,
    meta: {
      title: '门店设置',
      roles: ['admin'] // 或者只能在子导航中设置角色
    }
  },
  {
    path: 'devece/list',
    component: () => import('@/views/merchant/device/list'),
    name: 'device_list',
    meta: {
      title: 'device_list'
    }
  }
  ]
},
{ // 财务管理
  path: '/settlement',
  component: Layout,
  redirect: '/settlement/page',
  alwaysShow: true, // 将始终显示根菜单
  name: 'settlement',
  meta: {
    title: 'settlement',
    icon: 'money'
  },
  children: [{ // 商户结算列表
    path: 'company_applyList',
    component: () => import('@/views/settlement/company_applyList'),
    name: 'company_applyList',
    meta: {
      title: 'company_applyList'
    }
  },
  { // 商户审核记录
    path: 'company_toExamineLog',
    component: () => import('@/views/settlement/company_toExamineLog'),
    name: 'company_toExamineLog',
    meta: {
      title: 'company_toExamineLog'
    }
  }
  ]
},
{ // 消息管理
  path: '/message',
  component: Layout,
  redirect: '/message/page',
  alwaysShow: true, // 将始终显示根菜单
  name: 'message',
  meta: {
    title: 'message',
    icon: 'email',
    badge: 10
  },
  children: [{ // 合作消息列表
    path: 'coopreation_list',
    component: () => import('@/views/message/coopreation_list'),
    name: 'coopreation_list',
    meta: {
      title: 'coopreation_list',
      roles: ['admin'] // 或者只能在子导航中设置角色
    }
  },
  { // 客户反馈
    path: 'hifans_question',
    component: () => import('@/views/message/hifans_question'),
    name: 'hifans_question',
    meta: {
      title: 'hifans_question',
      roles: ['admin'] // 或者只能在子导航中设置角色
    }
  },
  { // 平台反馈
    path: 'suggest_list',
    component: () => import('@/views/message/suggest_list'),
    name: 'suggest_list',
    meta: {
      title: 'suggest_list',
      roles: ['admin'] // 或者只能在子导航中设置角色
    }
  }
  ]
},
/** 当路由图太长时，可以将其拆分为小模块。 **/
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
