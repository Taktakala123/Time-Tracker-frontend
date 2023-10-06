<template>
  <div class="card">
    <div v-for="time in times" :key="time.id">
      Period {{ time.id }}
      {{ formatTime(time.StartTime) }} - {{ formatTime(time.EndTime) }}
      {{ time.duration }}
      <StopButton :timeID="time.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import service from 'service/index'
export default defineComponent({
  name: "TimeLog",
  data() {
    return {
      times: null,
      timeID: Number,
    };
  },
  methods: {
    formatTime(timeStr: Date) {
      const options = { hour: "numeric", minute: "numeric" };
      return new Date(timeStr).toLocaleTimeString("en-US", options);
    },
  },
  async fetchData() {
    try {
      const response = await service.timeLogControllerFindAll()
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },

  mounted: async function () {
    console.log('mounted')
    const response = await service.timeLogControllerFindAll()
    console.log(response);
  },
});
</script>
