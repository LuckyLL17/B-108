<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-1 py-12">
      <div class="container-custom">
        <div class="max-w-6xl mx-auto">
          <!-- 页面标题 -->
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold mb-4">客户案例</h1>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">
              我们为众多行业客户提供了优质的解决方案，以下是部分精选案例展示。
            </p>
          </div>

          <!-- 分类筛选标签 -->
          <div class="flex flex-wrap justify-center gap-3 mb-10">
            <button
              v-for="cat in categories"
              :key="cat.key"
              @click="activeCategory = cat.key"
              :class="[
                'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                activeCategory === cat.key
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
              ]"
            >
              {{ cat.label }}
            </button>
          </div>

          <!-- 案例卡片网格 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div
              v-for="project in filteredProjects"
              :key="project.id"
              class="card overflow-hidden group cursor-pointer p-0"
              @click="openGallery(project)"
            >
              <!-- 项目封面图 -->
              <div class="relative overflow-hidden aspect-[4/3]">
                <img
                  :src="project.cover"
                  :alt="project.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <!-- 悬浮遮罩 -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span class="text-white text-sm font-medium">点击查看详情 →</span>
                </div>
                <!-- 项目分类标签 -->
                <span class="absolute top-3 right-3 px-3 py-1 bg-primary-600 text-white text-xs rounded-full">
                  {{ getCategoryLabel(project.category) }}
                </span>
              </div>
              <!-- 项目信息 -->
              <div class="p-5">
                <h3 class="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">{{ project.title }}</h3>
                <p class="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">{{ project.description }}</p>
                <div class="flex items-center justify-between text-xs text-gray-400">
                  <span>{{ project.client }}</span>
                  <span>{{ project.year }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 合作品牌展示 -->
          <section class="card bg-gradient-to-r from-primary-50 to-primary-100">
            <h2 class="text-2xl font-semibold mb-8 text-center">合作品牌</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div
                v-for="brand in partnerBrands"
                :key="brand.name"
                class="bg-white rounded-lg p-4 flex items-center justify-center h-20 shadow-sm hover:shadow-md transition-shadow"
              >
                <span class="text-gray-500 font-semibold text-sm">{{ brand.name }}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>

    <!-- 图片画廊弹窗 -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="galleryOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeGallery"
        >
          <!-- 遮罩层 -->
          <div class="absolute inset-0 bg-black/80" @click="closeGallery"></div>
          <!-- 弹窗内容 -->
          <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10">
            <!-- 关闭按钮 -->
            <button
              class="absolute top-4 right-4 z-20 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              @click="closeGallery"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- 当前展示项目 -->
            <div v-if="currentProject">
              <!-- 主图展示区域 -->
              <div class="relative bg-gray-900 aspect-[16/9]">
                <img
                  :src="galleryImages[currentImageIndex]"
                  :alt="currentProject.title"
                  class="w-full h-full object-contain"
                />
                <!-- 左右切换按钮 -->
                <button
                  v-if="galleryImages.length > 1"
                  @click.stop="prevImage"
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  v-if="galleryImages.length > 1"
                  @click.stop="nextImage"
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <!-- 图片计数器 -->
                <div class="absolute bottom-3 right-3 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
                  {{ currentImageIndex + 1 }} / {{ galleryImages.length }}
                </div>
              </div>

              <!-- 缩略图列表 -->
              <div v-if="galleryImages.length > 1" class="flex gap-2 p-4 overflow-x-auto">
                <div
                  v-for="(img, index) in galleryImages"
                  :key="index"
                  @click="currentImageIndex = index"
                  :class="[
                    'flex-shrink-0 w-20 h-14 rounded-md overflow-hidden cursor-pointer border-2 transition-all',
                    currentImageIndex === index ? 'border-primary-600' : 'border-transparent opacity-60 hover:opacity-100'
                  ]"
                >
                  <img :src="img" class="w-full h-full object-cover" />
                </div>
              </div>

              <!-- 项目详情信息 -->
              <div class="p-6">
                <h3 class="text-2xl font-bold mb-2">{{ currentProject.title }}</h3>
                <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>客户：{{ currentProject.client }}</span>
                  <span>年份：{{ currentProject.year }}</span>
                  <span class="px-2 py-0.5 bg-primary-50 text-primary-600 rounded-full text-xs">
                    {{ getCategoryLabel(currentProject.category) }}
                  </span>
                </div>
                <p class="text-gray-600 leading-relaxed">{{ currentProject.detail }}</p>
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
import { ref, computed } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 项目案例数据接口
interface Project {
  id: number
  title: string
  cover: string
  images: string[]
  description: string
  detail: string
  client: string
  year: string
  category: string
}

