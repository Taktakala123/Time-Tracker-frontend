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
        <div class="flex align-items-center justify-content-center m-2">
            {{ calculateTotalDuration() }}
        </div>

    </div>

    <div class="card">
        <div v-for="time in times" :key="time.id">
            Period {{ time.id }}
            {{ time.duration }}
        </div>
        <div class="flex justify-content-end flex-wrap">
            {{ calculateTotalDuration() }}
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
    const calculateTotalDuration = () => {
      let totalSeconds = 0;

      for (const timeId in times.value) {
        const duration = times.value[timeId].duration;

        if (typeof duration === 'number') {
          totalSeconds += duration;
        } else if (typeof duration === 'string') {
          const parts = duration.split(':');
          if (parts.length === 3) {
            const hours = parseInt(parts[0]);
            const minutes = parseInt(parts[1]);
            const seconds = parseInt(parts[2]);
            totalSeconds += hours * 3600 + minutes * 60 + seconds;
          }
        }
      }

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return {
      times,
      Addtime,
      stop,
      calculateTotalDuration,
    };
  },
});
</script>
 