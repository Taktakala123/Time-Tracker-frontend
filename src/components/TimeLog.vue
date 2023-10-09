<template>
<div class="card">
    <div v-for="time in times" :key="time.id">
      Period {{ time.id }}
      {{ formatTime(time.StartTime) }} - {{ formatTime(time.EndTime) }}
      {{ time.duration }}
    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
import service from "../../service/index"
import StopButton from "./StopButton.vue";
export default defineComponent({
    name: "TimeLog",
    data() {
        return {
            times: null,
            timeID: Number,
        };
    },
    mounted: async function () {
        try {
            const response = await service.timeLogControllerFindAll({ format: 'json' });
            console.log(response);
            this.times = response.data;
        }
        catch (error) {
            console.log(error);
        }
    },
    methods: {
        formatTime(timeStr: Date) {
            const options = { hour: "numeric", minute: "numeric" };
            return new Date(timeStr).toLocaleTimeString("en-US", options);
        },
    },
    components: { StopButton }
});
</script>
