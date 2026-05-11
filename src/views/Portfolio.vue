<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    
    <main class="flex-1 py-12">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold mb-4">客户案例</h1>
          <p class="text-gray-600 max-w-2xl mx-auto">
            探索我们的项目作品集，见证我们如何帮助客户实现他们的目标，创造卓越的数字体验。
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-3 mb-10">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeCategory = category"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-all',
              activeCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="card overflow-hidden cursor-pointer group"
            @click="openLightbox(project)"
          >
            <div class="relative overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <span class="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-medium">
                  查看详情
                </span>
              </div>
            </div>
            <div class="p-5">
              <span class="text-sm text-primary-600 font-medium">{{ project.category }}</span>
              <h3 class="text-xl font-semibold mt-1 mb-2">{{ project.title }}</h3>
              <p class="text-gray-600 text-sm">{{ project.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div
      v-if="lightboxOpen"
      class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      @click.self="closeLightbox"
    >
      <button
        @click="closeLightbox"
        class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
        aria-label="关闭"
      >
        ×
      </button>
      
      <button
        v-if="currentProjectIndex > 0"
        @click="prevProject"
        class="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-30 rounded-full w-12 h-12 flex items-center justify-center"
        aria-label="上一个"
      >
        ‹
      </button>
      
      <button
        v-if="currentProjectIndex < filteredProjects.length - 1"
        @click="nextProject"
        class="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-30 rounded-full w-12 h-12 flex items-center justify-center"
        aria-label="下一个"
      >
        ›
      </button>
      
      <div class="max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-2xl">
        <img
          :src="selectedProject?.image"
          :alt="selectedProject?.title"
          class="w-full h-96 object-cover"
        />
        <div class="p-6">
          <span class="text-sm text-primary-600 font-medium">{{ selectedProject?.category }}</span>
          <h2 class="text-2xl font-bold mt-1 mb-3">{{ selectedProject?.title }}</h2>
          <p class="text-gray-600 mb-4">{{ selectedProject?.description }}</p>
          <div class="pt-4 border-t border-gray-200">
            <h4 class="font-semibold mb-2">项目亮点：</h4>
            <ul class="text-gray-600 space-y-1">
              <li v-for="(highlight, index) in selectedProject?.highlights" :key="index" class="flex items-start">
                <span class="text-primary-600 mr-2">•</span>
                {{ highlight }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <Footer />
    
    <LoadingSpinner :loading="appStore.loading" />
    <ErrorMessage :error="appStore.error" @close="appStore.clearError" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

interface Project {
  id: number
  title: string
  category: string
  image: string
  description: string
  highlights: string[]
}

const categories = ['全部', '网站开发', '移动应用', '品牌设计', '数字营销']

const activeCategory = ref('全部')

const projects: Project[] = [
  {
    id: 1,
    title: '企业官网重构项目',
    category: '网站开发',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20corporate%20website%20design%20professional%20blue%20theme&image_size=landscape_16_9',
    description: '为大型企业进行官网全面重构，采用现代化技术栈，提升用户体验和品牌形象。',
    highlights: ['响应式设计，适配全设备', '性能优化，加载速度提升300%', 'SEO优化，搜索排名显著提升']
  },
  {
    id: 2,
    title: '电商平台移动端',
    category: '移动应用',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20ecommerce%20app%20interface%20shopping%20modern%20design&image_size=landscape_16_9',
    description: '开发iOS和Android双平台电商应用，支持多种支付方式和个性化推荐。',
    highlights: ['原生开发，流畅体验', '集成多种支付网关', '智能推荐算法']
  },
  {
    id: 3,
    title: '科技公司品牌升级',
    category: '品牌设计',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=technology%20company%20branding%20logo%20design%20modern%20professional&image_size=landscape_16_9',
    description: '为科技初创公司设计全套品牌视觉系统，包括Logo、VI手册和品牌指南。',
    highlights: ['原创Logo设计', '完整VI系统', '品牌战略咨询']
  },
  {
    id: 4,
    title: '在线教育平台',
    category: '网站开发',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=online%20education%20platform%20learning%20website%20modern%20interface&image_size=landscape_16_9',
    description: '搭建综合性在线教育平台，支持直播课程、录播回放和互动问答。',
    highlights: ['实时直播技术', '学习进度追踪', '证书颁发系统']
  },
  {
    id: 5,
    title: '健身追踪App',
    category: '移动应用',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20tracking%20app%20health%20exercise%20mobile%20interface&image_size=landscape_16_9',
    description: '智能健身追踪应用，记录运动数据，提供个性化训练计划。',
    highlights: ['运动数据可视化', 'AI训练计划生成', '社交分享功能']
  },
  {
    id: 6,
    title: '餐饮连锁品牌设计',
    category: '品牌设计',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=restaurant%20chain%20branding%20food%20logo%20menu%20design&image_size=landscape_16_9',
    description: '为餐饮连锁品牌进行全案设计，从品牌定位到店面设计一体化服务。',
    highlights: ['品牌故事塑造', '菜单设计优化', '空间设计指导']
  },
  {
    id: 7,
    title: '社交媒体营销活动',
    category: '数字营销',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=social%20media%20marketing%20campaign%20digital%20advertising%20analytics&image_size=landscape_16_9',
    description: '策划并执行全平台社交媒体营销活动，提升品牌知名度和用户 engagement。',
    highlights: ['全平台覆盖策略', 'KOL合作管理', '数据驱动优化']
  },
  {
    id: 8,
    title: '金融科技官网',
    category: '网站开发',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fintech%20website%20finance%20technology%20professional%20dashboard&image_size=landscape_16_9',
    description: '为金融科技公司打造专业官网，注重安全性和用户信任感的建立。',
    highlights: ['银行级安全标准', '投资者门户集成', '合规性设计']
  },
  {
    id: 9,
    title: '品牌全网营销方案',
    category: '数字营销',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=digital%20marketing%20strategy%20brand%20growth%20analytics%20dashboard&image_size=landscape_16_9',
    description: '制定并执行全网整合营销方案，助力品牌实现快速增长。',
    highlights: ['360度营销方案', 'ROI追踪分析', '持续优化迭代']
  }
]

const filteredProjects = computed(() => {
  if (activeCategory.value === '全部') {
    return projects
  }
  return projects.filter(project => project.category === activeCategory.value)
})

const lightboxOpen = ref(false)
const selectedProject = ref<Project | null>(null)
const currentProjectIndex = ref(0)

const openLightbox = (project: Project) => {
  selectedProject.value = project
  currentProjectIndex.value = filteredProjects.value.findIndex(p => p.id === project.id)
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  selectedProject.value = null
  document.body.style.overflow = ''
}

const prevProject = () => {
  if (currentProjectIndex.value > 0) {
    currentProjectIndex.value--
    selectedProject.value = filteredProjects.value[currentProjectIndex.value]
  }
}

const nextProject = () => {
  if (currentProjectIndex.value < filteredProjects.value.length - 1) {
    currentProjectIndex.value++
    selectedProject.value = filteredProjects.value[currentProjectIndex.value]
  }
}
</script>
