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
import axios from "axios";
import StopButton from "./StopButton.vue";
export default defineComponent({
    name: "TimeLog",
    data() {
        return {
            times: null,
            timeID:Number,
        };
    },
    component:{
      StopButton,
    },
    mounted() {
        axios
            .get("http://localhost:3000/time-log")
            .then((response) => {
            console.log(response);
            this.times = response.data;
        })
            .catch((error) => {
            console.log(error);
        });
    },
    methods: {
        formatTime(timeStr:Date) {
            const options = { hour: "numeric", minute: "numeric" };
            return new Date(timeStr).toLocaleTimeString("en-US", options);
        },
    },
});
</script>
