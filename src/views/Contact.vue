<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    
    <main class="flex-1 py-12">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold mb-12 text-center">联系我们</h1>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="card">
              <h2 class="text-2xl font-semibold mb-4">联系方式</h2>
              <div class="space-y-4">
                <div class="flex items-start">
                  <span class="text-primary-600 mr-3 text-xl">📧</span>
                  <div>
                    <p class="font-medium">邮箱</p>
                    <p class="text-gray-600">contact@example.com</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <span class="text-primary-600 mr-3 text-xl">📞</span>
                  <div>
                    <p class="font-medium">电话</p>
                    <p class="text-gray-600">+86 123 4567 8900</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <span class="text-primary-600 mr-3 text-xl">📍</span>
                  <div>
                    <p class="font-medium">地址</p>
                    <p class="text-gray-600">中国北京市</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <h2 class="text-2xl font-semibold mb-4">工作时间</h2>
              <div class="space-y-2 text-gray-700">
                <p>周一至周五: 9:00 - 18:00</p>
                <p>周六: 10:00 - 16:00</p>
                <p>周日: 休息</p>
              </div>
            </div>
          </div>

          <div class="card">
            <h2 class="text-2xl font-semibold mb-6">发送消息</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  姓名 *
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="请输入您的姓名"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  邮箱 *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="请输入您的邮箱"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  消息 *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="6"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="请输入您的消息"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="submitting"
                class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ submitting ? '发送中...' : '发送消息' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>

    <Footer />
    
    <LoadingSpinner :loading="appStore.loading || submitting" />
    <ErrorMessage :error="appStore.error" @close="appStore.clearError" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const submitting = ref(false)

const form = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = async () => {
  submitting.value = true
  try {
    // 这里可以调用 API 发送消息
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟 API 调用
    alert('消息发送成功！我们会尽快回复您。')
    form.value = { name: '', email: '', message: '' }
  } catch (error) {
    appStore.setError('发送失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}
</script>
