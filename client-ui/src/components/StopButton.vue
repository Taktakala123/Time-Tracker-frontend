<template>
  <Button label="Stop" class="p-button-danger p-button-outlined" icon="pi pi-stop" @click="stopEvent" />
</template> 
  
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "StopButton",
  setup(props, { emit }) {
    function stopEvent() {
      emit('stopTime');
    }

    return {
      stopEvent
    };
  }
});
</script>
