<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-1 py-12">
      <div class="container-custom">
        <div class="max-w-6xl mx-auto">
          <!-- 返回按钮 -->
          <button
            @click="goBack"
            class="inline-flex items-center text-gray-600 hover:text-primary-600 font-medium transition-colors mb-6 group"
          >
            <svg class="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            返回上一页
          </button>

          <!-- 页面标题 -->
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold mb-4">团队介绍</h1>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">
              我们拥有一支充满激情和专业素养的团队，每一位成员都在各自的领域深耕多年，致力于为客户提供最优质的服务。
            </p>
          </div>

          <!-- 核心团队区域 -->
          <section class="mb-16">
            <h2 class="text-2xl font-semibold mb-8 text-center">核心成员</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                v-for="member in coreMembers"
                :key="member.id"
                class="card text-center group cursor-pointer"
                @click="openMemberDetail(member)"
              >
                <!-- 成员头像 -->
                <div class="relative w-32 h-32 mx-auto mb-5 overflow-hidden rounded-full">
                  <img
                    :src="member.avatar"
                    :alt="member.name"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <!-- 悬浮遮罩 -->
                  <div class="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/30 transition-all duration-300 rounded-full flex items-center justify-center">
                    <span class="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">查看详情</span>
                  </div>
                </div>
                <!-- 成员信息 -->
                <h3 class="text-xl font-semibold mb-1">{{ member.name }}</h3>
                <p class="text-primary-600 text-sm font-medium mb-3">{{ member.position }}</p>
                <p class="text-gray-600 text-sm leading-relaxed line-clamp-3">{{ member.bio }}</p>
              </div>
            </div>
          </section>

          <!-- 团队风采区域 -->
          <section class="mb-16">
            <h2 class="text-2xl font-semibold mb-8 text-center">团队风采</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                v-for="member in teamMembers"
                :key="member.id"
                class="card text-center group cursor-pointer"
                @click="openMemberDetail(member)"
              >
                <div class="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <img
                    :src="member.avatar"
                    :alt="member.name"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 class="text-lg font-semibold mb-1">{{ member.name }}</h3>
                <p class="text-primary-600 text-sm font-medium mb-2">{{ member.position }}</p>
                <p class="text-gray-600 text-xs leading-relaxed line-clamp-2">{{ member.bio }}</p>
              </div>
            </div>
          </section>

          <!-- 团队文化区域 -->
          <section class="card bg-gradient-to-r from-primary-50 to-primary-100">
            <h2 class="text-2xl font-semibold mb-6 text-center">团队文化</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div v-for="culture in teamCultures" :key="culture.title" class="text-center p-4">
                <div class="text-3xl mb-3">{{ culture.icon }}</div>
                <h3 class="text-lg font-semibold mb-2">{{ culture.title }}</h3>
                <p class="text-gray-600 text-sm">{{ culture.description }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>

    <!-- 成员详情弹窗 -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="selectedMember"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeMemberDetail"
        >
          <!-- 遮罩层 -->
          <div class="absolute inset-0 bg-black/50" @click="closeMemberDetail"></div>
          <!-- 弹窗内容 -->
          <div class="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 z-10">
            <button
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              @click="closeMemberDetail"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div class="text-center">
              <div class="w-36 h-36 mx-auto mb-6 overflow-hidden rounded-full">
                <img
                  :src="selectedMember.avatar"
                  :alt="selectedMember.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <h3 class="text-2xl font-bold mb-1">{{ selectedMember.name }}</h3>
              <p class="text-primary-600 font-medium mb-4">{{ selectedMember.position }}</p>
              <p class="text-gray-600 leading-relaxed mb-6">{{ selectedMember.bio }}</p>
              <!-- 技能标签 -->
              <div v-if="selectedMember.skills" class="flex flex-wrap justify-center gap-2">
                <span
                  v-for="skill in selectedMember.skills"
                  :key="skill"
                  class="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Footer />

    <LoadingSpinner :loading="appStore.loading" />
    <ErrorMessage :error="appStore.error" @close="appStore.clearError" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const router = useRouter()

// 返回上一页
const goBack = () => {
  router.back()
}

// 团队成员数据接口
interface TeamMember {
  id: number
  name: string
  position: string
  avatar: string
  bio: string
  skills?: string[]
}

// 核心团队成员数据
const coreMembers = ref<TeamMember[]>([
  {
    id: 1,
    name: '张明',
    position: '首席执行官',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20portrait%20of%20asian%20businessman%20in%20suit%2C%20clean%20background%2C%20corporate%20style&image_size=square',
    bio: '拥有20年行业经验，曾在多家知名企业担任高管。致力于推动公司战略发展，引领团队不断突破创新。',
    skills: ['战略规划', '团队管理', '商业拓展']
  },
  {
    id: 2,
    name: '李芳',
    position: '首席技术官',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20portrait%20of%20asian%20businesswoman%20in%20suit%2C%20clean%20background%2C%20corporate%20style&image_size=square',
    bio: '技术领域深耕15年，精通前沿技术架构。主导了多个大型项目的技术方案设计与落地实施。',
    skills: ['技术架构', '系统设计', '人工智能']
  },
  {
    id: 3,
    name: '王强',
    position: '首席设计师',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20portrait%20of%20asian%20creative%20designer%2C%20clean%20background%2C%20modern%20style&image_size=square',
    bio: '国际设计大赛获奖者，10年设计经验。擅长将商业需求转化为卓越的用户体验，作品屡获业界好评。',
    skills: ['UI/UX设计', '品牌设计', '交互设计']
  }
])

// 团队成员数据
const teamMembers = ref<TeamMember[]>([
  {
    id: 4,
    name: '赵雪',
    position: '产品经理',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20portrait%20of%20asian%20female%20product%20manager%2C%20clean%20background&image_size=square',
    bio: '8年产品管理经验，擅长用户需求分析与产品规划，成功打造多款百万级用户产品。',
    skills: ['产品规划', '需求分析', '数据驱动']
  },
  {
    id: 5,
    name: '陈磊',
    position: '前端工程师',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20portrait%20of%20asian%20male%20software%20engineer%2C%20clean%20background&image_size=square',
    bio: '前端技术专家，精通Vue、React等主流框架，热衷于技术创新和性能优化。',
    skills: ['Vue', 'React', 'TypeScript']
  },
  {
    id: 6,
    name: '刘洋',
    position: '后端工程师',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20portrait%20of%20asian%20male%20backend%20developer%2C%20clean%20background&image_size=square',
    bio: '后端架构师，擅长高并发系统设计与微服务架构，保障系统稳定高效运行。',
    skills: ['Java', '微服务', '系统架构']
  },
  {
    id: 7,
    name: '孙婷',
    position: '市场总监',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20portrait%20of%20asian%20female%20marketing%20director%2C%20clean%20background&image_size=square',
    bio: '品牌营销专家，拥有丰富的市场推广经验，助力品牌影响力持续提升。',
    skills: ['品牌营销', '市场策略', '内容运营']
  }
])

// 团队文化数据
const teamCultures = [
  {
    icon: '🤝',
    title: '协作共赢',
    description: '我们相信团队的力量，鼓励开放沟通和跨部门协作，共同创造更大价值。'
  },
  {
    icon: '🚀',
    title: '持续成长',
    description: '提供丰富的学习资源和发展机会，支持每位成员不断突破自我、实现成长。'
  },
  {
    icon: '💡',
    title: '创新驱动',
    description: '营造鼓励创新的氛围，积极探索新技术和新方法，让创意落地成为现实。'
  }
]

// 当前选中的成员（用于弹窗展示）
const selectedMember = ref<TeamMember | null>(null)

// 打开成员详情弹窗
const openMemberDetail = (member: TeamMember) => {
  selectedMember.value = member
}

// 关闭成员详情弹窗
const closeMemberDetail = () => {
  selectedMember.value = null
}
</script>

<style scoped>
/* 弹窗过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 多行文本截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
