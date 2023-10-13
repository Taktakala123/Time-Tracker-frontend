<template>
  <div class="flex flex-column justify-content-center w-full h-full ">
    <div class="flex flex-wrap mb-6 ">

      <div class="align-items-center justify-content-center flex-wrap m-4">
        <Date />
      </div>

      <div class="flex align-items-center justify-content-center m-2">
        <StopButton @StopTime="stop" :disabled=enAttente />
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
            <div class="flex align-items-center justify-content-center font-bold">
              Period {{ time.id }}
            </div>
            <div>
              <div class="flex align-items-center justify-content-center font-bold text-green-500 ">
                {{ time.duration }}
              </div>
              <div>
                {{ format(time.StartTime) }} - {{ format(time.EndTime) }}
              </div>
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
    let enAttente = ref(false);
    const times = ref({});
    const response = ref({});
    const timeid = ref(null);
    let intervalId: any;


    onMounted(async () => {
      try {
        response.value = await service.timeLogControllerFindAll({ format: 'json' });
        times.value = response.value.data;
        console.log('mounted', times.value)

      } catch (error) {
        console.log(error);
      }
    })

    const Addtime = async () => {
      try {
        intervalId = setInterval(incrementCounter, 1000);
        const Startdata = await service.start.timeLogControllerStartNewTimeLog({ format: 'json' });
        times.value.push(Startdata.data)
        console.log('addtime', times.value)
        timeid.value = Startdata.data.id;
        enAttente.value=false;
      } catch (error) {
        console.log(error);
      }
    };

    const stop = async () => {
      try {
        if (timeid.value) {
          enAttente.value = true;
          clearInterval(intervalId);
          const Stopdata = await service.stop.timeLogControllerStopTimeLog(timeid.value, { format: 'json' });
          const stopIndex = times.value.findIndex(item => item.id === timeid.value);
          if (stopIndex !== -1) {
            times.value.splice(stopIndex, 1, Stopdata.data);
            console.log('Updated times after stopping:', times.value);
          }
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

    const format = (inputDateString: Date) => {
      if (typeof inputDateString !== 'string') {
        return '';
      }

      const dateParts = inputDateString.split('T');
      if (dateParts.length !== 2) {
        return '';
      }

      const timeParts = dateParts[1].split(':');
      if (timeParts.length < 2) {
        return ' ';
      }

      const hours = timeParts[0];
      const minutes = timeParts[1];
      return `${hours}:${minutes}`;
    };

    return {
      enAttente,
      times,
      Addtime,
      stop,
      formattedTime,
      format,
    };

  },
});
</script>
 