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

    <div class="flex align-items-center justify-content-center text-2xl text-green-500">
      {{ formattedTime }}
    </div>

  </div>

  <div class="flex justify-content-end flex-wrap">

    <div class="flex align-items-center justify-content-center w-4rem h-4rem font-bold text-2xl m-2 ">
      <p> Total </p>
    </div>

    <div class="flex align-items-center justify-content-center w-4rem h-4rem text-green-500 text-2xl m-2">
      {{ formattedTime }}
    </div>

  </div>
</template>
 
 
<script lang="ts">
import Date from '../components/Date.vue';
import StartButton from '../components/StartButton.vue';
import StopButton from '../components/StopButton.vue';
import service from '../../service/index';
import { ref, computed, onMounted,defineComponent, onBeforeUnmount } from "vue";


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
    let intervalId: any;


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
        intervalId = setInterval(incrementCounter, 1000);
      } catch (error) {
        console.log(error);
      }
    };

    const stop = async () => {
      try {
        if (timeid.value) {
          const Stopdata = await service.stop.timeLogControllerStopTimeLog(timeid.value, { format: 'json' });
          console.log(Stopdata);
          times.value = [...response.value.data, Stopdata.data];
          clearInterval(intervalId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const seconds = ref(0);

    // Fonction pour formater le temps en hh:mm:ss
    const formattedTime = computed(() => {
      const hours = String(Math.floor(seconds.value / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((seconds.value % 3600) / 60)).padStart(
        2,
        "0"
      );
      const secs = String(seconds.value % 60).padStart(2, "0");
      return `${hours}:${minutes}:${secs}`;
    });

    // Fonction pour incrémenter le compteur
    const incrementCounter = () => {
      seconds.value++;
    };

    return {
      times,
      Addtime,
      stop,
      formattedTime,
    };

  },
});
</script>
 