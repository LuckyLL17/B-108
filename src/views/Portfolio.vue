<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-1 py-12">
      <div class="container-custom">
        <div class="max-w-6xl mx-auto">
          <!-- 页面标题 -->
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold mb-4">客户案例</h1>
            <p class="text-gray-600 text-lg">查看我们的成功案例与项目作品集</p>
          </div>

          <!-- 分类筛选按钮 -->
          <div class="flex flex-wrap justify-center gap-3 mb-10">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-6 py-2 rounded-full font-medium transition-all duration-300',
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ category }}
            </button>
          </div>

          <!-- 案例网格展示 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- 遍历案例数据 -->
            <div
              v-for="project in filteredProjects"
              :key="project.id"
              class="card overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              @click="openGallery(project)"
            >
              <!-- 案例封面图 -->
              <div class="relative overflow-hidden h-48">
                <img
                  :src="project.coverImage"
                  :alt="project.title"
                  class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <!-- 遮罩层 -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <span class="text-white p-4 font-medium">点击查看详情 →</span>
                </div>
              </div>

              <!-- 案例信息 -->
              <div class="p-6">
                <span class="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full mb-3">
                  {{ project.category }}
                </span>
                <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
                <p class="text-gray-600 text-sm line-clamp-2">{{ project.description }}</p>
                <div class="mt-3 text-sm text-gray-500">
                  <span>客户：{{ project.client }}</span>
                </div>
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

    <!-- 图片画廊弹窗 -->
    <div
      v-if="isGalleryOpen && selectedProject"
      class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      @click.self="closeGallery"
    >
      <!-- 关闭按钮 -->
      <button
        @click="closeGallery"
        class="absolute top-6 right-6 text-white text-3xl hover:text-gray-300 z-10"
      >
        ×
      </button>

      <!-- 上一张按钮 -->
      <button
        @click="prevImage"
        class="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-gray-300 z-10"
        v-if="selectedProject.images.length > 1"
      >
        ‹
      </button>

      <!-- 下一张按钮 -->
      <button
        @click="nextImage"
        class="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-gray-300 z-10"
        v-if="selectedProject.images.length > 1"
      >
        ›
      </button>

      <!-- 图片展示区域 -->
      <div class="max-w-5xl max-h-[80vh] px-4">
        <img
          :src="selectedProject.images[currentImageIndex]"
          :alt="selectedProject.title"
          class="max-w-full max-h-[60vh] object-contain mx-auto rounded-lg"
        />

        <!-- 项目详情 -->
        <div class="mt-6 text-center text-white max-w-2xl mx-auto">
          <h2 class="text-2xl font-bold mb-2">{{ selectedProject.title }}</h2>
          <p class="text-gray-300 mb-4">{{ selectedProject.description }}</p>
          <div class="flex justify-center gap-4 text-sm text-gray-400">
            <span>客户：{{ selectedProject.client }}</span>
            <span>分类：{{ selectedProject.category }}</span>
            <span>图片 {{ currentImageIndex + 1 }} / {{ selectedProject.images.length }}</span>
          </div>

          <!-- 缩略图 -->
          <div class="flex justify-center gap-2 mt-6 flex-wrap" v-if="selectedProject.images.length > 1">
            <img
              v-for="(img, index) in selectedProject.images"
              :key="index"
              :src="img"
              :alt="`缩略图 ${index + 1}`"
              :class="[
                'w-16 h-12 object-cover rounded cursor-pointer transition-opacity duration-300',
                currentImageIndex === index ? 'opacity-100 ring-2 ring-white' : 'opacity-50 hover:opacity-75'
              ]"
              @click="currentImageIndex = index"
            />
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
import { RouterLink } from 'vue-router'

// 初始化 Pinia store
const appStore = useAppStore()

// 定义案例项目类型接口
interface Project {
  id: number
  title: string
  description: string
  category: string
  client: string
  coverImage: string
  images: string[]
}

// 分类列表
const categories = ['全部', '网站开发', '移动应用', 'UI设计', '品牌策划']

// 当前选中的分类
const selectedCategory = ref('全部')

// 画廊弹窗是否打开
const isGalleryOpen = ref(false)

// 当前选中的案例项目
const selectedProject = ref<Project | null>(null)

// 当前显示的图片索引
const currentImageIndex = ref(0)

// 案例数据（示例数据，可根据实际情况修改）
const projects = ref<Project[]>([
  {
    id: 1,
    title: '企业官网重构项目',
    description: '为某知名科技企业进行官网全面升级，采用现代化设计语言和技术栈，提升用户体验和品牌形象。',
    category: '网站开发',
    client: '科技创新有限公司',
    coverImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop'
    ]
  },
  {
    id: 2,
    title: '电商移动应用',
    description: '开发一款功能完善的电商购物应用，支持商品浏览、购物车、订单管理、在线支付等核心功能。',
    category: '移动应用',
    client: '优选购物平台',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&h=800&fit=crop'
    ]
  },
  {
    id: 3,
    title: '金融App界面设计',
    description: '为某金融科技公司设计全新的移动端应用界面，注重用户体验和视觉美感。',
    category: 'UI设计',
    client: '智融科技',
    coverImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop'
    ]
  },
  {
    id: 4,
    title: '品牌视觉全案',
    description: '为初创品牌提供完整的品牌视觉设计服务，包括Logo设计、VI系统、品牌手册等。',
    category: '品牌策划',
    client: '新锐品牌咨询',
    coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop'
    ]
  },
  {
    id: 5,
    title: '在线教育平台',
    description: '搭建完整的在线教育平台，支持视频课程、直播教学、作业提交、学习进度跟踪等功能。',
    category: '网站开发',
    client: '智慧教育集团',
    coverImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop'
    ]
  },
  {
    id: 6,
    title: '健康管理App',
    description: '开发一款健康管理应用，帮助用户记录运动数据、饮食情况、睡眠质量等健康指标。',
    category: '移动应用',
    client: '健康生活科技',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1486739985386-d4fae04ca6f7?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop'
    ]
  }
])

// 根据选中的分类筛选项目
const filteredProjects = computed(() => {
  if (selectedCategory.value === '全部') {
    return projects.value
  }
  return projects.value.filter(project => project.category === selectedCategory.value)
})

// 打开画廊
const openGallery = (project: Project) => {
  selectedProject.value = project
  currentImageIndex.value = 0
  isGalleryOpen.value = true
  // 禁止背景滚动
  document.body.style.overflow = 'hidden'
}

// 关闭画廊
const closeGallery = () => {
  isGalleryOpen.value = false
  selectedProject.value = null
  // 恢复背景滚动
  document.body.style.overflow = ''
}

// 上一张图片
const prevImage = () => {
  if (!selectedProject.value) return
  currentImageIndex.value = currentImageIndex.value === 0
    ? selectedProject.value.images.length - 1
    : currentImageIndex.value - 1
}

// 下一张图片
const nextImage = () => {
  if (!selectedProject.value) return
  currentImageIndex.value = currentImageIndex.value === selectedProject.value.images.length - 1
    ? 0
    : currentImageIndex.value + 1
}
</script>
