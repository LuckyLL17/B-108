<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    
    <main class="flex-1">
      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div class="container-custom">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              欢迎来到门户网站
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-primary-100">
              提供优质的服务和解决方案，致力于为客户创造价值
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <RouterLink to="/services" class="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                了解服务
              </RouterLink>
              <RouterLink to="/contact" class="btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-primary-600">
                联系我们
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20">
        <div class="container-custom">
          <h2 class="text-4xl font-bold text-center mb-12">核心优势</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="card text-center group"
            >
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors">
                <span class="text-2xl">{{ feature.icon }}</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">{{ feature.title }}</h3>
              <p class="text-gray-600">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Preview -->
      <section class="py-20 bg-gray-50">
        <div class="container-custom">
          <h2 class="text-4xl font-bold text-center mb-12">我们的服务</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="(service, index) in services"
              :key="index"
              class="card hover:scale-105 cursor-pointer"
            >
              <div class="h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg mb-4 flex items-center justify-center">
                <span class="text-4xl text-white">{{ service.icon }}</span>
              </div>
              <h3 class="text-lg font-semibold mb-2">{{ service.title }}</h3>
              <p class="text-gray-600 text-sm">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
    
    <!-- Global Loading & Error -->
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
import { RouterLink } from 'vue-router'

const appStore = useAppStore()

const features = [
  {
    icon: '🚀',
    title: '快速高效',
    description: '采用最新技术栈，确保项目快速交付和高效运行'
  },
  {
    icon: '🛡️',
    title: '安全可靠',
    description: '严格的安全标准和可靠的基础设施保障'
  },
  {
    icon: '💡',
    title: '创新理念',
    description: '持续创新，为客户提供前沿的解决方案'
  }
]

const services = [
  {
    icon: '💻',
    title: 'Web 开发',
    description: '专业的网站和应用开发服务'
  },
  {
    icon: '📱',
    title: '移动应用',
    description: 'iOS 和 Android 应用开发'
  },
  {
    icon: '☁️',
    title: '云服务',
    description: '云端部署和运维服务'
  },
  {
    icon: '🎨',
    title: 'UI/UX 设计',
    description: '现代化的用户界面设计'
  }
]
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>
