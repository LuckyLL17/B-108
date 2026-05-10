<template>
  <footer class="bg-gray-900 text-gray-300 mt-auto">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-white text-lg font-bold mb-4">门户网站</h3>
          <p class="text-sm">
            提供优质的服务和解决方案，致力于为客户创造价值。
          </p>
        </div>
        
        <div>
          <h4 class="text-white font-semibold mb-4">快速链接</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <RouterLink to="/" class="hover:text-white transition-colors">首页</RouterLink>
            </li>
            <li>
              <RouterLink to="/services" class="hover:text-white transition-colors">服务</RouterLink>
            </li>
            <li>
              <RouterLink to="/cases" class="hover:text-white transition-colors">客户案例</RouterLink>
            </li>
            <li>
              <RouterLink to="/about" class="hover:text-white transition-colors">关于我们</RouterLink>
            </li>
            <li>
              <RouterLink to="/team" class="hover:text-white transition-colors">团队介绍</RouterLink>
            </li>
            <li>
              <RouterLink to="/contact" class="hover:text-white transition-colors">联系我们</RouterLink>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-white font-semibold mb-4">联系方式</h4>
          <ul class="space-y-2 text-sm">
            <li>邮箱: contact@example.com</li>
            <li>电话: +86 123 4567 8900</li>
            <li>地址: 中国北京市</li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-white font-semibold mb-4">关注我们</h4>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
              <span class="text-sm">微</span>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
              <span class="text-sm">微</span>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
              <span class="text-sm">抖</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
        <p>&copy; {{ currentYear }} 门户网站. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const currentYear = computed(() => new Date().getFullYear())
</script>
