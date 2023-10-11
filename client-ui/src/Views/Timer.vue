<template>
    <div class="flex justify-content-start flex-wrap">
        <Date />
    </div>

    <div class="flex justify-content-end flex-wrap">
        <div class="flex align-items-center justify-content-center m-2">
            <StopButton @StopTime="stop" />
        </div>
        <div class="flex align-items-center justify-content-center m-2">
            <StartButton @StartTime="Addtime" />
        </div>

    </div>

    <div class="card">
        <div v-for="time in times" :key="time.id">
            Period {{ time.id }}
            {{ time.duration }}
        </div>
    </div>
</template>
 
 
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Date from '../components/Date.vue';
import StartButton from '../components/StartButton.vue';
import StopButton from '../components/StopButton.vue';
import service from '../../service/index';

export default defineComponent({
  name: 'Timer',

  components: {
    Date,
    StartButton,
    StopButton,
  },

  setup() {
    const times = ref({});
    const response = ref({});
    const timeid = ref(null);
    
    onMounted(async () => {
        try {
        response.value = await service.timeLogControllerFindAll({ format: 'json' });
        times.value = response.value.data;
      } catch (error) {
        console.log(error);
      }
    })

    const Addtime = async () => {
      try {
        const Startdata = await service.start.timeLogControllerStartNewTimeLog({ format: 'json' });
        times.value = [...response.value.data, Startdata.data];
        timeid.value = Startdata.data.id;
        console.log(timeid.value);
      } catch (error) {
        console.log(error);
      }
    };

    const stop= async () => {
      try {
        if (timeid.value) {
          const Stopdata = await service.stop.timeLogControllerStopTimeLog(timeid.value, { format: 'json' });
          console.log(Stopdata);
          times.value = [...response.value.data, Stopdata.data];
        } else {
          console.log('No active time log to stop.');
        }
      } catch (error) {
        console.log(error);
      }
    };


    return {
      times,
      Addtime,
      stop,
    };
  },
});
</script>
 