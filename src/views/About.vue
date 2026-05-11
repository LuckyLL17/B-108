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

          <div class="card mb-8">
            <h2 class="text-2xl font-semibold mb-4">联系我们</h2>
            <p class="text-gray-700 mb-4">
              如果您有任何问题或需要帮助，欢迎随时与我们联系。
            </p>
            <RouterLink to="/contact" class="btn-primary inline-block">
              前往联系页面
            </RouterLink>
          </div>

          <div class="card">
            <h2 class="text-2xl font-semibold mb-6 text-center">我们的团队</h2>
            <p class="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
              我们拥有一支经验丰富、充满激情的专业团队，致力于为客户提供最优质的服务和解决方案。
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="member in teamMembers"
                :key="member.id"
                class="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition-shadow"
              >
                <div class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img
                    :src="member.avatar"
                    :alt="member.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-1">{{ member.name }}</h3>
                <p class="text-primary-600 font-medium mb-3">{{ member.position }}</p>
                <p class="text-gray-600 text-sm leading-relaxed">{{ member.bio }}</p>
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
import { RouterLink } from 'vue-router'

const appStore = useAppStore()

interface TeamMember {
  id: number
  name: string
  position: string
  avatar: string
  bio: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: '张伟',
    position: 'CEO & 创始人',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20business%20man%20portrait%20headshot%20formal&image_size=square_hd',
    bio: '拥有15年行业经验，曾任职于多家知名科技公司，致力于为客户创造价值。'
  },
  {
    id: 2,
    name: '李娜',
    position: '技术总监',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20woman%20tech%20leader%20portrait%20headshot&image_size=square_hd',
    bio: '资深软件工程师，专注于云计算和大数据领域，带领团队完成多个重要项目。'
  },
  {
    id: 3,
    name: '王强',
    position: '产品经理',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20product%20manager%20portrait%20headshot%20business&image_size=square_hd',
    bio: '10年产品设计经验，善于深入理解用户需求，打造优秀的产品体验。'
  },
  {
    id: 4,
    name: '刘芳',
    position: '设计总监',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20female%20designer%20creative%20portrait&image_size=square_hd',
    bio: '获奖无数的设计师，擅长品牌设计和用户界面设计，让每个作品都充满创意。'
  },
  {
    id: 5,
    name: '陈明',
    position: '市场总监',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20marketing%20director%20business%20portrait&image_size=square_hd',
    bio: '数字营销专家，帮助众多企业实现品牌增长，拥有丰富的市场策略经验。'
  },
  {
    id: 6,
    name: '赵丽',
    position: '客户经理',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20customer%20service%20manager%20portrait&image_size=square_hd',
    bio: '以客户为中心，始终保持热情和专业，确保每个客户都能获得最佳服务体验。'
  }
]
</script>
