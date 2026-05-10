<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    
    <main class="flex-1 py-12">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold mb-8 text-center">关于我们</h1>
          
          <div class="card mb-8">
            <h2 class="text-2xl font-semibold mb-4">公司简介</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              我们是一家专注于提供优质服务和解决方案的公司，致力于为客户创造价值。
              凭借多年的行业经验和专业团队，我们为客户提供全方位的服务支持。
            </p>
            <p class="text-gray-700 leading-relaxed">
              我们的使命是通过创新技术和专业服务，帮助客户实现业务目标，共同成长。
            </p>
          </div>

          <div class="card mb-8">
            <h2 class="text-2xl font-semibold mb-4">我们的价值观</h2>
            <ul class="space-y-3">
              <li class="flex items-start">
                <span class="text-primary-600 mr-3">✓</span>
                <span class="text-gray-700">客户至上：始终以客户需求为中心</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-600 mr-3">✓</span>
                <span class="text-gray-700">追求卓越：不断提升服务质量和专业水平</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-600 mr-3">✓</span>
                <span class="text-gray-700">团队协作：重视团队合作和沟通</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-600 mr-3">✓</span>
                <span class="text-gray-700">持续创新：保持技术和服务的前瞻性</span>
              </li>
            </ul>
          </div>

          <div class="card">
            <h2 class="text-2xl font-semibold mb-4">联系我们</h2>
            <p class="text-gray-700 mb-4">
              如果您有任何问题或需要帮助，欢迎随时与我们联系。
            </p>
            <RouterLink to="/contact" class="btn-primary inline-block">
              前往联系页面
            </RouterLink>
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
import { RouterLink } from 'vue-router'

const appStore = useAppStore()
</script>
