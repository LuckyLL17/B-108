<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    
    <main class="flex-1 py-12">
      <div class="container-custom">
        <h1 class="text-4xl font-bold mb-12 text-center">我们的服务</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="card"
          >
            <div class="flex items-start mb-4">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">{{ service.icon }}</span>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-semibold mb-2">{{ service.title }}</h2>
                <p class="text-gray-600 mb-4">{{ service.description }}</p>
                <ul class="space-y-2">
                  <li
                    v-for="(feature, idx) in service.features"
                    :key="idx"
                    class="flex items-start text-sm text-gray-700"
                  >
                    <span class="text-primary-600 mr-2">•</span>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
    
    <LoadingSpinner :loading="appStore.loading" />
    <ErrorMessage :error="appStore.error" @close="appStore.clearError" />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const services = [
  {
    icon: '💻',
    title: 'Web 开发',
    description: '专业的网站和应用开发服务',
    features: [
      '响应式设计',
      '现代化技术栈',
      '性能优化',
      'SEO 优化'
    ]
  },
  {
    icon: '📱',
    title: '移动应用',
    description: 'iOS 和 Android 应用开发',
    features: [
      '原生应用开发',
      '跨平台解决方案',
      '应用商店发布',
      '持续维护更新'
    ]
  },
  {
    icon: '☁️',
    title: '云服务',
    description: '云端部署和运维服务',
    features: [
      '云服务器部署',
      '容器化方案',
      '自动化运维',
      '监控和告警'
    ]
  },
  {
    icon: '🎨',
    title: 'UI/UX 设计',
    description: '现代化的用户界面设计',
    features: [
      '用户体验设计',
      '视觉设计',
      '交互原型',
      '设计规范制定'
    ]
  }
]
</script>
