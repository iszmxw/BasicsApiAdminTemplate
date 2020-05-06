import Mock from 'mockjs'
import { deepClone } from '../../src/utils/index.js'
import { asyncRoutes, constantRoutes } from './routes.js'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: '1',
    name: 'admin',
    description: '超级管理员。有权查看所有页面。',
    routes: routes
  },
  {
    key: '2',
    name: 'editor',
    description: '普通编辑器。可以查看除权限页之外的所有页',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: '3',
    name: 'visitor',
    description: '只是个访客。只能查看主页和文档页',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

const merchant = [
  {
    key: '1',
    name: '追梦小窝',
    username: 'admin',
    role: '超级管理员',
    mobile: 18872849065,
    status: 1,
    created_at: '2019-04-25'
  },
  {
    key: '2',
    name: '布朗熊',
    username: 'bulangxiong',
    role: '合作商家',
    mobile: 18872849065,
    status: -1,
    created_at: '2019-04-25'
  },
  {
    key: '3',
    name: '布朗熊',
    username: 'bulangxiong',
    role: '合作商家',
    mobile: 18872849065,
    status: 1,
    created_at: '2019-04-25'
  },
  {
    key: '4',
    name: '布朗熊',
    username: 'bulangxiong',
    role: '合作商家',
    mobile: 18872849065,
    status: -1,
    created_at: '2019-04-25'
  }
]

export default [
  // mock get all routes form server
  {
    url: '/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },
  {
    url: '/merchant',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: merchant
      }
    }
  },

  // add role
  {
    url: '/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
