<template>
  <Button label="Stop" class="p-button-danger p-button-outlined" icon="pi pi-stop" @click="stopTime"/>
</template> 

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "StopButton",
  props: {
    timeID: Number,
  },
  methods: {
    stopTime() { 
      axios.put(`http://localhost:3000/time-log/stop/${this.timeID}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
});
</script>

