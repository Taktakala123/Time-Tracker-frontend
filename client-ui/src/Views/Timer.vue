<template>
  <div class="flex flex-column">
    <div class="flex flex-wrap align-content-center mb-6 ">

      <div class="align-items-center justify-content-center flex-wrap m-4">
        <Date />
      </div>

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
    <div v-for="time in times" :key="time.id" class="card border-green-500 border-top-1 border-bottom-1 ">
      <Card>
        <template #content>
          <div class="flex align-items-center justify-content-between">
            <div class="flex align-items-center justify-content-center  ">
              Period {{ time.id }}
            </div>
            <div class="flex align-items-center justify-content-center  ">
              {{ time.duration }}
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div class="flex align-items-center justify-content-end border-top-1 border-bottom-1 border-green-400 mt-6 ">

      <div class="flex align-items-center w-4rem h-4rem font-bold text-2xl mr-4">
        <p> Total </p>
      </div>

      <div class="flex align-items-center w-4rem h-4rem text-green-500 text-2xl mr-4">
        {{ formattedTime }}
      </div>

    </div>
  </div>
</template>
 
 
<script lang="ts">
import Date from '../components/Date.vue';
import StartButton from '../components/StartButton.vue';
import StopButton from '../components/StopButton.vue';
import service from '../../service/index';
import Card from 'primevue/card';
import { ref, computed, onMounted, defineComponent, } from "vue";


export default defineComponent({
  name: 'Timer',

  components: {
    Date,
    StartButton,
    StopButton,
    Card,
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
 