// 分类列表
const categories = [
  { key: 'all', label: '全部' },
  { key: 'web', label: '网站开发' },
  { key: 'app', label: '移动应用' },
  { key: 'design', label: '品牌设计' },
  { key: 'cloud', label: '云服务' }
]

// 当前激活的分类筛选
const activeCategory = ref('all')

// 根据分类筛选项目
const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return projects.value
  return projects.value.filter(p => p.category === activeCategory.value)
})

// 获取分类标签名称
const getCategoryLabel = (key: string) => {
  return categories.find(c => c.key === key)?.label || key
}

// 案例项目数据
const projects = ref<Project[]>([
  {
    id: 1,
    title: '智慧城市数据平台',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20smart%20city%20data%20dashboard%20interface%2C%20blue%20theme%2C%20dark%20background%2C%20glowing%20charts%20and%20graphs&image_size=landscape_16_9',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20smart%20city%20data%20dashboard%20interface%2C%20blue%20theme%2C%20dark%20background%2C%20glowing%20charts%20and%20graphs&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20visualization%20screen%20with%20map%20and%20analytics%2C%20tech%20blue%20style&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=real-time%20monitoring%20dashboard%20with%20charts%20and%20statistics%2C%20professional%20UI&image_size=landscape_16_9'
    ],
    description: '为某市政府打造的城市数据可视化平台，整合多源数据实现智慧管理。',
    detail: '该平台整合了交通、环保、市政等多个数据源，通过大屏可视化展示城市运行状态。采用微服务架构和实时数据流处理技术，支持百万级数据并发处理，显著提升了城市管理的效率和精准度。',
    client: '某市政府',
    year: '2025',
    category: 'web'
  },
  {
    id: 2,
    title: '新零售电商APP',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20e-commerce%20mobile%20app%20interface%2C%20clean%20white%20design%2C%20product%20showcase&image_size=landscape_16_9',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20e-commerce%20mobile%20app%20interface%2C%20clean%20white%20design%2C%20product%20showcase&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20shopping%20app%20UI%20with%20cart%20and%20checkout%2C%20modern%20design&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20app%20user%20profile%20and%20order%20tracking%20screen%2C%20minimalist%20design&image_size=landscape_16_9'
    ],
    description: '为某零售品牌开发的全渠道移动电商平台，实现线上线下融合。',
    detail: '该APP集成了商品展示、在线支付、会员体系、智能推荐等功能，通过数据分析实现精准营销。上线后用户活跃度提升200%，月均交易额增长150%。',
    client: '某零售集团',
    year: '2024',
    category: 'app'
  },
  {
    id: 3,
    title: '品牌视觉升级',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brand%20identity%20design%20showcase%2C%20logo%20and%20visual%20system%2C%20modern%20clean%20layout&image_size=landscape_16_9',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brand%20identity%20design%20showcase%2C%20logo%20and%20visual%20system%2C%20modern%20clean%20layout&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brand%20guideline%20book%20design%2C%20color%20palette%20and%20typography%2C%20professional&image_size=landscape_16_9'
    ],
    description: '为某科技企业完成全品牌视觉系统升级，提升品牌辨识度。',
    detail: '从品牌战略出发，重新定义了品牌定位与视觉语言。涵盖Logo设计、VI系统、宣传物料、官网设计等全套视觉方案，帮助客户建立了统一且富有识别性的品牌形象。',
    client: '某科技公司',
    year: '2024',
    category: 'design'
  },
  {
    id: 4,
    title: '企业云原生平台',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cloud%20computing%20infrastructure%20visualization%2C%20network%20nodes%20and%20servers%2C%20blue%20glowing&image_size=landscape_16_9',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cloud%20computing%20infrastructure%20visualization%2C%20network%20nodes%20and%20servers%2C%20blue%20glowing&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kubernetes%20dashboard%20interface%2C%20container%20management%2C%20modern%20tech%20UI&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cloud%20server%20monitoring%20panel%20with%20metrics%20and%20alerts%2C%20dark%20theme&image_size=landscape_16_9'
    ],
    description: '为某大型企业构建云原生基础设施平台，实现应用容器化部署。',
    detail: '基于Kubernetes构建了完整的云原生平台，实现了应用的容器化部署、自动扩缩容、灰度发布等核心能力。系统可用性达到99.99%，运维效率提升60%。',
    client: '某金融集团',
    year: '2025',
    category: 'cloud'
  },
  {
    id: 5,
    title: '在线教育平台',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=online%20education%20platform%20interface%2C%20video%20course%20player%2C%20clean%20modern%20design&image_size=landscape_16_9',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=online%20education%20platform%20interface%2C%20video%20course%20player%2C%20clean%20modern%20design&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=e-learning%20course%20catalog%20and%20progress%20tracking%20UI%2C%20educational%20theme&image_size=landscape_16_9'
    ],
    description: '为某教育机构打造一站式在线学习平台，支持直播与录播课程。',
    detail: '平台支持万人同时在线直播，集成了课程管理、学习追踪、在线考试、证书颁发等功能。上线后注册用户突破50万，课程完成率提升40%。',
    client: '某教育集团',
    year: '2024',
    category: 'web'
  },
  {
    id: 6,
    title: '健康医疗APP',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=health%20medical%20app%20interface%2C%20appointment%20booking%2C%20clean%20green%20theme&image_size=landscape_16_9',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=health%20medical%20app%20interface%2C%20appointment%20booking%2C%20clean%20green%20theme&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=telemedicine%20video%20consultation%20app%20screen%2C%20modern%20healthcare%20UI&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=health%20tracking%20dashboard%20with%20vitals%20and%20charts%2C%20medical%20app&image_size=landscape_16_9'
    ],
    description: '为某医疗机构开发的互联网医疗APP，实现线上问诊与健康管理。',
    detail: 'APP集成了在线问诊、预约挂号、健康档案、用药提醒等核心功能，支持图文问诊和视频问诊。已服务超过30万用户，日均问诊量超过5000次。',
    client: '某医疗机构',
    year: '2025',
    category: 'app'
  }
])

// 合作品牌数据
const partnerBrands = [
  { name: '科技云联' },
  { name: '数智未来' },
  { name: '创维科技' },
  { name: '星辰教育' },
  { name: '融信金科' },
  { name: '康泰医疗' }
]

// 画廊弹窗相关状态
const galleryOpen = ref(false)
const currentProject = ref<Project | null>(null)
const currentImageIndex = ref(0)

// 当前画廊的图片列表
const galleryImages = computed(() => currentProject.value?.images || [])

// 打开画廊弹窗
const openGallery = (project: Project) => {
  currentProject.value = project
  currentImageIndex.value = 0
  galleryOpen.value = true
}

// 关闭画廊弹窗
const closeGallery = () => {
  galleryOpen.value = false
  currentProject.value = null
  currentImageIndex.value = 0
}

// 上一张图片
const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else {
    currentImageIndex.value = galleryImages.value.length - 1
  }
}

// 下一张图片
const nextImage = () => {
  if (currentImageIndex.value < galleryImages.value.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0
  }
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
</style>
