<template>
  <div class="course-card" @click="handleClick">
    <div class="course-cover">
      <img :src="course.coverUrl" :alt="course.courseName" />
    </div>
    <div class="course-info">
      <h3 class="course-title">{{ course.courseName }}</h3>
      <p class="course-subtitle">{{ course.subtitle }}</p>
      <p class="course-lecturer">{{ course.lecturerName }}</p>
      <div class="course-progress" v-if="showProgress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${course.progressPercent}%` }"></div>
        </div>
        <span class="progress-text">{{ course.progressPercent }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppCourseResponse } from '~/api/types'

const props = defineProps<{
  course: AppCourseResponse
  showProgress?: boolean
}>()

const emit = defineEmits<{
  click: [course: AppCourseResponse]
}>()

function handleClick() {
  emit('click', props.course)
}
</script>
