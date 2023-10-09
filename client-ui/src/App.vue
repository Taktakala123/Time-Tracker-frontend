<template>
   <div class="flex justify-content-start flex-wrap">
      <Date />
   </div>

   <div class="flex justify-content-end flex-wrap">
      <div class="flex align-items-center justify-content-center m-2">
         <StartButton />
      </div>
      <div class="flex align-items-center justify-content-center m-2">
         <StopButton />
      </div>
   </div>

   <div class="card">
      <div v-for="time in times" :key="time.id">
         Period {{ time.id }}
         {{ formatTime(time.StartTime) }} - {{ formatTime(time.EndTime) }}
      </div>
   </div>

</template>


<script lang="ts">
import Date from './components/Date.vue';
import StartButton from './components/StartButton.vue';
import StopButton from './components/StopButton.vue';
import { defineComponent } from "vue";
import service from "../service/index"
export default defineComponent({
   name: "TimeLog",
   components: {
      Date,
      StartButton,
      StopButton,
   },
    data() {
      return {
         times: {},
         time: {
            id: null,
            StartTime: null,

         },
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

});
</script>
