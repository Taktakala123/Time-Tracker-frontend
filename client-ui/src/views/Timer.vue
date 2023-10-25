<template>
  <div class="flex flex-column max-h-full mt-8">
    <div class="flex justify-content-between">
      <div class="flex align-items-center justify-content-center font-bold text-blue-900">
        <Date />
      </div>
      <div class="flex">
        <div class="flex align-items-center justify-content-center m-2">
          <StopButton @StopTime="stop" :disabled=enAttente />
        </div>

        <div class="flex align-items-center justify-content-center m-2 ">
          <StartButton @StartTime="Addtime" :disabled=Activated />
        </div>

        <div class="flex align-items-center justify-content-center text-2xl text-green-500 m-4">
          {{ formattedTime }}
        </div>
      </div>
    </div>

    <div class="mt-8">
      <Card v-for="time in times" :key="time.id" class="border-green-500 border-top-1 border-bottom-1">
        <template #content>
          <div class="flex align-items-center justify-content-between ">
            <div class="flex align-items-center justify-content-center font-bold">
              Period {{ time.id }}
            </div>
            <div class="flex">
              <div class="flex align-items-center justify-content-center font-bold m-2">
                {{ format(time.startTime) }} - {{ format(time.endTime) }}
              </div>
              <div class="flex align-items-center justify-content-center text-green-500 text-2xl m-2 ">
                {{ time.duration }}
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div class="flex align-items-center justify-content-end border-top-1 border-bottom-1 border-green-400 mt-8 ">

      <div class="flex align-items-center w-4rem h-4rem font-bold text-2xl text-blue-900 mr-4">
        <p> Total </p>
      </div>

      <div class="flex align-items-center w-4rem h-4rem text-green-500 text-2xl mr-4">
        {{ formattedTime }}
      </div>

    </div>
  </div>
</template>
 
 
<script setup lang="ts">
import Date from '../components/Date.vue';
import StartButton from '../components/StartButton.vue';
import StopButton from '../components/StopButton.vue';
import service from '../../service/index';
import Card from 'primevue/card';
import { ref, computed, onMounted } from "vue";

components: {
  Date
  StartButton
  StopButton
  Card
}

const enAttente = ref(false);
const Activated = ref(false);
const timeid = ref();
const times = <any>ref({});
let intervalId: number;


onMounted(async () => {
  try {
    const response = <any>ref({});
    response.value = await service.timeLogControllerFindAll({ format: 'json' });
    times.value = response.value.data;
  } catch (error) {
    console.log(error);
  }
})

const Addtime = async () => {
  try {
    intervalId = setInterval(incrementCounter, 1000);
    Activated.value = true;
    const Startdata: any = await service.start.timeLogControllerStartNewTimeLog({ format: 'json' });
    times.value.push(Startdata.data)
    // console.log('addtime', times.value)
    console.log('addtime', Startdata)
    timeid.value = Startdata.data.id;
    enAttente.value = false;
  } catch (error) {
    console.log(error);
  }
};

const stop = async () => {
  try {
    if (timeid.value) {
      enAttente.value = true;
      Activated.value = false;
      clearInterval(intervalId);
      const Stopdata = await service.stop.timeLogControllerStopTimeLog(timeid.value, { format: 'json' });
      console.log(Stopdata)
      const stopIndex = times.value.findIndex((item: any) => item.id === timeid.value);
      if (stopIndex !== -1) {
        times.value.splice(stopIndex, 1, Stopdata.data);
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

const format = (inputDateString: string | Date) => {
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
</script>
 