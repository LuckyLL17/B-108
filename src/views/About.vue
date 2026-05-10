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

          <!-- 团队和案例快速入口 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="card group">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 class="text-xl font-semibold">团队介绍</h2>
              </div>
              <p class="text-gray-600 mb-4">了解我们充满激情和专业素养的团队成员，每一位都在各自领域深耕多年。</p>
              <RouterLink to="/team" class="text-primary-600 font-medium group-hover:text-primary-700 inline-flex items-center transition-colors">
                查看团队
                <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </RouterLink>
            </div>

            <div class="card group">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 class="text-xl font-semibold">客户案例</h2>
              </div>
              <p class="text-gray-600 mb-4">查看我们为众多行业客户打造的优质解决方案和成功项目案例。</p>
              <RouterLink to="/cases" class="text-primary-600 font-medium group-hover:text-primary-700 inline-flex items-center transition-colors">
                查看案例
                <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </RouterLink>
            </div>
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
