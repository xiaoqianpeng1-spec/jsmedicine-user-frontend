<template>
  <div class="audio-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">音频课程</h1>
        <p class="page-desc">随时随地，听学中医知识</p>
      </div>

      <div class="audio-list">
        <div 
          v-for="audio in audios" 
          :key="audio.id" 
          class="audio-card"
          :class="{ playing: currentAudio === audio.id }"
          @click="togglePlay(audio.id)"
        >
          <div class="audio-cover">
            <img :src="audio.cover" :alt="audio.title" />
            <div class="play-status">
              <span v-if="currentAudio === audio.id" class="playing-icon">⏸</span>
              <span v-else class="play-icon">▶</span>
            </div>
          </div>
          <div class="audio-info">
            <h3 class="audio-title">{{ audio.title }}</h3>
            <p class="audio-teacher">{{ audio.teacher }}</p>
            <div class="audio-progress" v-if="currentAudio === audio.id">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: progress + '%' }"></div>
              </div>
              <span class="progress-time">03:45 / {{ audio.duration }}</span>
            </div>
          </div>
          <div class="audio-duration">{{ audio.duration }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentAudio = ref<number | null>(null)
const progress = ref(35)

const audios = ref([
  {
    id: 1,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20podcast%20audio%20cover%20green%20theme&image_size=square',
    title: '中医养生之道 - 四季养生法',
    teacher: '王教授',
    duration: '28:30'
  },
  {
    id: 2,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20herbs%20audio%20cover&image_size=square',
    title: '中药小故事 - 黄芪的传说',
    teacher: '李药师',
    duration: '15:45'
  },
  {
    id: 3,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20acupuncture%20audio%20cover%20green&image_size=square',
    title: '针灸入门 - 经络学说详解',
    teacher: '张医师',
    duration: '32:10'
  },
  {
    id: 4,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20diagnosis%20audio%20cover&image_size=square',
    title: '中医四诊 - 脉诊入门',
    teacher: '陈教授',
    duration: '25:55'
  },
  {
    id: 5,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20health%20audio%20cover&image_size=square',
    title: '中医食疗 - 药膳养生',
    teacher: '刘营养师',
    duration: '20:30'
  },
  {
    id: 6,
    cover: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20medicine%20classics%20audio%20cover&image_size=square',
    title: '黄帝内经 - 素问解读',
    teacher: '赵教授',
    duration: '45:00'
  }
])

const togglePlay = (id: number) => {
  if (currentAudio.value === id) {
    currentAudio.value = null
  } else {
    currentAudio.value = id
  }
}
</script>

<style scoped>
.audio-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
}

.page-desc {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.audio-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.audio-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  padding: 16px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.audio-card:hover {
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
}

.audio-card.playing {
  background: #E8F5E9;
  border: 1px solid #4CAF50;
}

.audio-cover {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.audio-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-status {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  background: rgba(76, 175, 80, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
}

.audio-info {
  flex: 1;
  min-width: 0;
}

.audio-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.audio-teacher {
  font-size: 13px;
  color: #999;
  margin: 0 0 8px 0;
}

.audio-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4CAF50;
  border-radius: 3px;
  transition: width 0.3s;
}

.progress-time {
  font-size: 12px;
  color: #999;
  flex-shrink: 0;
}

.audio-duration {
  font-size: 14px;
  color: #999;
  flex-shrink: 0;
}

@media (max-width: 480px) {
  .audio-cover {
    width: 56px;
    height: 56px;
  }
  
  .audio-title {
    font-size: 14px;
  }
}
</style>