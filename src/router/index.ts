import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
    meta: {
      title: '关于我们'
    }
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('@/views/Team.vue'),
    meta: {
      title: '团队介绍'
    }
  },
  {
    path: '/cases',
    name: 'cases',
    component: () => import('@/views/Cases.vue'),
    meta: {
      title: '客户案例'
    }
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/Services.vue'),
    meta: {
      title: '服务'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/Contact.vue'),
    meta: {
      title: '联系我们'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 门户网站` : '门户网站'
  next()
})

export default router
