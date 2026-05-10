<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="container-custom">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <RouterLink to="/" class="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
            门户网站
          </RouterLink>
        </div>
        
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-700 hover:text-primary-600 font-medium transition-colors relative group"
            active-class="text-primary-600"
          >
            {{ item.label }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
          </RouterLink>
        </div>
        
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="切换菜单"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
          </svg>
        </button>
      </div>
      
      <!-- 移动端菜单 -->
      <div
        v-show="mobileMenuOpen"
        class="md:hidden py-4 border-t border-gray-200"
      >
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="mobileMenuOpen = false"
          class="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
          active-class="text-primary-600"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const mobileMenuOpen = ref(false)

const navItems = [
  { path: '/', label: '首页' },
  { path: '/services', label: '服务' },
  { path: '/cases', label: '客户案例' },
  { path: '/about', label: '关于我们' },
  { path: '/team', label: '团队介绍' },
  { path: '/contact', label: '联系我们' }
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>
