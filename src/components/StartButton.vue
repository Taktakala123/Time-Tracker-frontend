<template>
  <div class="flex align-items-center justify-content-center m-2">
    <Button label="Start new" class="p-button-success p-button-outlined" icon="pi pi-stopwatch" @click="StartTime" :disabled="enAttente"/>
 </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "StartButton",
  data() {
    return {
      enAttente: false,
    };
  },
  methods: {
    StartTime(){
      axios
      .post("")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
});

</script>

