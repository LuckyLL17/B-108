<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-1 py-12">
      <div class="container-custom">
        <div class="max-w-6xl mx-auto">
          <!-- 页面标题 -->
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold mb-4">我们的团队</h1>
            <p class="text-gray-600 text-lg">认识我们优秀的团队成员</p>
          </div>

          <!-- 团队成员列表 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- 遍历团队成员数据 -->
            <div
              v-for="member in teamMembers"
              :key="member.id"
              class="card text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <!-- 成员头像 -->
              <div class="mb-4">
                <img
                  :src="member.avatar"
                  :alt="member.name"
                  class="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary-100"
                />
              </div>

              <!-- 成员信息 -->
              <h3 class="text-xl font-bold mb-1">{{ member.name }}</h3>
              <p class="text-primary-600 font-medium mb-3">{{ member.position }}</p>
              <p class="text-gray-600 text-sm leading-relaxed">{{ member.bio }}</p>

              <!-- 社交链接（可选） -->
              <div class="mt-4 flex justify-center space-x-3" v-if="member.socials">
                <a
                  v-for="social in member.socials"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-primary-600 transition-colors"
                  :title="social.name"
                >
                  {{ social.icon }}
                </a>
              </div>
            </div>
          </div>

          <!-- 返回关于我们页面 -->
          <div class="text-center mt-12">
            <RouterLink to="/about" class="btn-secondary inline-block">
              ← 返回关于我们
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
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useAppStore } from '@/stores/app'
import { RouterLink } from 'vue-router'

// 初始化 Pinia store
const appStore = useAppStore()

// 定义团队成员类型接口
interface TeamMember {
  id: number
  name: string
  position: string
  avatar: string
  bio: string
  socials?: { name: string; url: string; icon: string }[]
}

// 团队成员数据（示例数据，可根据实际情况修改）
const teamMembers = ref<TeamMember[]>([
  {
    id: 1,
    name: '张明',
    position: '创始人 & CEO',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    bio: '拥有15年行业经验，曾在多家知名科技公司担任高级管理职务。致力于带领团队为客户创造卓越价值。',
    socials: [
      { name: 'LinkedIn', url: '#', icon: 'in' },
      { name: 'Email', url: 'mailto:zhangming@example.com', icon: '✉' }
    ]
  },
  {
    id: 2,
    name: '李华',
    position: '技术总监',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    bio: '全栈开发专家，精通前后端技术栈。主导过多个大型项目的架构设计与开发工作。',
    socials: [
      { name: 'GitHub', url: '#', icon: 'GH' },
      { name: 'Email', url: 'mailto:lihua@example.com', icon: '✉' }
    ]
  },
  {
    id: 3,
    name: '王芳',
    position: '设计总监',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    bio: '资深UI/UX设计师，拥有敏锐的设计洞察力。擅长将复杂的业务需求转化为优雅的用户体验。',
    socials: [
      { name: 'Dribbble', url: '#', icon: 'Dr' },
      { name: 'Email', url: 'mailto:wangfang@example.com', icon: '✉' }
    ]
  },
  {
    id: 4,
    name: '陈强',
    position: '产品经理',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    bio: '优秀的产品思维，善于分析用户需求和市场趋势。成功打造过多款用户喜爱的产品。',
    socials: [
      { name: 'LinkedIn', url: '#', icon: 'in' },
      { name: 'Email', url: 'mailto:chenqiang@example.com', icon: '✉' }
    ]
  },
  {
    id: 5,
    name: '刘洋',
    position: '前端开发工程师',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face',
    bio: '热爱技术，专注于前端领域。精通Vue、React等主流框架，追求极致的用户体验和代码质量。',
    socials: [
      { name: 'GitHub', url: '#', icon: 'GH' },
      { name: 'Email', url: 'mailto:liuyang@example.com', icon: '✉' }
    ]
  },
  {
    id: 6,
    name: '赵敏',
    position: '市场经理',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
    bio: '资深市场营销专家，熟悉各类推广渠道。擅长制定和执行高效的市场营销策略。',
    socials: [
      { name: 'LinkedIn', url: '#', icon: 'in' },
      { name: 'Email', url: 'mailto:zhaomin@example.com', icon: '✉' }
    ]
  }
])
</script>
